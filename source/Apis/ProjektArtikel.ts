import {ServerSetup} from "../ServerSetup";
import {get_id_from_request} from "../Function/string_manipulation";

export class ProjektArtikel extends ServerSetup {

    constructor() {
        super();
    }

    create(...args: any[]): any {
        // form of the api request
        // {
        //     "projekt_id": 802007,
        //     "menge": 6,
        //     "artikelname": "other Kabel last over REST API",
        //     "unterkategorie_id": 1,
        //     "preis": null,
        //     "beschreibung": null,
        //     "bild_url": null,
        //     "zustand": null,
        //     "einkaufs_datum": "2023-05-20T10:35:16.000Z",
        //     "belegt_von": null,
        //     "belegt_bis": null,
        //     "anlagenummer": null,
        //     "edit_date": "2023-05-20T10:35:16.000Z",
        //     "besitzer_id": null,
        //     "firma": null,
        //     "model": null,
        //     "Inventarnummer": 123456,
        //     "unterkategorie_id": 1
        // }

        // {
        //     "projekt_artikel_id": 1,
        //     "projekt_id": 802007,
        //     "artikel_id": 2,
        //     "menge": 10,
        //     "artikel": {
        //     "artikel_id": 2,
        //         "artikelname": "HDMI Kabel",
        //         "unterkategorie_id": 1,
        //         "preis": null,
        //         "beschreibung": null,
        //         "bild_url": null,
        //         "zustand": null,
        //         "einkaufs_datum": "2023-05-19T10:17:29.000Z",
        //         "belegt_von": null,
        //         "belegt_bis": null,
        //         "anlagenummer": null,
        //         "edit_date": "2023-05-19T10:17:29.000Z",
        //         "besitzer_id": null,
        //         "firma": null,
        //         "model": null,
        //         "assets": null,
        //         "unterkategorie": {
        //         "unterkategorie_id": 1,
        //             "unterkategoriename": "Kabel",
        //             "kategorie_id": 1,
        //             "kategorien": {
        //             "kategorie_id": 1,
        //                 "kategoriename": "Asset"
        //             }
        //         }
        //     }
        // }

        this.app.post('/projekt_aritkel', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            console.log(req.body);

            let projektArtikelData = req.body;

            let projektArtikel = await this.prisma.projekt_artikel.create({
                data: {
                    menge: projektArtikelData.menge,
                    tblprojekte: {
                        connect: {
                            ID: projektArtikelData.projekt_id
                        }
                    },
                    artikel: {
                        create: {
                            artikelname: projektArtikelData.artikel.artikelname,
                            unterkategorie: {
                                connect: {
                                    unterkategorie_id: projektArtikelData.artikel.unterkategorie.unterkategorie_id
                                }
                            },
                            preis: projektArtikelData.artikel.preis,
                            beschreibung: projektArtikelData.artikel.beschreibung,
                            bild_url: projektArtikelData.artikel.bild_url,
                            zustand: projektArtikelData.artikel.zustand,
                            einkaufs_datum: new Date(projektArtikelData.artikel.einkaufs_datum),
                            belegt_von: projektArtikelData.artikel.belegt_von,
                            belegt_bis: projektArtikelData.artikel.belegt_bis,
                            anlagenummer: projektArtikelData.artikel.anlagenummer,
                            edit_date: new Date(projektArtikelData.artikel.edit_date),
                            firma: projektArtikelData.artikel.firma,
                            model: projektArtikelData.artikel.model,
                            assets: {
                                create: {
                                    Inventarnummer: projektArtikelData.artikel.assets.Inventarnummer
                                }
                            }
                        }
                    }
                }
            }).then(() => {
                res.status(200).send({"message": "ProjektArtikel created"});
            }).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
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
