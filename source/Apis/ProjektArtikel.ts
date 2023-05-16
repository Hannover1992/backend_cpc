import {ServerSetup} from "../ServerSetup";
import {Asset} from "./Asset";

export class ProjektArtikel extends ServerSetup {

    constructor() {
        super();
    }

    async create(req: any, res: any) {
        this.app.post('/projekt_assets/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            const { inputet_projekt_id, inputet_unterkategoriename } = this.get_parameter(req);
            const projektArtikelData = req.body;

            try {
                //toDo: wahrscheinlich wen
                // Retrieve the unterkategorie_id based on the unterkategoriename

                // const unterkategorie = await this.prisma.unterkategorie.findFirst({
                //     where: {
                //         unterkategoriename: inputet_unterkategoriename
                //     }
                // });
                //
                // if (!unterkategorie) {
                //     res.status(404).send({ message: "Unterkategoriename not found" });
                //     return;
                // }
                //
                // // Update the artikelData with the retrieved unterkategorie_id
                // projektArtikelData.artikel.unterkategorie_id = unterkategorie.unterkategorie_id;
                //
                // // Create the artikel
                // const createdArtikel = await this.prisma.artikel.create({
                //     data: projektArtikelData.artikel,
                //     include: {
                //         assets: true,
                //         unterkategorie: {
                //             include: {
                //                 kategorien: true
                //             }
                //         }
                //     }
                // });

                let asset = new Asset();
                let new_Artikel = await asset.create_new_artikel(projektArtikelData.artikel)
                console.log(new_Artikel)

                // Create the projekt_artikel with the createdArtikel id
                // const createdProjektArtikel = await this.prisma.projekt_artikel.create({
                //     data: {
                //         projekt_id: inputet_projekt_id,
                //         artikel_id: createdArtikel.artikel_id,
                //         menge: projektArtikelData.artikel.menge
                //     }
                // });
                //
                // res.status(200).send({
                //     message: "Projekt Artikel created",
                //     projekt_artikel: createdProjektArtikel,
                //     artikel: projektArtikelData.artikel
                // });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: error.message });
            }
        });
    }

    deletee(...args: any[]): any {
    }

    read(...args: any[]): any {
        this.app.get('/projekt_assets/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            const {inputet_projekt_id, inputet_unterkategoriename} = this.get_parameter(req);
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


    private get_parameter(req: any) {
        const inputet_projekt_id = parseInt(req.params.projekt_id);
        const inputet_unterkategoriename = req.params.unterkategoriename;
        return {inputet_projekt_id, inputet_unterkategoriename};
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
