import {PrismaClient} from "@prisma/client";
import {Project} from "./Classes/Project";
import {ProjectTable} from "./Classes/ProjectTable";
import {ServerSetup} from "./Classes/ServerSetup";


async function start() {
    new Project();
    new ProjectTable();
}

start();

