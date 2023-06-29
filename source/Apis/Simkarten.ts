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

    deletee(...args: any[]): any {
    }

    read(...args: any[]): any {
        this.app.get('/projektSimkarten/:projekt_id/:unterkategoriename', async (req: any, res: any) => {
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
    }
}