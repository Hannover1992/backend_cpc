import {Database} from "./database";

export class Projects extends Database {
    projects: Project[];
    number: number;

    constructor() {
        super();
        this.projects = [];
        this.number = 0;
    }



    async get_all_projects() {
        return await this.prisma.project.findMany();
    }

    async update_projects() {
        this.projects = await this.get_all_projects();
        this.number = this.projects.length;
    }

    insert_project(_id: number, _name: string) {
        try{
            this.prisma.project.create({
                data: {
                    id: _id,
                    name: _name
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

}