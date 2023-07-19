import {ServerSetup} from "../ServerSetup";

export class Notebook extends ServerSetup {


    constructor() {
        super();
    }

    create(...args: any[]): any {
        this.app.post('/projektArtikelNotebook', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;
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
                            notebook: {
                                create: {
                                    admin_konto_name: projektArtikelData.artikel.notebook.admin_konto_name ?? "",
                                    admin_konto_password: projektArtikelData.artikel.notebook.admin_konto_password ?? "",
                                    user_konto_name: projektArtikelData.artikel.notebook.user_konto_name ?? "",
                                    user_konto_password: projektArtikelData.artikel.notebook.user_konto_password ?? "",
                                }
                            }
                        }
                    }
                }
            })
                .then(() => {
                    res.status(200).send({"message": "ProjektArtikel with Notebook created"});
                    console.log("ProjektArtikel with Notebook created");
                })
                .catch((error: any) => {
                    res.status(500).send({"message": error.message});
                    console.log(error.message);
                });
        });
    }


    read(...args: any[]): any {
        this.app.get('/projektArtikelNotebook/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
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
                            unterkategorie: true,
                            notebook: true  // Include 'notebook' in the output
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
    }

    update(...args: any[]): any {
        this.app.put('/projektArtikelNotebook', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                // update the notebook if it exists
                if (projektArtikelData.artikel.notebook) {
                    const existingNotebook = await this.prisma.notebook.findUnique({
                        where: {
                            notebook_id: projektArtikelData.artikel.notebook.notebook_id
                        }
                    });

                    if (existingNotebook) {
                        await this.prisma.notebook.update({
                            where: {
                                notebook_id: projektArtikelData.artikel.notebook.notebook_id
                            },
                            data: projektArtikelData.artikel.notebook
                        });
                    }
                }

                // update the artikel
                const existingArtikel = await this.prisma.artikel.findUnique({
                    where: {
                        artikel_id: projektArtikelData.artikel_id
                    }
                });

                if (existingArtikel) {
                    await this.prisma.artikel.update({
                        where: {
                            artikel_id: projektArtikelData.artikel_id
                        },
                        data: {
                            // Copy the rest of artikel data update here.
                            // ...
                        },
                    });

                    // Then, update the projekt_artikel
                    await this.prisma.projekt_artikel.update({
                        where: {
                            projekt_artikel_id: projektArtikelData.projekt_artikel_id
                        },
                        data: {
                            menge: projektArtikelData.menge,
                        }
                    });

                    res.status(200).send({"message": "ProjektArtikelNotebook updated"});
                } else {
                    throw new Error(`Artikel with ID ${projektArtikelData.artikel_id} does not exist.`);
                }
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

    deletee(...args: any[]): any {
    }

}
