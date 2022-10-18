import {PrismaClient} from "@prisma/client";
import {Projects} from "./table/projects";
//test

export class Database {
    get cors(): any {
        return this._cors;
    }

    set cors(value: any) {
        this._cors = value;
    }
    get projects(): Projects {
        return this._projects;
    }
    set projects(value: Projects) {
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

    private _cors: any;
    private _prisma: any;
    private _projects: Projects;
    private _app: any;
    private _PORT: number;

    constructor(prisma: PrismaClient ) {
        this.prisma = prisma;
        this.projects = new Projects(prisma);
        this.setup_express();
    }

    async read() {
        await this.projects.read();
    }

    setup_express(){
        this._cors = require('cors');
        this._app = require('express')();
        this._PORT = 8080;

        this.app.use(this.cors({origin: '*'}));
    }

    async start_server() {
        await this.read()
        await this.run_apis();
    }

    async run_apis() {
        this.app.listen(this._PORT, () => {
            console.log(`Server running on port ${this._PORT}`);
        });

        this.projects_CRUD();
        this.project_CRUD();
    }

    private projects_CRUD() {
        this.projects_read()
    }

    private projects_read() {
        this.app.get('/projects', (req: any, res: any) => {
            // res.setHeader('Access-Control-Allow-Origin', '*');
            console.log(this.projects.project);
            res.status(200).send(this.projects.get_ready_to_send_over_rest_api());
        });
    }

    private project_CRUD() {
        this.project_read();
    }

    private project_read() {
        this.app.get('/project/:id', (req: any, res: any) => {

            const id = req.params.id;
            const project = this.projects.project[id];
            //if project undefiend
            if(project === undefined) {
                res.status(404).send({"message" : "Project not found"});
            } else {
                res.status(200).send(project.get_ready_to_send_over_rest_api());
            }
        });
    }
}
