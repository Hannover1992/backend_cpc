import {I_CRUD} from "../interface/I_CRUD";
import {Project} from "../row/Project";
import {Database} from "../database";
import {PrismaClient} from "prisma/prisma-client/scripts/default-index";

//create public class Projects
export  class Projects extends Database implements I_CRUD{
    projects: Project[];

    //create constructor
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    create(...args: any[]): any {
    }

    delete(...args: any[]): any {
    }

    read(...args: any[]): any {
    }

    update(...args: any[]): any {
    }

}