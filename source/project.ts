import {Database} from "./database";

interface IProject {
    id: number;
    name: string;
}

// @ts-ignore
export class Project extends Database implements IProject {
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

    constructor(id: number, name: string) {
        super();
        this.id = id;
        this.name = name;
    }

    async create() {
        await this.prisma.project.create({
            data: {
                id: this.id,
                name: this.name
            }
        })
    }

    async delete() {
        //delete project with this id
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
