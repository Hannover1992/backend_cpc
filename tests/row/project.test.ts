import {describe, expect,  beforeAll } from '@jest/globals';
import {generate_test_project, Project} from "../../source/Classes/row/project";
import {PrismaClient} from "@prisma/client";

let prisma: PrismaClient = new PrismaClient();

describe('test Prisma', () => {
    beforeAll(async () => {
        await prisma.tblprojekte.deleteMany();
    });

    it("it should create an project with id 0", async () => {
        await prisma.tblprojekte.create({
            data: {
                ID: 0,
                Standort: "test",
            }
        })
        let project : any = await prisma.tblprojekte.findMany({
            where: {
                ID: 0
            }
        })
        expect(project[0].Standort).toBe("test");
    });

    it("it should create an project with id anlagenummer = 1, and id = 2", async () => {
        await prisma.tblprojekte.create({
            data: {
                ID: 2,
                Anlagenummer: 1,
                Standort: "test",
            }
        })
        let project : any = await prisma.tblprojekte.findMany({
            where: {
                ID: 2
            }
        })
        expect(project[0].Standort).toBe("test");
        expect(project[0].Anlagenummer).toBe(1);
    });

    afterAll(async () => {
        await prisma.tblprojekte.deleteMany();
    });
});

describe('Project', () => {
    beforeAll(async () => {
        await prisma.tblprojekte.deleteMany();
    });

    it("we will test if after insert into db projects with id 1 and name 'test' exists in db", async () => {
        let project: Project = new Project(prisma,1, "test");
        //check if id = 1 and test
        expect(project.ID).toBe(1);
        expect(project.Standort).toBe("test");
        expect(project.Anlagenummer).toBe(0);
        await project.create()
            .then(async () => {
                expect(await project.project_exists_in_db()).toBe(true);
            });
    });
});

describe('Test creating and saving a random project', () => {
    beforeEach(async () => {
        await prisma.tblprojekte.deleteMany();
    });

    it("schould create a random project and save it in db", async () => {
        let project: Project;
        let prisma = new PrismaClient();
        project = generate_test_project(prisma, 0);
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
    });
});

describe("create", () => {
    it("i i try to insert an projects that 123 already exist in database, the have to get an error with message contina PRIMARY", async () => {
        let prisma: PrismaClient = new PrismaClient();
        await prisma.tblprojekte.deleteMany()
        await prisma.tblprojekte.create({ data: { ID : 1, Standort: "test" } });
        // await expect( await prisma.tblprojektes.create({ data: { id: 1, name: "test" } })).toThrowError("123");
        await prisma.tblprojekte.create({ data: { ID : 1, Standort: "test" } }).catch(
            (error: any) => {
                expect(error.message).toContain("");
            }
        )
        await prisma.tblprojekte.deleteMany()
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
        await prisma.tblprojekte.deleteMany();
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
        expect(project2.Standort).toBe("test");
        expect(await project2.project_exists_in_db()).toBe(true);
    });
});

describe('read', () => {
    it("insert projects with id 1 and name test in db, then read it from db", async () => {
        await prisma.tblprojekte.deleteMany();
        let project: Project = new Project(prisma,1, "test");
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
        let project2: Project = new Project(prisma,1, "");
        expect(await project2.project_exists_in_db()).toBe(false);
        await project2.read(1);
        await expect(project2.Standort).toBe("test");
        await project2.read(2).catch(
            (error: any) => {
                expect(error.message).toContain("not found");
            }
        )
    });

    afterAll(async () => {
        await prisma.tblprojekte.deleteMany();
    });
});

describe("update", () => {
    it('test if can update an projects', async () => {
        await prisma.tblprojekte.deleteMany();
        let project: Project = new Project(prisma,1, "test");
        //expect to not throe error
        await project.create()
            .catch( () => {
                expect(true).toBe(false);
            });
        project.Standort = "test2";
        await project.update()
            .catch( (error: any) => {
                console.log(error);
                expect(true).toBe(false)
            });
        expect(await project.project_exists_in_db()).toBe(true);
    });

});

describe("try to update project that does not exist", () => {
    beforeAll(async () => {
        await prisma.tblprojekte.deleteMany();
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
        await prisma.tblprojekte.deleteMany();
        let project: Project = new Project(prisma,1, "test");
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
        await project.delete();
        expect(await project.project_exists_in_db()).toBe(false);
    });

    it("test if get error when try to delete an projects that does not exist in db", async () => {
        await prisma.tblprojekte.deleteMany();
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
        await prisma.tblprojekte.deleteMany();
    });
});


describe("test complexe constructor", () => {
   beforeAll(async () => {
         await prisma.tblprojekte.deleteMany();
   });

   it("test if can create a project with complexe constructor", async () => {
        let project: Project = new Project(prisma, 1, "test");
        project.LK_2 = "Stefan";
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
        expect(project.LK_2).toBe("Stefan");
        project.LK_1 = "Bob";
        await project.update();
        expect(project.LK_1).toBe("Bob");
        expect(project.LK_2).toBe("Stefan");
        expect(await project.project_exists_in_db()).toBe(true);
   });

   afterAll(async () => {
       prisma.tblprojekte.deleteMany();
   });
})



describe("test date", () => {
    beforeAll(async () => {
        await prisma.tblprojekte.deleteMany();
    });

    it("test if can create a project with complexe constructor", async () => {
        let project: Project = new Project(prisma, 1, "test");
        project.Auftragsdatum = new Date(10);
        await project.create();
        expect(await project.project_exists_in_db()).toBe(true);
    });

    afterAll(async () => {
        prisma.tblprojekte.deleteMany();
    });
})

describe("test PRIMARY KEY", () => {

    beforeAll(async () => {
        await prisma.tblprojekte.deleteMany();
    });

    it("when i create 2 times the same project i have to get the PRIMARY error", async () => {
        let project: Project = new Project(prisma, 1, "test");
        await project.create();
        await project.create()
            .then( () => {
                expect(false).toBe(true);
            })
            .catch( (error: any) => {
                expect(error.message).toContain("PRIMARY");
            });
    });

    afterAll(async () => {
        prisma.tblprojekte.deleteMany();
    });
});



describe("test generate project function", () => {

    beforeAll(async () => {
        await prisma.tblprojekte.deleteMany();
    });

    it("generate project with number = 7 then test it", async () => {
        let project_generatet : Project = generate_test_project(prisma, 7);
        expect(project_generatet).not.toBe(null);
        expect(project_generatet.Auftragsdatum).not.toBe(null);
        expect(project_generatet.Standort).toBe("Standort7");
        project_generatet.create()
            .then   ( () => {
                let project_compare_to: Project = new Project(prisma, 7, "Standort7", "Niederlassung7");
                project_compare_to.LK_1 = "LK_17";
                project_compare_to.LK_2 = "LK_27";
                project_compare_to.Auftragsdatum = new Date(7);
                expect(project_generatet).toEqual(new Project(prisma, 7, "Standort7", "Niederlassung7"));
            });
    });

    afterAll(async () => {
        prisma.tblprojekte.deleteMany();
    });
});



