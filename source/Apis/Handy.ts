import {Article} from "./Article";

export class Handy extends Article {
    async create(...args: any[]) {
        this.app.post('/projektArtikelHandy', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                const createdArtikel = await this.createArtikel(projektArtikelData);
                if (projektArtikelData.artikel.handy) {
                    await this.createHandy(projektArtikelData, createdArtikel.artikel_id);
                }
                await this.createProjektArtikel(projektArtikelData, createdArtikel.artikel_id);

                res.status(200).send({"message": "ProjektArtikel with Handy created"});
                console.log("ProjektArtikel with Handy created");
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }


    async createHandy(projektArtikelData: any, artikelId: number) {
        return await this.prisma.handy.create({
            data: {
                imei_1: projektArtikelData.artikel.handy.imei_1,
                besitzer: projektArtikelData.artikel.handy.besitzer,
                sim_karten_nummer: projektArtikelData.artikel.handy.sim_karten_nummer ?? "",
                bildschirmsperre_pin: projektArtikelData.artikel.handy.bildschirmsperre_pin ?? "",
                email_adresse: projektArtikelData.artikel.handy.email_adresse ?? "",
                password: projektArtikelData.artikel.handy.password ?? "",
                artikel: {
                    connect: {
                        artikel_id: artikelId, // Link the created handy to the created artikel
                    }
                }
            }
        });
    }


    read(...args: any[]): any {
        this.app.get('/projektArtikelHandy/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
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
                            handy: true  // Include 'handy' in the output
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
        this.app.put('/projektArtikelHandy', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                // Update the Handy if it exists
                if (projektArtikelData.artikel.handy) {
                    const existingHandy = await this.prisma.handy.findUnique({
                        where: {
                            handy_id: projektArtikelData.artikel.handy.handy_id
                        }
                    });

                    if (existingHandy) {
                        await this.prisma.handy.update({
                            where: {
                                handy_id: projektArtikelData.artikel.handy.handy_id
                            },
                            data: projektArtikelData.artikel.handy
                        });
                    }
                }

                // Call the separated methods using 'this'
                await this.updateArtikel(projektArtikelData);
                await this.updateProjektArtikel(projektArtikelData);

                res.status(200).send({"message": "ProjektArtikelHandy updated"});
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

    deletee(...args: any[]): any {
        this.app.delete('/projektArtikelHandy/:projekt_artikel_id', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelID = parseInt(req.params.projekt_artikel_id);

            try {
                // Find the related handy_id before deleting the projekt_artikel
                const projArtikel = await this.prisma.projekt_artikel.findUnique({
                    where: {
                        projekt_artikel_id: projektArtikelID
                    },
                    include: {
                        artikel: {
                            select: {
                                handy: {
                                    select: {
                                        handy_id: true
                                    }
                                }
                            }
                        }
                    }
                });

                const handyID = projArtikel?.artikel?.handy?.handy_id;

                if (handyID) {
                    // Delete the associated handy entry
                    await this.prisma.handy.delete({
                        where: {
                            handy_id: handyID
                        }
                    });
                }

                // Delete the projekt_artikel entry
                await this.prisma.projekt_artikel.delete({
                    where: {
                        projekt_artikel_id: projektArtikelID
                    }
                });

                res.status(200).send({"message": "Handy und ProjektArtikel wurden erfolgreich gelöscht"});
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

}
