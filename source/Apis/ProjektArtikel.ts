import {ServerSetup} from "../ServerSetup";

export class ProjektArtikel extends ServerSetup {

    constructor() {
        super();
    }

    create(...args: any[]): any {
    }

    deletee(...args: any[]): any {
    }

    read(...args: any[]): any {
        this.app.get('/projekt_artikel', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            const inputet_projekt_id = req.query.projekt_id;
            const inputet_unterkategoriename = req.query.unterkategoriename;
            this.prisma.projekt_artikel.findMany({
                where: {
                    artikel: {
                        unterkategorie: {
                            unterkategoriename: {
                                equals: 'Verkehrstechnik',
                            },
                        },
                    },
                },
                include: {
                    artikel: {
                        include: {
                            unterkategorie: {
                                include: {
                                    kategorien: true,
                                },
                            },
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


    async getFilteredProjektArtikel(projekt_id: any, unterkategoriename: any) {
        const result = await this.prisma.projekt_artikel.findMany({
            where: {
                projekt_artiekl_id: projekt_id,
                artikel: {
                    unterkategorie: {
                        unterkategoriename: {
                            contains: unterkategoriename,
                        },
                    },
                },
            },
            include: {
                artikel: {
                    select: {
                        artikel_id: true,
                        artikelname: true,
                        unterkategorie: true,
                    },
                },
            },
        });

        return result;
    }



    update(...args: any[]): any {
    }


}
