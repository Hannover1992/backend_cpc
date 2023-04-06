import {PrismaClient} from "@prisma/client";
import {ProjectTable} from "./table/projectTable";
import {Project} from "./row/project";


export class Database {

    get bodyParser(): any {
        return this._bodyParser;
    }
    set bodyParser(value: any) {
        this._bodyParser = value;
    }
    get cors(): any {
        return this._cors;
    }
    set cors(value: any) {
        this._cors = value;
    }
    get prisma(): any {
        return this._prisma;
    }
    set prisma(value: any) {
        this._prisma = value;
    }
    get app(): any {
        return this._app;
    }
    set app(value: any) {
        this._app = value;
    }

    private _cors: any;
    private _prisma: any;
    private _app: any;
    private _PORT: number;
    private _bodyParser: any;

    constructor(prisma: PrismaClient ) {
        this.prisma = prisma;
        this.setup_express();
    }

    private start_listen() {
        this.app.listen(this._PORT, () => {
            console.log(`Server running on port ${this._PORT}`);
        });
    }

    private allow_any_sites_to_talk_with_this_id() {
        this.app.use(this.cors({origin: '*'}));
    }

    private allow_communikation_from_all_ip_adress(res: any) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    setup_express(){
        this._cors = require('cors');
        this._app = require('express')();
        this._bodyParser = require('body-parser');
        this.app.use(this.bodyParser.json());
        this._PORT = 8080;
        this.allow_any_sites_to_talk_with_this_id();
    }

    async start_server() {
        // await this.projects.read();
        await this.run_apis();
    }

    async run_apis() {
        this.start_listen();
        this.projects_CRUD();
        this.project_CRUD();
    }

    private projects_CRUD() {
        this.projects_read();
    }

    private projects_read() {
        this.app.get('/projects', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            this._prisma.tblprojekte.findMany().
            then((projects: any) => {
                res.status(200).send(projects);
                // console.log(projects)
            } ).catch((error: any) => {
                res.status(500).send({"message": error.message});
            } );
        });
    }
    //

    private project_CRUD() {
        this.project_read();
        this.project_create();
        this.project_update();
        this.project_delete();
    }

    private project_read() {
        this.app.get('/project/:id', (req: any, res: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            let id = this.get_id(req);
            this._prisma.tblprojekte.findUnique({
                where: {
                    ID: id
                }
            }).then((project: any) => {
                res.status(200).send(project);
            } ).catch((error: any) => {
                res.status(500).send({"message": error.message});
            } );
        });
    }

    public get_id(req: any) {
        let id_as_string = req.params.id;
        let id = parseInt(id_as_string);
        return id;
    }


    private project_create() {
        this.app.post('/project', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            this.prisma.tblprojekte.create({
                data: req.body
            }) .then((project: any) => {
                res.status(200).send({"message" : "Project created"});
            } ).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });
    }

    private project_update() {
        this.app.put('/project/:id', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let id : number = parseInt(req.body.ID);
            this._prisma.tblprojekte.update({
                where: {
                    ID: id
                },
                data: req.body
            }).then((result: any) => {
                console.log("Project with ID: " + id + " wurde updated");
            }).then(() => {
                res.status(200).send({"message" : "Project updated"});
            }).catch((error: any) => {
                res.status(404).send({"message" : error.message});
            });
        });
    }

    private project_delete() {
        this.app.delete('/project/:id', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let id = this.get_id(req);
            this._prisma.tblprojekte.delete({
                where: {
                    ID: id
                }
            }) .then(() => {
                res.status(200).send({"message" : "Project deleted"});
            }).catch((error: any) => {
                res.status(404).send({"message" : error.message});
            });
        });
    }

}

