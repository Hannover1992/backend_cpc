import {describe, expect, test, beforeAll, afterEach} from '@jest/globals';
import {Project} from "../source/project";
import {Database} from "../source/database";


describe('test the projects class', () => {
    let project: Project;

    beforeAll(async () => {
        project = new Project(1, "test");
    });

    it('should create a project', async () => {
        await project.ready;
        expect(await project.get_id()).toBe(1);
        expect(await project.get_name()).toBe("test");
    });

    it('should not work and return PRIMARY KEY constraint failed', async () => {
        await project.ready;
        //create another project with the same id
        let project2 = new Project(1, "test2");
        //expect rpoject2.ready promise to thora an error thath contain string PRIMARY
        await expect(project2.ready).rejects.toThrow("PRIMARY");
        try{
            await project2.delete();
        }
        catch (e) {
            //expect the error to contain string 'need at least one'
            expect(e.message).toContain("needs at least one argument");
        }
    });

    afterAll(async () => {
        let database = new Database();
        await database.prisma.project.deleteMany();
    });

});

describe('Project Delete', () => {
    let database: Database;
    beforeAll( async () => {
            database = new Database();              //delete all Projects
            await database.prisma.project.deleteMany();
        }
    );

    it('after i create an project with id 1, i should be able to delete it', async () => {
        let project = new Project(1, "test");
        await project.ready;
        await project.delete();
        await database.prisma.project.findUnique({where: {id: 1}}).then((result: any) => {
            expect(result).toBeNull();
        })
    });

    it('after i insert 2 times the same project with the same id, i should get an error', async () => {
        let project = new Project(1, "test");
        await project.ready;
        let project2 = new Project(1, "test2");
        await expect(project2.ready).rejects.toThrow("PRIMARY");
        await project.delete();
    });
});

describe('Project test getter and setter', () => {
    let database: Database;
    let project: Project;

    beforeAll(async () => {
        database = new Database();
        await database.prisma.project.deleteMany();
        project = new Project(1, "test");
    });

    it('test getter id', async () => {
        expect(await project.get_id()).toBe(1);
    });

    it('test getter name', async () => {
        expect(await project.get_name()).toBe("test");
    });

    it('test setter name', async () => {
        await project.set_name("test2");
        expect(await project.get_name()).toBe("test2");
    });

    it('test setter id', async () => {
        await project.set_id(2);
        expect(await project.get_id()).toBe(2);
    });





});


describe('Project Update', () => {
    let database: Database;
    let project: Project;
    beforeAll(async () => {
        database = new Database();
        await database.prisma.project.deleteMany();
    });

    it('test if when setting the same id as the one in the database, it will throw an error', async () => {
        project = new Project(1, "test");
        let project2 = new Project(2, "test");
        //delete all projects
        await project.ready;
        await project2.ready;
        //set the id of the project to 1
        try{
            await project2.set_id(1);
        } catch (e) {
            expect(e.message).toContain("PRIMARY");
        }
    });
});


describe('Project Update', () => {
    let database: Database;
    beforeAll( async () => {
            database = new Database();              //delete all Projects
            await database.prisma.project.deleteMany();
        }
    );

    it('after i create an project with id 1, i should be able to update it', async () => {
        let project = new Project(1, "test");
        await project.ready
            .then()
        await project.set_name("test2");
        //test if datbase ready
        await database.prisma.project.findUnique({where: {id: 1}}).then((result: any) => {
            expect(result.name).toBe("test2");
        })
        // await database.prisma.project.deleteMany();
    });

    it('i can not update project that not exist)', async () => {
        database.prisma.project.deleteMany();
        let project = new Project(1, "test");
        //expect project update with id = 2 to throw error
        await project.ready;
        await project.set_name( "test3")
        //i expect the project ot have the name of test3
        await database.prisma.project.findUnique({where: {id: 1}}).then((result: any) => {
            expect(result.name).toBe("test3");
        });
    });
});
