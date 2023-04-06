import {PrismaClient} from "@prisma/client";
import {ProjectTable} from "./table/projectTable";
import {Project} from "./row/project";

export class Database {
    private _cors: any;
    private _prisma: any;
    private _projects: ProjectTable;
    private _app: any;
    private _PORT: number;
    private _bodyParser: any;

    constructor(prisma: PrismaClient ) {
        this.prisma = prisma;
        this.projects = new ProjectTable(prisma);
        this.setup_express();
    }


    get bodyParser(): any { return this._bodyParser;
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
    get projects(): ProjectTable {
        return this._projects;
    }
    set projects(value: ProjectTable) {
        this._projects = value;
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

    async read() {
        await this.projects.read();
    }

    setup_express(){
        this._cors = require('cors');
        this._app = require('express')();
        this._bodyParser = require('body-parser');
        this.app.use(this.bodyParser.json());
        this._PORT = 8080;
        this.allow_any_sites_to_talk_with_this_id();
    }

    private allow_any_sites_to_talk_with_this_id() {
        this.app.use(this.cors({origin: '*'}));
    }

    async start_server() {
        await this.read();
        await this.run_apis();
    //    runt he code every 2 seconds
        setInterval(async () => {
            await this.read()
        }, 2000);
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
            this.allow_acces_for_every_ip(res);
            this._prisma.tblprojekte.findMany().
            then((projects: any) => {
                res.status(200).send(projects);
                console.log(projects)
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

    private get_id(req: any) {
        let id_as_string = req.params.id;
        let id = parseInt(id_as_string);
        return id;
    }

    private project_create() {
        this.app.post('/project', async (req: any, res: any) => {
            this.allow_acces_for_every_ip(res);
            await this.prisma.tblprojekte.create({
                data: req.body
            }) .then((project: any) => {
                res.status(200).send({"message" : "Project created"});
            } ).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });
    }


    private create_project_using_request(req: any) {
        let project = new Project(
            this.prisma,
            req.body.ID,
            req.body.Standort,
            req.body.Niederlassung,
            req.body.Auftragsart,
            req.body.Status,
            req.body.Logistikkoordinator,
            req.body.LK_1,
            req.body.LK_2,
            req.body.ZuKo,
            req.body.Auftragsdatum,
            req.body.Startdatum,
            req.body.Endtermin,
            req.body.Netto_Auftragswert,
            req.body.Kommentar,
            req.body.Anlagenummer,
            req.body.PM_1,
            req.body.PM_2
        );
        return project;
    }

    private get_current_project(req: any) {
        const id = req.body.ID;
        let project : Project = this.projects.project[id];
        if (project === undefined) {
            throw new Error("Project not found");
        }
        return project;
    }


    private start_listen() {
        this.app.listen(this._PORT, () => {
            console.log(`Server running on port ${this._PORT}`);
        });
    }

    //toDo: Update hier weiter vereinfachen
    private project_update() {
        let request_project : Project;
        this.app.put('/project', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            try{
                request_project = this.create_project_using_request(req);
                this.projects.get_project(request_project.ID);
                let id = this.get_id(req);
                this._prisma.tblprojekte.update({
                    where: {
                        ID: id
                    },
                    data: req
                }).then((result: any) => {
                    console.log("updated");
                })
                res.status(200).send({"message" : "Project updated"});
            } catch (e) {
                res.status(404).send({"message" : e.message});
            }
        });
    }

    private allow_communikation_from_all_ip_adress(res: any) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    private allow_acces_for_every_ip(res: any) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    private project_delete() {
        this.app.delete('/project/:id', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);

        function get_id() {
            let id = req.params.id;
            return parseInt(id);
        }

        let id = get_id();
        this.projects.delete_project(id)
            .then(() => {
                res.status(200).send({"message" : "Project deleted"});
                this.projects.read();
            }).catch((error: any) => {
                res.status(404).send({"message" : error.message});
            });
        });
    }
}

//toDo: delte length, we have to use onlye the this.projects.length