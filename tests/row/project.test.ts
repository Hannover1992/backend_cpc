import {describe, expect,  beforeAll } from '@jest/globals';
import {Project} from "../../source/Classes/row/project";
import {PrismaClient} from "@prisma/client";

let prisma: PrismaClient = new PrismaClient();

describe('Project', () => {
    beforeAll(async () => {
        await prisma.project.deleteMany();
    });

    it("we will test if after insert into db projects with id 1 and name 'test' exists in db", async () => {
        let project: Project = new Project(prisma,1, "test");
        //check if id = 1 and test
        expect(project.id).toBe(1);
        expect(project.name).toBe("test");
        await project.create()
            .then(async () => {
                expect(await project.project_exists_in_db()).toBe(true);
            });
    });

    it("i i try to insert an projects that 123 already exist in database, the have to get an error with message contina PRIMARY", async () => {
    });
});

describe("create", () => {
    it("i i try to insert an projects that 123 already exist in database, the have to get an error with message contina PRIMARY", async () => {
        let prisma: PrismaClient = new PrismaClient();
        await prisma.project.deleteMany()
        await prisma.project.create({ data: { id: 1, name: "test" } });
        // await expect( await prisma.projects.create({ data: { id: 1, name: "test" } })).toThrowError("123");
        await prisma.project.create({ data: { id: 1, name: "test" } }).catch(
            (error: any) => {
                expect(error.message).toContain("PRIMARY");
            }
        )
        await prisma.project.deleteMany()
        let project1: Project = new Project(prisma, 1, "test");
        //expect no error
        await project1.create().catch(() => { expect(true).toBe(false); });
        await project1.create().catch((error: any) => {
            expect(error.message).toContain("PRIMARY");
        });

    });
});

describe("test create and read", () => {
    it('test create and read', async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(prisma,1, "test");
        //expect to not throe error
        // expect(await projects.create()).toBe(undefined);
        await project.create()
            .catch( () => {
                expect(true).toBe(false);
            });
        let project2: Project = new Project(prisma,1);
        expect(await project2.project_exists_in_db()).toBe(false);
        await project2.read();
        expect(project2.name).toBe("test");
        expect(await project2.project_exists_in_db()).toBe(true);
    });
});

describe('read', () => {
    it("insert projects with id 1 and name test in db, then read it from db", async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(prisma,1, "test");
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
        let project2: Project = new Project(prisma,1, "");
        expect(await project2.project_exists_in_db()).toBe(false);
        await project2.read(1);
        await expect(project2.name).toBe("test");
        await project2.read(2).catch(
            (error: any) => {
                expect(error.message).toContain("not found");
            }
        )
    });

    afterAll(async () => {
        await prisma.project.deleteMany();
    });
});

describe("update", () => {
    it('test if can update an projects', async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(prisma,1, "test");
        //expect to not throe error
        await project.create()
            .catch( () => {
                expect(true).toBe(false);
            });
        project.name = "test2";
        await project.update()
            .catch( () => {
                expect(true).toBe(false);
            });
        expect(await project.project_exists_in_db()).toBe(true);
    });

    it('test if cant update projects that not exist in db', async () => {
        let project: Project = new Project(prisma,2, "test");
        //expect to not throe error
        await project.update()
            .then( () => {
                    expect(true).toBe(false);
                }
            )
            .catch( (error: any) => {
                    expect(error.message).toContain("not found");
                }
            );
    });
});

describe('delete', () => {
    it("insert projects with id 1 and name test in db, then delete it from db", async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(prisma,1, "test");
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
        await project.delete();
        expect(await project.project_exists_in_db()).toBe(false);
    });

    it("test if get error when try to delete an projects that does not exist in db", async () => {
        await prisma.project.deleteMany();
        let project: Project = new Project(prisma,1, "test");
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

describe("make projects ready to send over rest api ", () => {

    beforeAll(async () => {
        await prisma.project.deleteMany();
    });

    it("test if can make projects ready to send over rest api", async () => {

        let project: Project = new Project(prisma,1, "test");
        await project.create();
        let project2: Project = new Project(prisma,1, "test");
        await project2.read();
        expect(project2.name).toBe("test");
        expect(await project2.project_exists_in_db()).toBe(true);
        expect(await project2.get_ready_to_send_over_rest_api()).toStrictEqual({id: 1, name: "test", prisma: null});
    });

});


