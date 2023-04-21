import {ServerSetup} from "../ServerSetup";
import {get_id_from_request} from "../Function/string_manipulation";


export class Asset extends ServerSetup {

    constructor() {
        super();
    }

    async create(req: any, res: any) {
        this.app.post('/assets', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            const Inventarnummer = req.body.Inventarnummer;
            const artikelData = req.body.artikel;
            try {
                const createdArtikel = await this.create_new_artikel(artikelData);
                // await this.create_new_Asset(Inventarnummer, createdArtikel);
                res.status(200).send({
                    message: "Asset created",
                });
            } catch (error) {
                console.error(error);
                res.status(500).send({message: error.message});
            }
        });
    }

    private async create_new_Asset(Inventarnummer: any, createdArtikel: any) {
        const createdAsset = await this.prisma.assets.create({
            data: {
                Inventarnummer: Number(Inventarnummer),
                artikel: {
                    connect: {
                        artikel_id: createdArtikel.artikel_id,
                    },
                },
            },
        });
        return createdAsset;
    }

    private async create_new_artikel(artikelData: any) {
        const kategorienData = artikelData.unterkategorie.kategorien;
        await this.create_new_Kategory(kategorienData);
        const subkategorienData = artikelData.unterkategorie;
        await this.create_new_unterkategory(subkategorienData, kategorienData);
        const unterkategorie = artikelData.unterkategorie;
        const createdArtikel = await this.create_artikel(artikelData, unterkategorie);
        return createdArtikel;
    }


    private async create_artikel(artikelData: any, unterkategorie: any) {
        const createdArtikel = await this.prisma.artikel.findFirst({
            where: { artikel_id: artikelData.artikel_id },
        });

        delete artikelData.kategorien;

        if (!createdArtikel) {
            await this.prisma.artikel.create({
                data: {
                    ...artikelData,
                    unterkategorie_id: unterkategorie.unterkategorie_id, // changed from unterkategorie
                },
            });
        }
    }

    private async create_new_Kategory(kategorienData: any) {

        const kategorie = await this.prisma.kategorien.findFirst({
            where: {kategorie_id: kategorienData.kategorie_id},
        });

        if (!kategorie) {
            await this.prisma.kategorien.create({
                data: kategorienData,
            });
        }
    }


    private async create_new_unterkategory(subkategorienData: any, kategorie: any ) {

        const unterkategorie = await this.prisma.unterkategorie.findFirst({
            where: {unterkategorie_id: subkategorienData.unterkategorie_id},
        });

        if (!unterkategorie) {
            await this.prisma.unterkategorie.create({
                data: {
                    ...subkategorienData,
                    kategorien: {
                        connect: {
                            kategorie_id: kategorie.kategorie_id,
                        },
                    },
                },
            });
        }
    }

    read() {
        this.app.get('/assets', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);

            try {
                await this.prisma.assets.findMany({
                    include: {
                        artikel: {
                            include: {
                                unterkategorie: {
                                    include: {
                                        kategorien: true
                                    }
                                }
                            }
                        }
                    },
                }).then((assets: any) => {
                    res.status(200).send(assets);
                }).catch((error: any) => {
                    res.status(500).send({"message": error.message});
                });
            } catch (error) {
                console.error(error);
                res.status(500).send({message: error.message});
            }
        });
    }

    update() {
        // this.app.put('/project/:id', async (req: any, res: any) => {
        //     this.allow_communikation_from_all_ip_adress(res);
        //     let id = get_id_from_request(req);
        //     await this.prisma.tblprojekte.update({
        //         where: {
        //             ID: id
        //         },
        //         data: req.body
        //     }).then((result: any) => {
        //         console.log("Project with ID: " + id + " wurde updated");
        //     }).then(() => {
        //         res.status(200).send({"message": "Project updated"});
        //     }).catch((error: any) => {
        //         res.status(404).send({"message": error.message});
        //     });
        // });
    }

    deletee() {
        // this.app.delete('/project/:id', async (req: any, res: any) => {
        //     this.allow_communikation_from_all_ip_adress(res);
        //     let id = get_id_from_request(req);
        //     console.log(id);
        //     await this.prisma.tblprojekte.delete({
        //         where: {
        //             ID: id
        //         }
        //     }).then(() => {
        //         res.status(200).send({"message": "Project deleted"});
        //     }).catch((error: any) => {
        //         res.status(404).send({"message": error.message});
        //     });
        // });
    }
}





