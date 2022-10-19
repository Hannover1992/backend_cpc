import {I_CRUD} from "../../Interface/I_CRUD";
import {Project} from "../row/project";
import {PrismaClient} from "prisma/prisma-client/scripts/default-index";
import assert = require("assert");
import {I_Projects} from "../../Interface/table/I_Projects";

// export interface I_Projects extends I_CRUD{
//     get projects(): Project[];
//     get_project(number: number) : Project;
//     set projects(value: Project[]);
//     get length(): number ;
//     set length(value: number) ;
// }

//create public class Projects
export  class Projects implements I_Projects{
    private _project: Project[];
    private _length: number;
    private _prisma: PrismaClient;

    //toDo: rewrite get projects generic
    get project(): Project[] {
        return this._project;
    }
    get_project(number: number) : Project {
        for (let i = 0; i < this._project.length; i++) {
            if (this._project[i].id == number) {
                return this._project[i];
            }
        }
        throw new Error("Project not found");
    }
    set project(value: Project[]) {
        this._project = value;
    }

    get length(): number {
        return this._length;
    }
    set length(value: number) {
        this._length = value;
    }

    get prisma(): PrismaClient {
        return this._prisma;
    }
    set prisma(value: PrismaClient) {
        this._prisma = value;
    }


    //create constructor
    constructor(prisma: PrismaClient) {
        this._prisma = prisma;
        this._project = []
        this._length = 0

    }

    //toDo: Promise.All
    async create(...args: any[]): Promise<any> {
        for (let i = 0; i < this._project.length; i++) {
            await this._project[i].create()
        }
        this._length = this._project.length;
    }


    async read(...args: any[]) {
        this._project = [];
        await this._prisma.project.findMany()
            .then((result: any) => {
                for (let i = 0; i < result.length; i++) {
                    let project: Project = new Project(this._prisma, result[i].id, result[i].name);
                    this._project.push(project);
                }
                this._length = this._project.length;
            });
    }

    async delete(...args: any[]) {
        return await this._prisma.project.deleteMany()
            .then(() => {
              this._length = 0;
              this.project = [];
            }).then(() => {
                assert(this._length == 0);
        });
    }


    async update(...args: any[]): Promise<any> {
        for (let i = 0; i < this._project.length; i++) {
            await this._project[i].update();
        }
    }


    generate_array_of_projects(start: number, end: number) {
        this.project = [];
        for (let i = start; i <= end; i++) {
            let project: Project = new Project(this._prisma, i, "test" + i.toString());
            this._project.push(project);
        }
        this._length = this._project.length;
        // console.log("Generated " + this._length + " projects");
    }

    print() {
        for (let i = 0; i < this._project.length; i++) {
            console.log("Id:" + this._project[i].id + " Name:" + this._project[i].name);
        }
    }

    get_ready_to_send_over_rest_api() {
        let projects_to_send: Projects = new Projects(null);
        for (let i = 0; i < this._project.length; i++) {
            projects_to_send.project.push(new Project(null, this._project[i].id, this._project[i].name));
            projects_to_send.length++;
        }
        return projects_to_send
    }
}
