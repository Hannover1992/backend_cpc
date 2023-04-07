import {PrismaClient} from "@prisma/client";
import {Database} from "./Classes/database";
let prisma: PrismaClient = new PrismaClient();

let database: Database = new Database(prisma);

async function start() {
    async function create_test_enviroment() {
        // await database.projects.delete();
        // await database.projects.generate_array_of_projects(0, 9);
        // await database.projects.create();
        // await database.projects.read();
    }
    // await create_test_enviroment();
    await database.start_server();
}

start();

