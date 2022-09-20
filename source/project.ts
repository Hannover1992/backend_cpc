import {Database} from "./database";

interface IProject {
    ready: Promise<any>;
    id: number;
    name: string;
}

export class Project extends Database implements IProject{
    id: number;
    name: string;
    ready: Promise<any>;

    constructor(id: number, name: string) {
        super();
        this.ready = this.prisma.project.create({
            data: {
                id: id,
                name: name
            }
        }).then(
            (result: any) => {
                this.id = result.id;
                this.name = result.name;
            }
        )
    }


    async delete(){
        //delete project with this id
        this.ready = await this.prisma.project.delete({
            where: {
                id: this.id
            }
        }).catch(
            (error: any) => {
                throw error;
            }
        )
    }

    async delete_all_projects(){
        this.ready = await this.prisma.project.deleteMany();
    }

    async update(name: string){
        this.ready = await this.prisma.project.update({
            where: {
                id: this.id
            },
            data: {
                id: this.id,
                name: name
            }
        }).then(
            (result: any) => {
                this.name = result.name;
            }
        ).catch(
            (error: any) => {
                throw error;
            }
        )
    }
}