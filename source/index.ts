import {Projects} from "./table/projects";
import {PrismaClient} from "@prisma/client";



async function test() {

    let projects: Projects = new Projects(new PrismaClient());
    projects.generate_array_of_projects(1, 3);
    projects.create();

    await projects.delete()
    expect(projects.projects.length).toBe(0);
    prisma.project.findMany()
}