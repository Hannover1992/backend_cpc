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