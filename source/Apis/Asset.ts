import {ServerSetup} from "../ServerSetup";
import {get_id_from_request} from "../Function/string_manipulation";


export class Asset extends ServerSetup {

    constructor() {
        super();
    }

    //toDo: eintlich hier, ich muss erstm mal die Assets erstellen,
    //dabei werden die Kategorien und Unterkategorien erstellt mit ihren id die ich brauche um die Assets zu erstellen

    async create(req: any, res: any) {
        this.app.post('/assets', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            const artikelData = req.body.artikel;
            try {

                await this.create_new_artikel(artikelData);
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

    async create_new_artikel(artikelData: any) {
        const kategorienData = artikelData.unterkategorie.kategorien;
        let new_kategorie_data = await this.create_new_Kategory(kategorienData);
        const unterkategorie = artikelData.unterkategorie;
        let unterkategorie_new_data = await this.create_new_unterkategory(unterkategorie, kategorienData);
        return await this.create_artikel(artikelData, unterkategorie_new_data);;
    }


    private async create_artikel(artikelData: any, unterkategorie: any) {
        const createdArtikel = await this.prisma.artikel.findFirst({
            where: { artikel_id: artikelData.artikel_id },
        });
        //temp
        // delete artikelData.unterkategorie;


        //toDo: eintlich,
        if (!createdArtikel) {
            return await this.prisma.artikel.create({
                data: {
                    ...artikelData,
                    unterkategorie_id: unterkategorie.unterkategorie_id,
                },
                include: {
                    unterkategorie: true
                }

            });
        } else {
            return createdArtikel;
        }

    }

    private async create_new_Kategory(kategorienData: any) {

        const kategorie = await this.prisma.kategorien.findFirst({
            where: { kategorie_id: kategorienData.kategorie_id },
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
            return await this.prisma.unterkategorie.create({
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
            const project_number = req.query.project_number;

            try {
                await this.prisma.artikel.findMany({
                    include: {
                        unterkategorie: {
                            include: {
                                kategorien: true
                            }
                        }
                        ,
                        assets: true
                    }
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





