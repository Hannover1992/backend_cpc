import {Database} from "./database";

interface IProject {
    Ready: Promise<void>;
    id: number;
    name: string;
}

export class Project extends Database implements IProject{
    public Ready: Promise<void>;
    private _id: number;
    private _name: string;


    constructor(id: number, name: string){
        super();
        this._id = id;
        this._name = name;
        this.Ready = this.create(id, name);
    }

    public get name(): string {
        let name;
        this.Ready.then(() => {
            name = this._name;
        });

        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }




    async delete() {
        await this.prisma.project.delete({
            where: {
                Id: this.id
            }
        });
    }

    private update() {
        return this.prisma.project.update({
            where: {
                Id: this.id
            },
            data: {
                Name: this.name
            }
        });
    }

    private async create(id: number, name: string) {
        return await this.prisma.project.create({
            data: {
                Id: id,
                Name: name
            }
        });
    }

    async get_id_direct_from_db() {
        return await this.prisma.project.findUnique({
            where: {
                Id: this.id
            }
            // @ts-ignore
        }).then((project) => {
            return project.Id;
        });
    }

    async get_name_direct_from_db() {
        return await this.prisma.project.findUnique({
            where: {
                Id: this.id
            }
            // @ts-ignore
        }).then((project) => {
            return project.Name;
        });
    }
}