import {Database} from "./database";
import {Project} from "./project";


export class Projects extends Database {
    public ready: Promise<void>;
    projects: Project[];
    length: number;

    constructor() {
        super();
        this.length = 0;
        this.ready = this.get_projects();
    }

    async delete_all_projects() {
        await this.prisma.project.deleteMany();
    }

    async update() {
        let arr_of_projects = await this.prisma.project.findMany();
        this.projects = [];
        for (let i = 0; i < arr_of_projects.length; i++) {
            this.projects.push(new Project(arr_of_projects[i].Id, arr_of_projects[i].Name));
        }
    }

    public async get_projects() {
        this.ready = await this.prisma.project.findMany().
        then(
            (result: any) => {
                this.projects = [];
                for (let i = 0; i < result.length; i++) {
                    this.projects.push(new Project(result[i].id, result[i].name));
                }
                this.length = result.length;
            }
        ).catch( (error: any) => { throw error; } );
    }

}

