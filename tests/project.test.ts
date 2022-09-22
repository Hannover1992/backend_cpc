import {describe, expect, test, beforeAll, afterEach} from '@jest/globals';
import {Project} from "../source/project";
import {Database} from "../source/database";
import {PrismaClient} from "@prisma/client";


describe('Project', () => {
    let prisma: PrismaClient;

    beforeAll(async () => {
        prisma = new PrismaClient();
        await prisma.project.deleteMany();
    });

    it("we will test if after insert into db project with id 1 and name 'test' exists in db", async () => {
        let project: Project = new Project(1, "test");
        //check if id = 1 and test
        expect(project.id).toBe(1);
        expect(project.name).toBe("test");
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
    });

    it("i i try to insert an project that 123 already exist in database, the have to get an error with message contina PRIMARY", async () => {
        await prisma.project.deleteMany();
        await prisma.project.create({ data: { id: 1, name: "test" } })
        await prisma.project.create({ data: { id: 1, name: "test" } })
            .catch( (error: any) => {
                    expect(error.message).toContain("PRIMARY");
                }
            )
    });

    afterAll    (async () => {
        await prisma.project.deleteMany();
    });
});

describe('test if can catch the error of an create inside function, test Promise', () => {
    let prisma: PrismaClient;
    beforeAll(async () => {
        prisma = new PrismaClient();
    });

    it("insert projec with id 1 and name test in db, then try to insert another project with same id, get error", async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(1, "test");
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
        await project.create()
            .catch( (error: any) => {
                expect(error.message).toContain("PRIMARY");
            });
    });

    afterAll(async () => {
        await prisma.project.deleteMany();
    });
});

describe('test if can read the project from db', () => {
    let prisma: PrismaClient;
    beforeAll(async () => {
        prisma = new PrismaClient();
    });

    it("insert project with id 1 and name test in db, then read it from db", async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(1, "test");
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
        let project2: Project = new Project(1, "test");
        expect(await project2.project_exists_in_db()).toBe(true);
    });

    afterAll(async () => {
        await prisma.project.deleteMany();
    });
});

describe('after insert an project with id 1, then delete it from db', () => {
    let prisma: PrismaClient;
    beforeAll(async () => {
        prisma = new PrismaClient();
    });

    it("insert project with id 1 and name test in db, then delete it from db", async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(1, "test");
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
        await project.delete();
        expect(await project.project_exists_in_db()).toBe(false);
    });

    it("test if get error when try to delete an project that does not exist in db", async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(1, "test");
        await project.delete()
            .then( () => {
                expect(false).toBe(true);
            })
            .catch( (error: any) => {
                expect(error.message).toContain("does not exist");
            });
    });

    afterAll(async () => {
        await prisma.project.deleteMany();
    });
});


describe("test if can update an project", () => {
    let prisma: PrismaClient;

    beforeAll(async () => {
        prisma = new PrismaClient();
    });

    it('test create and read', async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(1, "test");
        //expect to not throe error
        expect(await project.create()).toBe(undefined);
        await project.create()
            .catch( (error: any) => {
                expect(error.message).toContain("PRIMARY");
            });
        let project2: Project = new Project(1);
        expect(await project2.project_exists_in_db()).toBe(false);
        await project2.read();
        expect(project2.name).toBe("test");
        expect(await project2.project_exists_in_db()).toBe(true);
    });
});