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
        await this.read()
        await this.run_apis();
    //    runt he code every 2 seconds
        setInterval(async () => {
            await this.read()
        }, 2000);
    }


    async run_apis() {
        this.app.listen(this._PORT, () => {
            console.log(`Server running on port ${this._PORT}`);
        });

        this.projects_CRUD();
        this.project_CRUD();
    }

    private projects_CRUD() {
        this.projects_read();
        this.project_create();
    }

    private projects_read() {
        this.app.get('/projects', (req: any, res: any) => {
            // res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send(res.json(this.projects.get_ready_to_send_over_rest_api()));
            //parse the object to json
            console.log(this.projects.get_ready_to_send_over_rest_api());
            //console log time
            console.log(new Date().toLocaleTimeString());
        });
    }

    private project_CRUD() {
        this.project_read();
    }

    private project_read() {
        this.app.get('/project/:id', (req: any, res: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            const project = this.get_current_project(req);
            //if projects undefiend
            if(project === undefined) {
                res.status(404).send({"message" : "Project not found"});
            } else {
                res.status(200).send(project.get_ready_to_send_over_rest_api());
            }
            console.log(new Date().toLocaleTimeString());
            console.log(project.get_ready_to_send_over_rest_api());
        });
    }

    private project_create() {
        this.app.post('/project/:id', (req: any, res: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            console.log(req.body);
            const project = this.get_current_project(req);
            if(project === undefined) {
                res.status(200).send({"message" : "OK"});
            }
        });
    }

    private get_current_project(req: any) {
        const id = req.params.id;
        const project = this.projects.project[id];
        return project;
    }


}
