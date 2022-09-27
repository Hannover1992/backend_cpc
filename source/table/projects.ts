import {I_CRUD} from "../interface/I_CRUD";
import {Project} from "../row/Project";
import {Database} from "../database";
import {PrismaClient} from "prisma/prisma-client/scripts/default-index";
import assert = require("assert");

//create public class Projects
export  class Projects extends Database implements I_CRUD{
    private _projects: Project[];
    private _length: number;

    // @ts-ignore
    get projects(): Project[] {
        return this._projects;
    }
    // @ts-ignore
    set projects(value: Project[]) {
        this._projects = value;
    }
    get length(): number {
        return this._length;
    }
    set length(value: number) {
        this._length = value;
    }

    //create constructor
    constructor(prisma: PrismaClient) {
        super(prisma);
        this._projects = []
        this._length = 0

    }

    async create(...args: any[]): Promise<any> {
        for (let i = 0; i < this._projects.length; i++) {
            await this._projects[i].create()
        }
        this._length = this._projects.length;
    }


    async read(...args: any[]) {
        this._projects = [];
        await this.prisma.project.findMany()
            .then((result: any) => {
                for (let i = 0; i < result.length; i++) {
                    let project: Project = new Project(this.prisma, result[i].id, result[i].name);
                    this._projects.push(project);
                }
                this._length = this._projects.length;
            });
    }

    async delete(...args: any[]) {
        return await this.prisma.project.deleteMany()
            .then((result: any) => {
              this._length = 0;
              this.projects = [];
            }).then(() => {
                assert(this._length == 0);
        });
    }


    async update(...args: any[]): Promise<any> {
        for (let i = 0; i < this._projects.length; i++) {
            await this._projects[i].update();
        }
    }


    generate_array_of_projects(start: number, end: number) {
        for (let i = start; i <= end; i++) {
            let project: Project = new Project(this.prisma, i, "test" + i.toString());
            this._projects.push(project);
        }
        this._length = this._projects.length;
        console.log("Generated " + this._length + " projects");
    }

    print() {
        for (let i = 0; i < this._projects.length; i++) {
            console.log("Id:" + this._projects[i].id + " Name:" + this._projects[i].name);
        }
    }

    get_project_with_id(number: number) : Project {
        let length = this.length;
        for (let i = 0; i < this._projects.length; i++) {
            if (this._projects[i].id == number) {
                return this._projects[i];
            }
        }
        throw new Error("Project not found");
    }
}