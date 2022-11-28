import {PrismaClient} from "@prisma/client";
import {Database} from "./database";
let prisma: PrismaClient = new PrismaClient();

let database: Database = new Database(prisma);

async function start() {
    await database.projects.delete();
    await database.projects.generate_array_of_projects(0, 9);
    await database.projects.create();
    await database.start_server();
    let prisma_1 = new PrismaClient();
    prisma_1.tblprojekte.findMany();
}
// test git

start();
