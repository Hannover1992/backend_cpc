import {ServerSetup} from "../ServerSetup";
import {get_id_from_request} from "../Function/string_manipulation";


export interface ProjectArticle {
    projekt_artikel_id: number;
    projekt_id: number;
    artikel_id: number;
    menge: number;
    artikel: Article;
}


export interface Article {
    artikel_id: number;
    artikelname: string;
    firma: string,
    model: string,
    unterkategorie_id: number;
    preis: string;
    beschreibung: string;
    bild_url: string;
    zustand: string;

    einkaufs_datum: string;
    belegt_von: string;
    belegt_bis: string;
    edit_date: string;

    anlagenummer: string;
    seriennummer: string;
    besitzer_id: null | number;
    assets: Asset;
    unterkategorie?: Subcategory;
}


export interface Asset {
    ID: number;
    Inventarnummer: number;
}


export interface Subcategory {
    unterkategorie_id: number;
    unterkategoriename: string;
    kategorie_id: number;
    kategorien: Category;
}


export interface Category {
    kategorie_id: number;
    kategoriename: string;
}

export class ProjektArtikel extends ServerSetup {

    constructor() {
        super();
    }


    // handlePostRequest(req: any, res: any) {
    //     this.allow_communikation_from_all_ip_adress(res);
    //     console.log(req.body);
    //
    //     let projektArtikelData : ProjectArticle = req.body;
    //     let assets: any;
    //
    //     projektArtikelData.projekt_id   = req.body.projekt_id;
    //     projektArtikelData.menge        = req.body.menge;
    //     assets = projektArtikelData.artikel.assets
    //
    //     projektArtikelData.artikel      = {...req.body.artikel.asset_details,...req.body.artikel.asset_numbers, ...req.body.artikel.asset_dates}
    //     projektArtikelData.artikel.assets = assets;
    //
    //     this.createProjektArtikel(projektArtikelData)
    //         .then(() => {
    //             res.status(200).send({"message": "ProjektArtikel created"});
    //             console.log("ProjektArtikel created");
    //         })
    //         .catch((error: any) => {
    //             res.status(500).send({"message": error.message});
    //             console.log(error.message);
    //         });
    // }
    //
    // async createProjektArtikel(projektArtikelData: any) {
    //     return await this.prisma.projekt_artikel.create({
    //         data: {
    //             menge: projektArtikelData.menge,
    //             tblprojekte: {
    //                 connect: {
    //                     ID: projektArtikelData.projekt_id
    //                 }
    //             },
    //             artikel: {
    //                 create: this.createArtikel(projektArtikelData.artikel)
    //             }
    //         }
    //     });
    // }
    //
    // createArtikel(artikelData: any) {
    //     return {
    //         artikelname: artikelData.artikelname,
    //         unterkategorie: {
    //             connect: {
    //                 unterkategorie_id: artikelData.unterkategorie_id
    //             }
    //         },
    //         preis: artikelData.preis,
    //         beschreibung: artikelData.beschreibung,
    //         bild_url: artikelData.bild_url,
    //         zustand: artikelData.zustand,
    //         einkaufs_datum: new Date(artikelData.einkaufs_datum),
    //         belegt_von: artikelData.belegt_von,
    //         belegt_bis: artikelData.belegt_bis,
    //         anlagenummer: artikelData.anlagenummer,
    //         edit_date: new Date(artikelData.edit_date),
    //         firma: artikelData.firma,
    //         model: artikelData.model,
    //         seriennummer: artikelData.seriennummer,
    //         assets: {
    //             create: {
    //                 Inventarnummer: artikelData.assets.Inventarnummer
    //             }
    //         }
    //     };
    // }
    //
    // create(...args: any[]): any {
    //     this.app.post('/projektArtikelAsset', this.handlePostRequest.bind(this));
    // }

