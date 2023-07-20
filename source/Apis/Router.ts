import {ServerSetup} from "../ServerSetup";
import {Article} from "./Article";

export class Router extends Article {
    async create(...args: any[]) {
        this.app.post('/projektArtikelRouter', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                const createdArtikel = await this.createArtikel(projektArtikelData);
                if (projektArtikelData.artikel.router) {
                    await this.createRouter(projektArtikelData, createdArtikel.artikel_id);
                }
                await this.createProjektArtikel(projektArtikelData, createdArtikel.artikel_id);

                res.status(200).send({"message": "ProjektArtikel with Router created"});
                console.log("ProjektArtikel with Router created");
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

    async createRouter(projektArtikelData: any, artikelId: number) {
        return await this.prisma.router.create({
            data: {
                imei: projektArtikelData.artikel.router.imei,
                ip_adresse: projektArtikelData.artikel.router.ip_adresse,
                benutzername: projektArtikelData.artikel.router.benutzername,
                passwort: projektArtikelData.artikel.router.passwort,
                iccid: projektArtikelData.artikel.router.iccid,
                pin: projektArtikelData.artikel.router.pin ?? "",
                puk: projektArtikelData.artikel.router.puk ?? "",
                artikel: {
                    connect: {
                        artikel_id: artikelId, // Link the created router to the created artikel
                    }
                }
            }
        });
    }

    read(...args: any[]): any {
        this.app.get('/projektArtikelRouter/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
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
                            router: true  // Include 'router' in the output
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
        this.app.put('/projektArtikelRouter', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                // Update the Router if it exists
                if (projektArtikelData.artikel.router) {
                    const existingRouter = await this.prisma.router.findUnique({
                        where: {
                            router_id: projektArtikelData.artikel.router.router_id
                        }
                    });

                    if (existingRouter) {
                        await this.prisma.router.update({
                            where: {
                                router_id: projektArtikelData.artikel.router.router_id
                            },
                            data: projektArtikelData.artikel.router
                        });
                    }
                }

                // Call the separated methods using 'this'
                await this.updateArtikel(projektArtikelData);
                await this.updateProjektArtikel(projektArtikelData);

                res.status(200).send({"message": "ProjektArtikelRouter updated"});
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

    deletee(...args: any[]): any {
        this.app.delete('/projektArtikelRouter/:projekt_artikel_id', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelID = parseInt(req.params.projekt_artikel_id);

            try {
                // Find the related router_id before deleting the projekt_artikel
                const projArtikel = await this.prisma.projekt_artikel.findUnique({
                    where: {
                        projekt_artikel_id: projektArtikelID
                    },
                    include: {
                        artikel: {
                            select: {
                                router: {
                                    select: {
                                        router_id: true
                                    }
                                }
                            }
                        }
                    }
                });

                const routerID = projArtikel?.artikel?.router?.router_id;

                if (routerID) {
                    // Delete the associated router entry
                    await this.prisma.router.delete({
                        where: {
                            router_id: routerID
                        }
                    });
                }

                // Delete the projekt_artikel entry
                await this.prisma.projekt_artikel.delete({
                    where: {
                        projekt_artikel_id: projektArtikelID
                    }
                });

                res.status(200).send({"message": "Router und ProjektArtikel wurden erfolgreich gelöscht"});
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }


}
