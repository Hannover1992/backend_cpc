import {Database} from "./database";
import {Project} from "./project";


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

    //
    // insert_project(_Id: number, _Location: string) {
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
    update() {
        this.get_all_projects()
            .then((projects) => {
                this.projects = projects;
            })
            .catch((e) => {
                return e;
            });
    }
}