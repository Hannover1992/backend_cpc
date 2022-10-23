import {PrismaClient} from "prisma/prisma-client/scripts/default-index";
import {I_CRUD} from "../../Interface/I_CRUD";
import {I_Project} from "../../Interface/row/I_Project";

export class Project implements I_Project, I_CRUD {

    get prisma(): PrismaClient {
        return this._prisma;
    }
    set prisma(value: PrismaClient) {
        this._prisma = value;
    }
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

    private _id: number;
    private _name: string;
    private _prisma: PrismaClient;

    constructor(prisma: PrismaClient,id : number, name?: string) {
        this.prisma = prisma;
        this.id = id;
        this.name = name || " ";
    }

    async create() {
        await this.prisma.tblprojekte.create({
            data: {
                id: this.id,
                name: this.name
            }
        })
    }

    async read(id?: number) {
        //read form database if projects exists then set this.name = name from db
        await this._prisma.tblprojekte.findMany({
            where: {
                id: id || this.id
            }
        }).then((result: any) => {
            if(result.length > 0) {
                this.name = result[0].name;
            } else {
                throw new Error("Project not found in db");
            }
        }).catch(
            () => {
                throw new Error("Project not found in db");
            }
        )
    }

    async update() {
        await this._prisma.tblprojekte.update({
            where: {
                id: this.id
            },
            data: {
                name: this.name
            }
        })
    }

    async delete() {
        await this._prisma.tblprojekte.delete({
            where: {
                id: this.id
            }
        })
    }


    public async project_exists_in_db(): Promise<boolean> {
        const users = await this._prisma.tblprojekte.findMany({
            where: {
                id: this.id,
                name: this.name
            }
        });
        return users.length > 0;
    }

    get_ready_to_send_over_rest_api(){
        return {
            id: this._id,
            name: this._name,
            prisma: null
        }
    }

}
