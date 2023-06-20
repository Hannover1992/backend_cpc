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
            return await this.createProjectArticle(projektArtikelData);
        }
    }


    // async createProjektArtikel(projektArtikelData: any) {
    //     return await this.prisma.projekt_artikel.create({
    //         data: {
    //             menge: parseInt(projektArtikelData.artikel.asset_numbers.menge),
    //             tblprojekte: {
    //                 connect: {
    //                     ID: projektArtikelData.projekt_id
    //                 }
    //             },
    //             artikel: {
    //                 create: {
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
    //                         create: {
    //                             Inventarnummer: parseInt(projektArtikelData.artikel.assets.Inventarnummer)
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // }

    async createProjectArticle(projektArtikelData: any) {
        const parsedData = this.parseArticleData(projektArtikelData);
        const project = await this.connectProject(parsedData.projekt_id);
        const articleData = await this.createArticle(parsedData);

        return await this.prisma.projekt_artikel.create({
            data: {
                menge: parsedData.menge,
                tblprojekte: project,
                artikel: articleData
            }
        });
    }

    parseArticleData(projektArtikelData: any) {
        return {
            menge: parseInt(projektArtikelData.artikel.asset_numbers.menge),
            projekt_id: projektArtikelData.projekt_id,
            artikel: projektArtikelData.artikel,
            unterkategorie_id: projektArtikelData.artikel.unterkategorie_id,
            assets: projektArtikelData.artikel.assets
        };
    }

    async connectProject(projekt_id: any) {
        return {
            connect: {
                ID: projekt_id
            }
        };
    }

    async createArticle(parsedData: any) {
        let article = {
            create: {
                artikelname:        parsedData.artikel.asset_details.artikelname,
                preis:              parseFloat(parsedData.artikel.asset_numbers.preis),
                beschreibung:       parsedData.artikel.asset_details.beschreibung,
                zustand:            parsedData.artikel.asset_details.zustand,
                einkaufs_datum:     new Date(parsedData.artikel.date_info.einkaufs_datum),
                belegt_von:         new Date(parsedData.artikel.date_info.belegt_von),
                belegt_bis:         new Date(parsedData.artikel.date_info.belegt_bis),
                anlagenummer:       parsedData.artikel.asset_numbers.anlagenummer,
                edit_date:          new Date(parsedData.artikel.date_info.edit_date),
                firma:              parsedData.artikel.asset_details.firma,
                model:              parsedData.artikel.asset_details.model,
                seriennummer:       parsedData.artikel.asset_numbers.seriennummer,
                unterkategorie:     await this.connectSubcategory(parsedData.unterkategorie_id),
                assets:             await this.createAssets(parsedData),
            }
        };

        return article;
    }

    async connectSubcategory(unterkategorie_id: any) {
        return {
            connect: {
                unterkategorie_id: unterkategorie_id
            }
        };
    }

    async createAssets(parsedData: any) {
        if (parsedData.assets) {
            return {
                create: {
                    Inventarnummer: parseInt(parsedData.assets.Inventarnummer)
                }
            };
        } else {
            return {};
        }
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

            this.createProjectArticle(projektArtikelData)

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