    deletee(...args: any[]): any {
        this.app.delete('/projektArtikelAsset/:projekt_artikel_id', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelID = parseInt(req.params.projekt_artikel_id);
            // convert to ineger

            this.prisma.projekt_artikel.delete({
                where: {
                    projekt_artikel_id: projektArtikelID
                },
                include: {
                    artikel: {
                        include: {
                            assets: true,
                            electronics: true
                        }
                    }
                }
            }).then(() => {
                res.status(200).send({"message": "Asset wurde erfolgreich gelöscht"});
            }).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });
    }

    read(...args: any[]): any {


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
                            unterkategorie: true,
                            electronics: true
                        },
                    },
                },
            })
            .then((artikel: any) => {
                res.status(200).send(artikel);
                console.log("Deleted Success")
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
                            assets: true,
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

    async upsertProjektArtikel(projektArtikelData: any) {
        let existingArtikel;
        if(projektArtikelData.artikel.artikel_id != null){
            existingArtikel = await this.prisma.artikel.findUnique({
                where: {
                    artikel_id: projektArtikelData.artikel.artikel_id
                }
            });
        }
        // test
        if(existingArtikel) {
            return await this.updateProjektArtikel(projektArtikelData);
        } else {
            return await this.createProjektArtikel(projektArtikelData);
        }
    }


    async createProjektArtikel(projektArtikelData: any) {
        return await this.prisma.projekt_artikel.create({
            data: {
                menge: parseInt(projektArtikelData.artikel.asset_numbers.menge),
                tblprojekte: {
                    connect: {
                        ID: projektArtikelData.projekt_id
                    }
                },
                artikel: {
                    create: {
                        artikelname: projektArtikelData.artikel.asset_details.artikelname,
                        unterkategorie: {
                            connect: {
                                unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                            }
                        },
                        preis: parseFloat(projektArtikelData.artikel.asset_numbers.preis),
                        beschreibung: projektArtikelData.artikel.asset_details.beschreibung,
                        zustand: projektArtikelData.artikel.asset_details.zustand,
                        einkaufs_datum: new Date(projektArtikelData.artikel.date_info.einkaufs_datum),
                        belegt_von: new Date(projektArtikelData.artikel.date_info.belegt_von),
                        belegt_bis: new Date(projektArtikelData.artikel.date_info.belegt_bis),
                        anlagenummer: projektArtikelData.artikel.asset_numbers.anlagenummer,
                        edit_date: new Date(projektArtikelData.artikel.date_info.edit_date),
                        firma: projektArtikelData.artikel.asset_details.firma,
                        model: projektArtikelData.artikel.asset_details.model,
                        seriennummer: projektArtikelData.artikel.asset_numbers.serriennummer,
                        assets: {
                            create: {
                                Inventarnummer: parseInt(projektArtikelData.artikel.assets.Inventarnummer)
                            }
                        }
                    }
                }
            }
        });
    }

    create(...args: any[]): any {

        this.app.post('/projektArtikelAsset', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            console.log(req.body);

            let projektArtikelData = req.body;

            this.upsertProjektArtikel(projektArtikelData)
                .then((response: any) => {
                    if (response) {
                        res.status(200).send({"message": "ProjektArtikel updated"});
                        console.log("ProjektArtikel updated");
                    } else {
                        res.status(200).send({"message": "ProjektArtikel created"});
                        console.log("ProjektArtikel created");
                    }
                })
                .catch((error: any) => {
                    res.status(500).send({"message": error.message});
                    console.log(error.message);
                });
        });

        this.app.post('/projektArtikelAsset', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            console.log(req.body);

            let projektArtikelData = req.body;

            this.createProjektArtikel(projektArtikelData)

            return await this.prisma.projekt_artikel.create({
                data: {
                    menge: parseInt(projektArtikelData.artikel.asset_numbers.menge),
                    tblprojekte: {
                        connect: {
                            ID: projektArtikelData.projekt_id
                        }
                    },
                    artikel: {
                        create: {
                            artikelname: projektArtikelData.artikel.asset_details.artikelname,
                            unterkategorie: {
                                connect: {
                                    unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                                }
                            },
                            preis: parseFloat(projektArtikelData.artikel.asset_numbers.preis),
                            beschreibung: projektArtikelData.artikel.asset_details.beschreibung,
                            zustand: projektArtikelData.artikel.asset_details.zustand,
                            einkaufs_datum: new Date(projektArtikelData.artikel.date_info.einkaufs_datum),
                            belegt_von: new Date(projektArtikelData.artikel.date_info.belegt_von),
                            belegt_bis: new Date(projektArtikelData.artikel.date_info.belegt_bis),
                            anlagenummer: projektArtikelData.artikel.asset_numbers.anlagenummer,
                            edit_date: new Date(projektArtikelData.artikel.date_info.edit_date),
                            firma: projektArtikelData.artikel.asset_details.firma,
                            model: projektArtikelData.artikel.asset_details.model,
                            seriennummer: projektArtikelData.artikel.asset_numbers.serriennummer,
                            assets: {
                                create: {
                                    Inventarnummer: parseInt(projektArtikelData.artikel.assets.Inventarnummer)
                                }
                            }
                        }
                    }
                }
            })
                .then(() => {
                    res.status(200).send({"message": "ProjektArtikel created"});
                    console.log("ProjektArtikel created");
                })
                .catch((error: any) => {
                    res.status(500).send({"message": error.message});
                    console.log(error.message);
                });
        });
    }


    async updateProjektArtikel(projektArtikelData: any) {
        const existingArtikel = await this.prisma.artikel.findUnique({
            where: {
                artikel_id: projektArtikelData.artikel.artikel_id
            }
        });

        if(existingArtikel) {
            return await this.prisma.projekt_artikel.update({
                where: {
                    artikel_id: projektArtikelData.artikel.artikel_id
                },
                data: {
                    data: {
                        menge: projektArtikelData.artikel.asset_numbers.menge,
                        tblprojekte: {
                            connect: {
                                ID: projektArtikelData.projekt_id
                            }
                        },
                        artikel: {
                            update: {
                                artikelname: projektArtikelData.artikel.asset_details.artikelname,
                                unterkategorie: {
                                    connect: {
                                        unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                                    }
                                },
                                preis: parseFloat(projektArtikelData.artikel.asset_numbers.preis),
                                beschreibung: projektArtikelData.artikel.asset_details.beschreibung,
                                zustand: projektArtikelData.artikel.asset_details.zustand,
                                einkaufs_datum: new Date(projektArtikelData.artikel.date_info.einkaufs_datum),
                                belegt_von: new Date(projektArtikelData.artikel.date_info.belegt_von),
                                belegt_bis: new Date(projektArtikelData.artikel.date_info.belegt_bis),
                                anlagenummer: projektArtikelData.artikel.asset_numbers.anlagenummer,
                                edit_date: new Date(projektArtikelData.artikel.date_info.edit_date),
                                firma: projektArtikelData.artikel.asset_details.firma,
                                model: projektArtikelData.artikel.asset_details.model,
                                seriennummer: projektArtikelData.artikel.asset_numbers.serriennummer,
                                assets: {
                                    update: {
                                        Inventarnummer: parseInt(projektArtikelData.artikel.assets.Inventarnummer)
                                    }
                                }
                            }
                        }
                    }
                }
            });
        } else {
            return null;
        }
    }



    update(...args: any[]): any {
        // this.app.post('/projektArtikelAsset', async (req: any, res: any) => {
        //     this.allow_communikation_from_all_ip_adress(res);
        //     console.log(req.body);
        //
        //     let projektArtikelData = req.body;
        //
        //     this.updateProjektArtikel(projektArtikelData)
        //         .then(() => {
        //             res.status(200).send({"message": "ProjektArtikel updated"});
        //             console.log("ProjektArtikel updated");
        //         })
        //         .catch((error: any) => {
        //             res.status(500).send({"message": error.message});
        //             console.log(error.message);
        //         });
        // });
    }


    // async updateProjektArtikel(projektArtikelData: any) {
    //     return await this.prisma.projekt_artikel.update({
    //         where: {
    //             artikel_id: projektArtikelData.artikel.artikel_id
    //         },
    //         data: {
    //             menge: projektArtikelData.artikel.asset_numbers.menge,
    //             tblprojekte: {
    //                 connect: {
    //                     ID: projektArtikelData.projekt_id
    //                 }
    //             },
    //             artikel: {
    //                 update: {
    //                     artikelname: projektArtikelData.artikel.asset_details.artikelname,
    //                     unterkategorie: {
    //                         connect: {
    //                             unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
    //                         }
    //                     },
    //                     preis: parseFloat(projektArtikelData.artikel.asset_numbers.preis),
    //                     beschreibung: projektArtikelData.artikel.asset_details.beschreibung,
    //                     zustand: projektArtikelData.artikel.asset_details.zustand,
    //                     einkaufs_datum: new Date(projektArtikelData.artikel.date_info.einkaufs_datum),
    //                     belegt_von: new Date(projektArtikelData.artikel.date_info.belegt_von),
    //                     belegt_bis: new Date(projektArtikelData.artikel.date_info.belegt_bis),
    //                     anlagenummer: projektArtikelData.artikel.asset_numbers.anlagenummer,
    //                     edit_date: new Date(projektArtikelData.artikel.date_info.edit_date),
    //                     firma: projektArtikelData.artikel.asset_details.firma,
    //                     model: projektArtikelData.artikel.asset_details.model,
    //                     seriennummer: projektArtikelData.artikel.asset_numbers.serriennummer,
    //                     assets: {
    //                         update: {
    //                             Inventarnummer: parseInt(projektArtikelData.artikel.assets.Inventarnummer)
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // }


}
