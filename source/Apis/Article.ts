// First function to update artikel
async function updateArtikel(projektArtikelData : any) {
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

// Second function to update projekt_artikel
async function updateProjektArtikel(projektArtikelData : any) {
    await this.prisma.projekt_artikel.update({
        where: {
            projekt_artikel_id: projektArtikelData.projekt_artikel_id
        },
        data: {
            menge: projektArtikelData.menge,
        }
    });
}