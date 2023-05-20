import {ServerSetup} from "../ServerSetup";
import {get_id_from_request} from "../Function/string_manipulation";

export class ProjektArtikel extends ServerSetup {

    constructor() {
        super();
    }

    create(...args: any[]): any {
        this.app.post('/projekt_aritkel', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            console.log(req.body)

            let artikelData = req.body.artikel;
            let projekt_id = req.body.projekt_id;
            let menge = req.body.menge;
            let assetsData = artikelData.assets;

            // Remove the 'assets' property from 'artikelData' to prevent issues
            delete artikelData.assets;

            let artikel = await this.prisma.artikel.create({
                data: {
                    ...artikelData,
                }
            })

            let artikel = await this.prisma.artikel.create ({
                data: {
                    ...artikelData,
                    assets: {
                        create: {
                            Inventarnummer: assetsData.Inventarnummer
                        }
                    }
                }
            }).catch(
                (error: any) => {
                    res.status(500).send({"message": error.message});
                }
            )

            let projekt_artikel = await this.prisma.projekt_artikel.create({
                data : {
                    projekt_id: projekt_id,
                    artikel_id: artikel.artikel_id,
                    menge: menge
                }
            }).then(
                (projekt_artikel: any) => {
                    res.status(200).send(projekt_artikel);
                }
            ).catch(
                (error: any) => {
                    res.status(500).send({"message": error.message});
                });

            console.log(projekt_artikel);
            res.send(projekt_artikel);
        });
    }

    deletee(...args: any[]): any {
    }

    read(...args: any[]): any {

        this.app.get('/test', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            this.prisma.projekt_artikel.findMany({
                include: {
                    artikel: {
                        include: {
                            assets: true,
                            unterkategorie: {
                                include: {
                                    kategorien: true,
                                }
                            }
                        },
                    },
                },
            })
                .then((artikel: any) => {
                    res.status(200).send(artikel);
                }).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });

        //toDo: ich muss das noch mit dem Assets verknupfen
        this.app.get('/projekt_assets/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            const inputet_projekt_id = parseInt(req.params.projekt_id);
            const inputet_unterkategoriename = req.params.unterkategoriename;
            this.prisma.projekt_artikel.findMany({
                where: {
                    projekt_id: inputet_projekt_id,
                    artikel: {
                        unterkategorie: {
                            unterkategoriename: {
                                equals: inputet_unterkategoriename,
                            },
                        },
                    },
                },
                include: {
                    artikel: {
                        include: {
                            assets: true,
                            unterkategorie: {
                                include: {
                                    kategorien: true,
                                }
                            }
                        },
                    },
                },
            })
            .then((artikel: any) => {
                res.status(200).send(artikel);
                console.log("projekt Artikel wurden angefragt")
            }).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });



        this.app.get('/projekt_artikel', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            this.prisma.projekt_artikel.findMany({
                include: {
                    artikel: {
                        include: {
                            unterkategorie: {
                                include: {
                                    kategorien: true,
                                },
                            },
                            assets: true, // Hier wurde das assets-Modell hinzugefügt
                        },
                    },
                    tblprojekte: true,
                },
            })
                .then((artikel: any) => {
                    res.status(200).send(artikel);
                }).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });
    }


    // async getFilteredProjektArtikel(projekt_id: any, unterkategoriename: any) {
    //     const result = await this.prisma.projekt_artikel.findMany({
    //         where: {
    //             projekt_artiekl_id: projekt_id,
    //             artikel: {
    //                 unterkategorie: {
    //                     unterkategoriename: {
    //                         contains: unterkategoriename,
    //                     },
    //                 },
    //             },
    //         },
    //         include: {
    //             artikel: {
    //                 select: {
    //                     artikel_id: true,
    //                     artikelname: true,
    //                     unterkategorie: true,
    //                 },
    //             },
    //         },
    //     });
    //
    //     return result;
    // }



    update(...args: any[]): any {
    }


}
