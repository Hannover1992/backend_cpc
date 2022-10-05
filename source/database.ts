import {PrismaClient} from "@prisma/client";
import {Projects} from "./table/projects";
//test

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

    constructor(prisma: PrismaClient ) {
        this.prisma = prisma;
        this.projects = new Projects(prisma);
        this.setup_express();
    }

    async read() {
        await this.projects.read();
    }

    setup_express(){
        this._app = require('express')();
        this._PORT = 8080;
    }

    async start_server() {
        await this.read()
        await this.run_apis();
    }


    async run_apis() {
        this.app.liste(this._PORT, () => {
            console.log(`Example app listening at http://localhost:${this._PORT}`)
        });
    }
}