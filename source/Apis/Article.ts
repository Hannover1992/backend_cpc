// First function to update artikel
import {ServerSetup} from "../ServerSetup";


export abstract class Article extends ServerSetup {


    async updateProjektArtikel(projektArtikelData: any) {
        await this.prisma.projekt_artikel.update({
            where: {
                projekt_artikel_id: projektArtikelData.projekt_artikel_id
            },
            data: {
                menge: projektArtikelData.menge,
            }
        });
    }


// First function to update artikel
    async updateArtikel(projektArtikelData: any) {
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
                    artikelname: projektArtikelData.artikel.artikelname,
                    unterkategorie: {
                        connect: {
                            unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                        }
                    },
                    preis: parseFloat(projektArtikelData.artikel.preis) || 0,
                    beschreibung: projektArtikelData.artikel.beschreibung ?? "",
                    zustand: projektArtikelData.artikel.zustand ?? "",
                    einkaufs_datum: new Date(projektArtikelData.artikel.einkaufs_datum) || undefined,
                    belegt_von: new Date(projektArtikelData.artikel.belegt_von) || undefined,
                    belegt_bis: new Date(projektArtikelData.artikel.belegt_bis) || undefined,
                    anlagenummer: projektArtikelData.artikel.anlagenummer ?? "",
                    edit_date: new Date(projektArtikelData.artikel.edit_date) || undefined,
                    firma: projektArtikelData.artikel.firma ?? "",
                    model: projektArtikelData.artikel.model ?? "",
                    seriennummer: projektArtikelData.artikel.seriennummer ?? "",
                },
            });
        } else {
            throw new Error(`Artikel with ID ${projektArtikelData.artikel_id} does not exist.`);
        }
    }

    async createArtikel(projektArtikelData: any) {
        return await this.prisma.artikel.create({
            data: {
                artikelname: projektArtikelData.artikel.artikelname,
                unterkategorie: {
                    connect: {
                        unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                    }
                },
                preis: parseFloat(projektArtikelData.artikel.preis) || 0,
                beschreibung: projektArtikelData.artikel.beschreibung ?? "",
                zustand: projektArtikelData.artikel.zustand ?? "",
                einkaufs_datum: new Date(projektArtikelData.artikel.einkaufs_datum) || undefined,
                belegt_von: new Date(projektArtikelData.artikel.belegt_von) || undefined,
                belegt_bis: new Date(projektArtikelData.artikel.belegt_bis) || undefined,
                anlagenummer: projektArtikelData.artikel.anlagenummer ?? "",
                edit_date: new Date(projektArtikelData.artikel.edit_date) || undefined,
                firma: projektArtikelData.artikel.firma ?? "",
                model: projektArtikelData.artikel.model ?? "",
                seriennummer: projektArtikelData.artikel.seriennummer ?? "",
            }
        });
    }

    async createProjektArtikel(projektArtikelData: any, artikelId: number) {
        return await this.prisma.projekt_artikel.create({
            data: {
                menge: projektArtikelData.menge,
                tblprojekte: {
                    connect: {
                        ID: projektArtikelData.projekt_id
                    }
                },
                artikel: {
                    connect: {
                        artikel_id: artikelId
                    }
                }
            }
        });
    }
}