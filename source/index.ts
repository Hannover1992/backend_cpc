import {Projects} from "./table/projects";
import {PrismaClient} from "@prisma/client";
import {Database} from "./database";
let prisma: PrismaClient = new PrismaClient();

async function temp() {
    prisma.project.create({
        data: {
            id: 1,
            name: "test"
        }
    });
    prisma.project.create(
        {
            data: {
                id: 1,
                name: "test"
            }
        }
    ).catch((error: any) => {
        throw new Error(error);
    });
}

temp();