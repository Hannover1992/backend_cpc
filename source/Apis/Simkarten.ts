import {ServerSetup} from "../ServerSetup";


export class Simkarten extends ServerSetup {


    constructor(){
        super();
    }
    create(...args: any[]): any {
        this.app.post('/projektArtikelSimkarte', async (req: any, res: any) => {
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
                            simkarten: {
                                create: {
                                    kundennummer: projektArtikelData.artikel.simkarten.kundennummer,
                                    rufnummer: projektArtikelData.artikel.simkarten.rufnummer,
                                    tarif: projektArtikelData.artikel.simkarten.tarif,
                                    pin: projektArtikelData.artikel.simkarten.pin,
                                    puk: projektArtikelData.artikel.simkarten.puk,
                                    einsatzort: projektArtikelData.artikel.simkarten.einsatzort,
                                    aktiv: projektArtikelData.artikel.simkarten.aktiv
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

    update(...args: any[]): any {
        this.app.put('/projektArtikelSimkarte', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;
            try {
                 await this.prisma.projekt_artikel.update({
                    where: {
                        projekt_artikel_id: projektArtikelData.projekt_artikel_id,
                    },
                    data: {
                        menge: projektArtikelData.menge,
                        tblprojekte: {
                            connect: {
                                ID: projektArtikelData.projekt_id
                            }
                        }
                    }
                });

                await this.prisma.artikel.update({
                    where: {
                        artikel_id: projektArtikelData.artikel.artikel_id
                    },
                    data: {
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
                    }
                });

                await this.prisma.simkarten.update({
                    where: {
                        simkarten_id: projektArtikelData.artikel.simkarten.simkarten_id
                    },
                    data: {
                        kundennummer: projektArtikelData.artikel.simkarten.kundennummer,
                        rufnummer: projektArtikelData.artikel.simkarten.rufnummer,
                        tarif: projektArtikelData.artikel.simkarten.tarif,
                        pin: projektArtikelData.artikel.simkarten.pin,
                        puk: projektArtikelData.artikel.simkarten.puk,
                        einsatzort: projektArtikelData.artikel.simkarten.einsatzort,
                        aktiv: projektArtikelData.artikel.simkarten.aktiv
                    }
                });

                res.status(200).send({"message": "ProjektArtikel updated"});
                console.log("ProjektArtikel updated");
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }
}

