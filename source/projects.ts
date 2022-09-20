import {Database} from "./database";
import {Project} from "./project";


export class Projects extends Database {
    public Ready: Promise<void>;
    projects: Project[];
    length: number;

    constructor() {
        super();
        this.length = 0;
        this.Ready = this.update();
    }

    async delete_all_projects() {
        await this.prisma.project.deleteMany();
    }

    async create_project(number: number, name: string) {
        try {
            await this.prisma.project.create({
                data: {
                    Id: number,
                    Name: name
                }
            });
            this.length++;
        }
        catch (error) {
            throw error;
        }
    }

    async update() {
        let arr_of_projects = await this.prisma.project.findMany();
        this.projects = [];
        for (let i = 0; i < arr_of_projects.length; i++) {
            this.projects.push(new Project(arr_of_projects[i].Id, arr_of_projects[i].Name));
        }
    }
}

// async update(): Promise<Projects> {
//    this.projects = await this.prisma.project.findMany()
// this.length = this.projects.length;
// await this.prisma.project.findMany().then(
//     (projects: Projects) => {
//         this.projects = projects;
//         this.length = projects.length;
//     }
// ).catch(
//     //return error
//
// return this.projects;
// }


// async get_all_projects() {
//     return await this.prisma.project.findMany();
// }

//
// create_project(_Id: number, _Location: string) {
//     this.prisma.project.create({
//         data: {
//             Id: _Id,
//             Location: _Location
//         }
//     }).then(() => {
//         console.log("inserted")
//     }).catch(() => {
//         console.log("error")
//     });
// }
// update() {
//     this.get_all_projects()
//         .then((projects) => {
//             this.projects = projects;
//         })
//         .catch((e) => {
//             return e;
//         });
// }
