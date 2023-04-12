import {ServerSetup} from "../ServerSetup";

export class KategorienTable extends ServerSetup{

constructor() {
        super();
    }

    create() {
        this.app.post('/kategorie', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            await this.prisma.kategorien.create({
                data: {
                    kategoriename: req.body.kategoriename
                }
            }).then(() => {
                res.status(200).send({ "message": "Kategorie created" });
            }).catch((error: any) => {
                res.status(500).send({ "message": error.message });
            });
        });
    }

    read() {
        this.app.get('/kategorie/:id', async (req: any, res: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            const id = parseInt(req.params.id);
            await this.prisma.kategorien.findUnique({
                where: {
                    kategorie_id: id
                },
            }).then((kategorie: any) => {
                res.status(200).send(kategorie);
            }).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });
    }


    update() {
        this.app.put('/kategorie/:id', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            const id = parseInt(req.params.id);
            await this.prisma.kategorien.update({
                where: {
                    kategorie_id: id
                },
                data: {
                    kategoriename: req.body.kategoriename
                },
            }).then(() => {
                res.status(200).send({"message": "Kategorie updated"});
            }).catch((error: any) => {
                res.status(404).send({"message": error.message});
            });
        });
    }

    deletee() {
        this.app.delete('/kategorie/:id', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            const id = parseInt(req.params.id);
            await this.prisma.kategorien.delete({
                where: {
                    kategorie_id: id
                }
            }).then(() => {
                res.status(200).send({"message": "Kategorie deleted"});
            }).catch((error: any) => {
                res.status(404).send({"message": error.message});
            });
        });
    }
}