import {describe, expect, beforeAll } from '@jest/globals';
import {ProjectTable} from '../../source/Classes/table/projectTable';
import {PrismaClient} from "@prisma/client";
import {Project} from "../../source/Classes/row/project";

let prisma: PrismaClient  = new PrismaClient();

describe("Projects", () => {
    it("should be defined", () => {
        let projects: ProjectTable = new ProjectTable(prisma);
        expect(projects).toBeDefined();
    });

    it("at the beginning the array of projects should be empty", () => {
        let projects: ProjectTable = new ProjectTable(prisma);
        expect(projects.project.length).toBe(0);
        expect(projects.length).toBe(0);
    });
});

describe("projects exists?", () => {
    it("should return true if there are no projects", async () => {
        let projects: ProjectTable = new ProjectTable(prisma);
        await projects.delete();
        expect(projects.project.length).toBe(0);
        let temp = await prisma.tblprojekte.findMany();
        await expect(temp.length).toBe(0);
    });

});

describe("generate function", () => {
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

    let projects: ProjectTable = new ProjectTable(prisma);

    beforeAll(async () => {
        await prisma.tblprojekte.deleteMany();
        projects.generate_array_of_projects(1, 3);
        await projects.create();
    });

    it("array length should be 3", () => {
        expect(projects.project.length).toBe(3);
    });

    it("array should contain 1", () => {
        expect(projects.project[0].ID).toBe(1);
    });

    it("the name of the second projects should be Standort2", () => {
        expect(projects.project[1].Standort).toBe("Standort2");
    });
});

describe("create", () => {
    let prisma: PrismaClient = new PrismaClient();
    let projects: ProjectTable = new ProjectTable(prisma);

    beforeAll(async () => {
        await prisma.tblprojekte.deleteMany();
        projects.generate_array_of_projects(1, 3);
        await projects.create();
    });
    it("the length of the array should be 3", () => {
        expect(projects.project.length).toBe(3);
    });
    it("the name of the second projects should be it2", () => {
        expect(projects.project[1].Standort).toBe("Standort2");
    });

    it("the.Standort of the second projects should be Standort2", async () => {
        let project: Project = new Project(prisma , 1, "something");
        await expect(project.read(9)).rejects.toThrowError('not found')
    });

    it("check if the projects with id 2 in database , and the.Standort Standort2" , async () => {
        let project: Project = new Project(prisma , 2, "something");
        await project.read(2);
        expect(project.Standort).toBe("Standort2");
    });

    it("test if the global projects read funciton, read the projects 1,2,3", async () => {
        await projects.read()
        expect(projects.length).toBe(3);
    });

    it('test delete function', async () => {
        await projects.delete()
        expect(projects.project.length).toBe(0);
        const temp = await prisma.tblprojekte.findMany();
        expect(temp.length).toBe(0);
    });

    it('test update function', async () => {
        let projects_big: ProjectTable = new ProjectTable(prisma);
        await projects_big.delete();
        await projects_big.generate_array_of_projects(4, 20);
        await expect(projects_big.project[0].ID).toBe(4);
        await projects_big.create()
            .then(async () => {
                let project = projects_big.get_project(5);
                await expect(project.Standort).toBe("Standort5");
            });
    });

});

describe("update", () => {
    it('test update of projects with id that does not exist', async () => {
        let projects: ProjectTable = new ProjectTable(prisma);

        await projects.delete();
        await projects.generate_array_of_projects(4, 20);

        let project: Project = await projects.get_project(5);
        await expect(project.read()).rejects.toThrowError('not found')

    });
});

describe("test create, delete", () => {
    let projects: ProjectTable = new ProjectTable(prisma);
    beforeAll(async () => {
        await projects.delete();
        projects.generate_array_of_projects(1, 3);
        await projects.create();
    });

    it("should throw an error", async () => {
        await expect(projects.create()).rejects.toThrowError('PRIMARY');
    });

    it("test delete funciton", async () => {
        await projects.delete()
        await expect(projects.project.length).toBe(0);
        await prisma.tblprojekte.findMany().then(
            async (temp) => {
                expect(temp.length).toBe(0);
                 expect(projects.length).toBe(0);
            });
    });

})

describe("read function, update", () => {
    let projects: ProjectTable = new ProjectTable(prisma);
    beforeAll(async () => {
    });

    it("test read function", async () => {
        await projects.delete();
        await projects.generate_array_of_projects(0, 99);
        await projects.create();
        await projects.read().then(async () => {
            expect(projects.project.length).toBe(100);
            expect(projects.project[0].ID).toBe(0);
            expect(projects.project[99].ID).toBe(99);
            expect(projects.project[43].Standort).toBe("Standort43");
        });
    });

    it("test update function", async () => {
        projects.project[44].Standort = "test44_updated";
        await projects.update();
        await projects.read();
        expect(projects.project[44].Standort).toBe("test44_updated");
    });

    it("test update function with id that does not exist", async () => {
        projects.project[44].ID = 133;
        await expect(projects.update()).rejects.toThrowError('not found');
    });
});

describe("test if the projects are able to get send through the rest api", () => {
    let projects: ProjectTable;
    beforeAll(async () => {
        projects = new ProjectTable(prisma);
        await projects.delete();
        projects.generate_array_of_projects(0, 10);
        await projects.create();
        await projects.read();
    });



});



function generate_array_with_numbers(start: number, end: number, array: number[]):number[] {
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}



