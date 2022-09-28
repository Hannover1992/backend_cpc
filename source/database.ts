import {PrismaClient} from "@prisma/client";
import {Projects} from "./table/projects";

export class Database {
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

    private _prisma: any;
    private _projects: Projects;
    private _app: any;
    private _PORT: number;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
        this.projects = new Projects(this.prisma);
    }

    private async read_tables() {
        await this.projects.read();
    }

    private setup_express(){
        this._app = require('express')();
        this._PORT = 8080;
    }

    public async start_apis() {
        this.read_tables()
            .then(() => {
                this.setup_express();
            }).then(() => {
                this._app.get('/', (req: any, res: any) => {
                    res.send('Hello World!')
                })
            });
    }
}