import {Database} from "../database";

interface IProject {
    id: number;
    name: string;
}

// @ts-ignore
export class Project extends Database implements IProject, I_CRUD {
    private _id: number;
    private _name: string;

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    constructor(id: number, name?: string) {
        super();
        this.id = id;
        this.name = name || " ";
    }

    async create() {
        await this.prisma.project.create({
            data: {
                id: this.id,
                name: this.name
            }
        })
    }

    async read(id?: number) {
        //read form database if project exists then set this.name = name from db
        await this.prisma.project.findMany({
            where: {
                id: id || this.id
            }
        }).then((result: any) => {
            if(result.length > 0) {
                this.name = result[0].name;
            } else {
                throw new Error("Project not found in db");
            }
        })
    }

    async update() {
        await this.prisma.project.update({
            where: {
                id: this.id
            },
            data: {
                name: this.name
            }
        })
    }

    async delete() {
        await this.prisma.project.delete({
            where: {
                id: this.id
            }
        })
    }


    public async project_exists_in_db(): Promise<boolean> {
        const users = await this.prisma.project.findMany({
            where: {
                id: this.id,
                name: this.name
            }
        });
        return users.length > 0;
    }
}
