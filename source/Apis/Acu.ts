import {Article} from "./Article";

export class Acu extends Article {
    async create(...args: any[]) {
        this.app.post('/projektArtikelAcu', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                const createdArtikel = await this.createArtikel(projektArtikelData);
                if (projektArtikelData.artikel.acu) {
                    await this.createAcu(projektArtikelData, createdArtikel.artikel_id);
                }
                await this.createProjektArtikel(projektArtikelData, createdArtikel.artikel_id);

                res.status(200).send({"message": "ProjektArtikel with Acu created"});
                console.log("ProjektArtikel with Acu created");
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

    async createAcu(projektArtikelData: any, artikelId: number) {
        return await this.prisma.acu.create({
            data: {
                router: projektArtikelData.artikel.acu.router,
                ip_adresse: projektArtikelData.artikel.acu.ip_adresse,
                artikel: {
                    connect: {
                        artikel_id: artikelId, // Link the created acu to the created artikel
                    }
                }
            }
        });
    }


    read(...args: any[]): any {
        this.read_single();
    }

    private read_single() {
        this.app.get('/projektArtikelAcu/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
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
                            acu: true  // Include 'acu' in the output
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
        this.app.put('/projektArtikelAcu', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                // Update the Acu if it exists
                if (projektArtikelData.artikel.acu) {
                    const existingAcu = await this.prisma.acu.findUnique({
                        where: {
                            acu_id: projektArtikelData.artikel.acu.acu_id
                        }
                    });

                    if (existingAcu) {
                        await this.prisma.acu.update({
                            where: {
                                acu_id: projektArtikelData.artikel.acu.acu_id
                            },
                            data: projektArtikelData.artikel.acu
                        });
                    }
                }

                // Call the separated methods using 'this'
                await this.updateArtikel(projektArtikelData);
                await this.updateProjektArtikel(projektArtikelData);

                res.status(200).send({"message": "ProjektArtikelAcu updated"});
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

    deletee(...args: any[]): any {
        this.app.delete('/projektArtikelAcu/:projekt_artikel_id', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelID = parseInt(req.params.projekt_artikel_id);

            try {
                // Find the related acu_id before deleting the projekt_artikel
                const projArtikel = await this.prisma.projekt_artikel.findUnique({
                    where: {
                        projekt_artikel_id: projektArtikelID
                    },
                    include: {
                        artikel: {
                            select: {
                                acu: {
                                    select: {
                                        acu_id: true
                                    }
                                }
                            }
                        }
                    }
                });

                const acuID = projArtikel?.artikel?.acu?.acu_id;

                if (acuID) {
                    // Delete the associated acu entry
                    await this.prisma.acu.delete({
                        where: {
                            acu_id: acuID
                        }
                    });
                }

                // Delete the projekt_artikel entry
                await this.prisma.projekt_artikel.delete({
                    where: {
                        projekt_artikel_id: projektArtikelID
                    }
                });

                res.status(200).send({"message": "Acu und ProjektArtikel wurden erfolgreich gelöscht"});
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

}