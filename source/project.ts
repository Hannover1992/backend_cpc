import {Database} from "./database";

interface IProject {
    ready: Promise<any>;
    id: number;
    name: string;
}

// @ts-ignore
export class Project extends Database implements IProject {
    private id: number;
    private name: string;
    ready: Promise<any>;

    constructor(id: number, name: string) {
        super();
        this.id = id;
        this.name = name;
    }

    async inset_in_database() {
        this.ready = this.prisma.project.create({
            data: {
                id: this.id,
                name: this.name
            }
        }).then(
            (result: any) => {
                this.id = result.id;
                this.name = result.name;
            }
        )
    }

    public async push_to_database() {
        this.ready =
    }

    async sync_with_data_base(){
        //update database
        this.ready = await this.prisma.project.update({
            where: {
                id: this.id
            }
        });
    }

    async delete() {
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

    async set_name(name: string) {
        await this.ready;
        this.ready = await this.prisma.project.update({
            where: {
                id: this.id
            },
            data: {
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

    async set_id(id: number) {
        await this.ready;
        this.ready = await this.prisma.project.update({
            where: {
                id: this.id
            },
            data: {
                id: id,
                name: this.name
            }
        }).then(
            (result: any) => {
                this.id = result.id;
            }
        ).catch(
            (error: any) => {
                throw error;
            }
        )

    }

    public async get_id() {
        await this.ready;
        return this.id;
    }

    public async get_name() {
        await this.ready;
        return this.name;
    }

    public async project_exists_in_db(id: number, name: string) {
        let result = await this.prisma.project.findUnique({
            where: {
                id: id
            }
        });
        return result != null;
    }

}
