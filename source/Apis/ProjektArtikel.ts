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

    create(...args: any[]): any {
        this.app.post('/projektArtikelAsset', async (req: any, res: any) => {
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
                                    unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
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
                            seriennummer: projektArtikelData.artikel.seriennummer,
                            assets: {
                                create: {
                                    Inventarnummer: projektArtikelData.artikel.assets.Inventarnummer
                                }
                            }
                        }
                    }
                }
            })
                .then(() => {
                    res.status(200).send({"message": "ProjektArtikel created"});
                })
                .catch((error: any) => {
                    res.status(500).send({"message": error.message});
                });
        });
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


    update(...args: any[]): any {
    }


}
