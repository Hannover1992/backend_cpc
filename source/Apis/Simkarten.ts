import {Article} from "./Article";


// Second function to update projekt_artikel


export class Simkarten extends Article {


    constructor(){
        super();
    }
    async create(...args: any[]) {
        this.app.post('/projektArtikelSimkarte', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                const createdArtikel = await this.createArtikel(projektArtikelData);
                if (projektArtikelData.artikel.simkarten) {
                    await this.createSimkarte(projektArtikelData, createdArtikel.artikel_id);
                }
                await this.createProjektArtikel(projektArtikelData, createdArtikel.artikel_id);

                res.status(200).send({"message": "ProjektArtikel created"});
                console.log("ProjektArtikel created");
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

    async createSimkarte(projektArtikelData: any, artikelId: number) {
        return await this.prisma.simkarten.create({
            data: {
                kundennummer: projektArtikelData.artikel.simkarten.kundennummer ?? "",
                rufnummer: projektArtikelData.artikel.simkarten.rufnummer ?? "",
                tarif: projektArtikelData.artikel.simkarten.tarif ?? "",
                pin: projektArtikelData.artikel.simkarten.pin ?? "",
                puk: projektArtikelData.artikel.simkarten.puk ?? "",
                einsatzort: projektArtikelData.artikel.simkarten.einsatzort ?? "",
                aktiv: projektArtikelData.artikel.simkarten.aktiv ?? false,
                artikel_id: artikelId // Link the created simkarte to the created artikel
            }
        });
    }



    read(...args: any[]): any {
        this.app.get('/projektArtikelSimkarte/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
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
                            simkarten: true  // Include 'simkarten' in the output
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

    // First function to update artikel



    update(...args: any[]): any {
        this.app.put('/projektArtikelSimkarte', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                // update the simkarten if it exists
                if (projektArtikelData.artikel.simkarten) {
                    const existingSimkarte = await this.prisma.simkarten.findUnique({
                        where: {
                            simkarten_id: projektArtikelData.artikel.simkarten.simkarten_id
                        }
                    });

                    if (existingSimkarte) {
                        await this.prisma.simkarten.update({
                            where: {
                                simkarten_id: projektArtikelData.artikel.simkarten.simkarten_id
                            },
                            data: projektArtikelData.artikel.simkarten
                        });
                    }
                }

                // Call the separated methods using 'this'
                await this.updateArtikel(projektArtikelData);
                await this.updateProjektArtikel(projektArtikelData);

                res.status(200).send({"message": "ProjektArtikelSimkarte updated"});
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }


    deletee(...args: any[]): any {
        this.app.delete('/projektArtikelSimkarte/:projekt_artikel_id', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelID = parseInt(req.params.projekt_artikel_id);

            try {
                // Find the related simkarten_id before deleting the projekt_artikel
                const projArtikel = await this.prisma.projekt_artikel.findUnique({
                    where: {
                        projekt_artikel_id: projektArtikelID
                    },
                    include: {
                        artikel: {
                            select: {
                                simkarten: {
                                    select: {
                                        simkarten_id: true
                                    }
                                }
                            }
                        }
                    }
                });

                const simkartenID = projArtikel?.artikel.simkarten.simkarten_id;

                if (simkartenID !== undefined) {
                    // Delete the associated simkarten entry
                    await this.prisma.simkarten.delete({
                        where: {
                            simkarten_id: simkartenID
                        }
                    });
                }

                // Delete the projekt_artikel entry
                await this.prisma.projekt_artikel.delete({
                    where: {
                        projekt_artikel_id: projektArtikelID
                    }
                });

                res.status(200).send({"message": "Simkarte und ProjektArtikel wurden erfolgreich gelöscht"});
            } catch (error) {
                res.status(500).send({"message": error.message});
            }
        });
    }
}



// {
//     "projekt_id": 802007,
//     "menge": 0,
//     "artikel": {
//         "artikelname": "karte2",
//         "unterkategorie_id": 2,
//         "preis": "1",
//         "beschreibung": "lkj",
//         "bild_url": null,
//         "zustand": null,
//         "einkaufs_datum": "2023-06-12T07:24:06.000Z",
//         "belegt_von": "2023-06-12T08:24:29.000Z",
//         "belegt_bis": "2023-06-12T08:24:29.000Z",
//         "anlagenummer": "123",
//         "edit_date": "2023-06-12T07:24:06.000Z",
//         "besitzer_id": null,
//         "firma": "lkj",
//         "model": "lkj",
//         "seriennummer": "123",
//         "unterkategorie": {
//             "unterkategorie_id": 2,
//             "unterkategoriename": "Simkarten",
//             "kategorie_id": 2
//         },
//         "simkarten": {
//             "kundennummer": "1",
//             "rufnummer": "2",
//             "tarif": "3",
//             "pin": "4",
//             "puk": "5",
//             "einsatzort": "6",
//             "aktiv": false
//         }
//     }
// }
