import {describe, expect, test, beforeAll, afterEach} from '@jest/globals';
import {Projects} from '../../source/table/projects';
import {PrismaClient} from "@prisma/client";
import {Project} from "../../source/row/Project";

let prisma: PrismaClient  = new PrismaClient();

describe("Projects", () => {
    it("should be defined", () => {
        let projects: Projects = new Projects(prisma);
        expect(projects).toBeDefined();
    });

    it("at the beginning the array of project should be empty", () => {
        let projects: Projects = new Projects(prisma);
        //expect project lenght to be 0
        expect(projects.projects.length).toBe(0);
        expect(projects.length).toBe(0);
    });
});

describe("test the function to check if there exist no projects", () => {
    it("should return true if there are no projects", async () => {
        let projects: Projects = new Projects(prisma);
        await projects.delete();
        expect(projects.projects.length).toBe(0);

        let temp = prisma.project.findMany();
        await expect(temp).resolves.toHaveLength(0);

    });

});




describe("test test functionjs", () => {
    let array: number[] = [];

    beforeAll(() => {
        array = generate_array_with_numbers(1, 3, array);
    });
    it("array length should be 3", () => {
        expect(array.length).toBe(3);
    });

    it("array should contain 1", () => {
        expect(array).toContain(1);
    });
});

describe("test generate array of projects" , () => {
  let prisma: PrismaClient = new PrismaClient();

    let projects: Projects = new Projects(prisma);

    beforeAll(async () => {
        await prisma.project.deleteMany();
        projects.generate_array_of_projects(1, 3);
        await projects.create();
    });
    //toDo: bis hierhin funktioniert


    it("array length should be 3", () => {
        expect(projects.projects.length).toBe(3);
    });

    it("array should contain 1", () => {
        expect(projects.projects[0].id).toBe(1);
    });

    it("the name of the second project should be test2", () => {
        expect(projects.projects[1].name).toBe("test2");
    });
});

describe("test create funcion", () => {
    let prisma: PrismaClient = new PrismaClient();
    let projects: Projects = new Projects(prisma);
    beforeAll(async () => {
        await prisma.project.deleteMany();
        projects.generate_array_of_projects(prisma, 1, 3);
        await projects.create();
    });
    it("the length of the array should be 3", () => {
        expect(projects.projects.length).toBe(3);
    });
    it("the name of the second project should be it2", () => {
        expect(projects.projects[1].name).toBe("test2");
    });

    it("the name of the second project should be test2", async () => {
        let project: Project = new Project(prisma, 1, "something");
        try{
            await project.read(9)
            expect(true).toBe(false);
        }
        catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toContain("not found");
        }
    });

    it("check if the project with id 2 in database , and the name test2" , async () => {
        let project: Project = new Project(prisma, 2, "something");
        await project.read(2);
        expect(project.name).toBe("test2");
    });

    it("test if the global projects read funciton, read the project 1,2,3", async () => {
        await projects.read()
        expect(projects.length).toBe(3);
    });

    it('test delete function', async () => {
        await projects.delete()
        expect(projects.projects.length).toBe(0);
        prisma.project.findMany()
    });

    it('test update function', async () => {
        projects.delete();
        await projects.generate_array_of_projects(prisma, 4, 20);
        await projects.create();
        let project = projects.get_project_with_id(5);
        expect(project.name).toBe("test5");
        try{
            projects.get_project_with_id(133);
        }
        catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toContain("not found");
        }
    });

    it('test update of project with id that does not exist', async () => {
        projects.delete();
        await projects.generate_array_of_projects(prisma, 4, 20);

        try {
            let project = await projects.get_project_with_id(5)
        }
        catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toContain("something");
        }

    });
})

function generate_array_with_numbers(start: number, end: number, array: number[]):number[] {
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}


