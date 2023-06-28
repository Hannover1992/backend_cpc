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


        this.app.get('/projektArtikelAsset/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
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
                }).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });


        this.app.get('/projekt_artikel', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            this.prisma.projekt_artikel.findmany({
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
        // let existingArtikel;
        // if(projektArtikelData.artikel.artikel_id){
        //     existingArtikel = await this.prisma.artikel.findUnique({
        //         where: {
        //             artikel_id: projektArtikelData.artikel.artikel_id
        //         }
        //     });
        // }
        // test
        //toDo: menge in Update hinzufugen und lesen
        if (projektArtikelData.artikel.artikel_id) {
            console.log("update wird ausgeführt")
            return await this.updateProjektArtikel(projektArtikelData);
        } else {
            console.log("create wird ausgeführt")
            // return await this.createProjectArticle(projektArtikelData);
            return await this.createProjektArtikel(projektArtikelData)
        }
    }


    async createProjektArtikel(projektArtikelData: any) {
        return await this.prisma.projekt_artikel.create({
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
                                unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                            }
                        },
                        preis: projektArtikelData.artikel.preis,
                        beschreibung: projektArtikelData.artikel.beschreibung,
                        zustand: projektArtikelData.artikel.zustand,
                        einkaufs_datum: new Date(projektArtikelData.artikel.einkaufs_datum),
                        belegt_von: new Date(projektArtikelData.artikel.belegt_von),
                        belegt_bis: new Date(projektArtikelData.artikel.belegt_bis),
                        anlagenummer: projektArtikelData.artikel.anlagenummer,
                        edit_date: new Date(projektArtikelData.artikel.edit_date),
                        firma: projektArtikelData.artikel.firma,
                        model: projektArtikelData.artikel.model,
                        seriennummer: projektArtikelData.artikel.seriennummer,
                        assets: {
                            create: {
                                Inventarnummer: projektArtikelData.artikel.asset.Inventarnummer
                            }
                        }
                    }
                }
            }
        });
    }

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
            menge: parseInt(projektArtikelData.menge),
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
        let unterkategorie = await this.connectSubcategory(parsedData.unterkategorie_id);

        let assets = null;
        if (parsedData.assets) {  // Prüfen, ob assets nicht undefiniert ist
            assets = await this.createAssets(parsedData);
        }

        let article = {
            create: {
                artikelname: parsedData.artikel.artikelname,
                preis: parseFloat(parsedData.artikel.preis),
                beschreibung: parsedData.artikel.beschreibung,
                zustand: parsedData.artikel.zustand,
                einkaufs_datum: new Date(parsedData.artikel.einkaufs_datum),
                belegt_von: new Date(parsedData.artikel.belegt_von),
                belegt_bis: new Date(parsedData.artikel.belegt_bis),
                anlagenummer: parsedData.artikel.anlagenummer,
                edit_date: new Date(parsedData.artikel.edit_date),
                firma: parsedData.artikel.firma,
                model: parsedData.artikel.model,
                seriennummer: parsedData.artikel.seriennummer,
                unterkategorie: unterkategorie,
                assets: assets
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
        let assetsData = parsedData.artikel.assets && parsedData.artikel.assets.Inventarnummer
            ? {create: {Inventarnummer: parseInt(parsedData.artikel.assets.Inventarnummer)}}
            : undefined;

        return assetsData;
    }


    create(...args: any[]): any {

        // this.app.post('/projektArtikelAsset', async (req: any, res: any) => {
        //     this.allow_communikation_from_all_ip_adress(res);
        //     console.log(req.body);
        //
        //     let projektArtikelData = req.body;
        //
        //     this.upsertProjektArtikel(projektArtikelData)
        //         .then((response: any) => {
        //             if (response) {
        //                 res.status(200).send({"message": "ProjektArtikel upsertProjektArtikel"});
        //             };
        //         })
        //         .catch((error: any) => {
        //             res.status(500).send({"message": error.message});
        //             console.log(error.message);
        //         });
        // });

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
        // Check and update asset first
        // const existingAsset = await this.prisma.assets.findUnique({
        //     where: {
        //         ID: projektArtikelData.artikel.assets.ID
        //     }
        // })

        // if (existingAsset) {
            this.prisma.assets.update({
                where: {
                    ID: projektArtikelData.artikel.assets.ID
                },
                data: {
                    Inventarnummer: projektArtikelData.artikel.assets.Inventarnummer
                }
            }).then(() => {
                this.prisma.projekt_artikel.update({
                    where: {
                        artikel_id: projektArtikelData.artikel_id
                    },
                    data: {
                        menge: projektArtikelData.menge,
                        tblprojekte: {
                            connect: {
                                ID: projektArtikelData.projekt_id
                            }
                        },
                        artikel: {
                            update: {
                                artikelname: projektArtikelData.artikel.artikelname,
                                unterkategorie: {
                                    connect: {
                                        unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                                    }
                                },
                                preis: parseFloat(projektArtikelData.artikel.preis),
                                beschreibung: projektArtikelData.artikel.beschreibung,
                                zustand: projektArtikelData.artikel.zustand,
                                einkaufs_datum: new Date(projektArtikelData.artikel.einkaufs_datum),
                                belegt_von: new Date(projektArtikelData.artikel.belegt_von),
                                belegt_bis: new Date(projektArtikelData.artikel.belegt_bis),
                                anlagenummer: projektArtikelData.artikel.anlagenummer,
                                // toDo: eintlich das edit date muss ich in project aritcle ebene befinden
                                edit_date: new Date(projektArtikelData.artikel.edit_date),
                                firma: projektArtikelData.artikel.firma,
                                model: projektArtikelData.artikel.model,
                                seriennummer: projektArtikelData.artikel.seriennummer,
                                // Removed assets update from here
                            }
                        }
                    }
                });
            });
        // }

        // Then proceed to check and update artikel
        // const existingArtikel = await this.prisma.artikel.findUnique({
        //     where: {
        //         artikel_id: projektArtikelData.artikel_id
        //     }
        // });

        // if (existingArtikel) {
        // } else {
        //     console.log("es hat nicht funktiniert")
        //     return null;
        // }
    }



    update(...args: any[]): any {
        this.app.put('/projektArtikelAsset', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            console.log(req.body);

            let projektArtikelData = req.body;

            this.updateProjektArtikel(projektArtikelData)
                .then(() => {
                    res.status(200).send({"message": "ProjektArtikel updated"});
                    console.log("ProjektArtikel updated");
                })
                .catch((error: any) => {
                    res.status(500).send({"message": error.message});
                    console.log(error.message);
                });
        });
    }
}
