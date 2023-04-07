import {PrismaClient} from "@prisma/client";
import {Project} from "./Classes/Project";
import {ServerSetup} from "./Classes/ServerSetup";


async function start() {
    let project = new Project();
    project.CRUD();
    project.projects_CRUD()
}

start();

