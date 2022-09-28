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
        expect(projects.project.length).toBe(0);
        expect(projects.length).toBe(0);
    });
});

describe("test the function to check if there exist no project", () => {
    it("should return true if there are no project", async () => {
        let projects: Projects = new Projects(prisma);
        await projects.delete();
        expect(projects.project.length).toBe(0);
        let temp = await prisma.project.findMany();
        await expect(temp.length).toBe(0);
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

describe("test generate array of project" , () => {
    let prisma: PrismaClient = new PrismaClient();

    let projects: Projects = new Projects(prisma);

    beforeAll(async () => {
        await prisma.project.deleteMany();
        projects.generate_array_of_projects(1, 3);
        await projects.create();
    });

    it("array length should be 3", () => {
        expect(projects.project.length).toBe(3);
    });

    it("array should contain 1", () => {
        expect(projects.project[0].id).toBe(1);
    });

    it("the name of the second project should be test2", () => {
        expect(projects.project[1].name).toBe("test2");
    });
});

describe("test create funcion", () => {
    let prisma: PrismaClient = new PrismaClient();
    let projects: Projects = new Projects(prisma);

    beforeAll(async () => {
        await prisma.project.deleteMany();
        projects.generate_array_of_projects(1, 3);
        await projects.create();
    });
    it("the length of the array should be 3", () => {
        expect(projects.project.length).toBe(3);
    });
    it("the name of the second project should be it2", () => {
        expect(projects.project[1].name).toBe("test2");
    });

    it("the name of the second project should be test2", async () => {
        let project: Project = new Project(prisma , 1, "something");
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
        let project: Project = new Project(prisma , 2, "something");
        await project.read(2);
        expect(project.name).toBe("test2");
    });

    it("test if the global project read funciton, read the project 1,2,3", async () => {
        await projects.read()
        expect(projects.length).toBe(3);
    });

    it('test delete function', async () => {
        await projects.delete()
        expect(projects.project.length).toBe(0);
        const temp = await prisma.project.findMany();
        expect(temp.length).toBe(0);
    });

    it('test update function', async () => {
        let projects_big: Projects = new Projects(prisma);
        await projects_big.delete()
            .then(() => {
                projects_big.generate_array_of_projects(4, 20);
                expect(projects_big.project.length).toBe(17);
                expect(projects_big.project[0].id).toBe(4);
            }).then(() => {
                try {
                    projects_big.create()
                        .then(() => {
                            test_if_the_project_with_id_5_is_in_database(projects_big)
                        });
                }
                catch (e) {
                    expect(true).toBe(false);
                }
        });

    });

    function test_if_the_project_with_id_5_is_in_database(projects_big: Projects){
        let project = projects_big.get_project_with_id(5);
        expect(project.name).toBe("test5");
        try{
            projects_big.get_project_with_id(133);
        }
        catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toContain("not found");
        }
    }

    it('test update of project with id that does not exist', async () => {
        await projects.delete();
        await projects.generate_array_of_projects(4, 20);

        try {
            await projects.get_project_with_id(5)
        }
        catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toContain("something");
        }

    });
});

describe("test create, delete", () => {
    let projects: Projects = new Projects(prisma);
    beforeAll(async () => {
        await projects.delete();
        projects.generate_array_of_projects(1, 3);
        await projects.create();
    });

    it("should throw an error", async () => {
        try{
            await projects.create();
            expect(true).toBe(false);
        }
        catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toContain("PRIMARY");
        }
    });

    it("test delete funciton", async () => {
        await projects.delete()
            .then(async () => {
                await expect(projects.project.length).toBe(0);
                await prisma.project.findMany()
                    .then(async (temp) => {
                        await expect(temp.length).toBe(0);
                        await expect(projects.length).toBe(0);
                    });
            });
    });

})

describe("read function, update", () => {
    let projects: Projects = new Projects(prisma);
    beforeAll(async () => {
        await projects.delete();
        projects.generate_array_of_projects(0, 99);
        await projects.create();
    });

    it("test read function", async () => {

        await projects.read().then(async () => {
            expect(projects.project.length).toBe(100);
            expect(projects.project[0].id).toBe(0);
            expect(projects.project[99].id).toBe(99);
            expect(projects.project[43].name).toBe("test43");
        });
    });

    it("test update function", async () => {
        projects.project[44].name = "test44_updated";
        await projects.update();
        await projects.read();
        expect(projects.project[44].name).toBe("test44_updated");
    });

    it("test update function with id that does not exist", async () => {
        try{
            projects.project[44].id = 133;
            await projects.update();
            expect(true).toBe(false);
        }
        catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toContain("Project not found in db");
        }
    });

});

function generate_array_with_numbers(start: number, end: number, array: number[]):number[] {
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}



