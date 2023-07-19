import {ServerSetup} from "../ServerSetup";
import {Article} from "./Article";

export class Notebook extends Article {


    constructor() {
        super();
    }

    async create(...args: any[]) {
        this.app.post('/projektArtikelNotebook', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let projektArtikelData = req.body;

            try {
                const createdArtikel = await this.createArtikel(projektArtikelData);
                if (projektArtikelData.artikel.notebook) {
                    await this.createNotebook(projektArtikelData, createdArtikel.artikel_id);
                }
                await this.createProjektArtikel(projektArtikelData, createdArtikel.artikel_id);

                res.status(200).send({"message": "ProjektArtikel with Notebook created"});
                console.log("ProjektArtikel with Notebook created");
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

    async createNotebook(projektArtikelData: any, artikelId: number) {
        return await this.prisma.notebook.create({
            data: {
                admin_konto_name: projektArtikelData.artikel.notebook.admin_konto_name ?? "",
                admin_konto_password: projektArtikelData.artikel.notebook.admin_konto_password ?? "",
                user_konto_name: projektArtikelData.artikel.notebook.user_konto_name ?? "",
                user_konto_password: projektArtikelData.artikel.notebook.user_konto_password ?? "",
                artikel: {
                    connect: {
                        artikel_id: artikelId, // Link the created notebook to the created artikel
                    }
                }
            }
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
                // Update the notebook if it exists
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

                // Call the separated methods using 'this'
                await this.updateArtikel(projektArtikelData);
                await this.updateProjektArtikel(projektArtikelData);

                res.status(200).send({"message": "ProjektArtikelNotebook updated"});
            } catch (error) {
                res.status(500).send({"message": error.message});
                console.log(error.message);
            }
        });
    }

    deletee(...args: any[]): any {
    }

}
