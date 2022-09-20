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
        expect(await project.id).toBe(1);
        expect(await project.name).toBe("test");
    });

    it('should not work and return PRIMARY KEY constraint failed', async () => {
        await project.ready;
        //create another project with the same id
        let project2 = new Project(1, "test2");
        //expect rpoject2.ready promise to thora an error thath contain string PRIMARY
        await expect(project2.ready).rejects.toThrow("PRIMARY");
        await project2.delete();
    });

    afterAll(async () => {
        await project.delete_all_projects();
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

describe('Project Update', () => {
    let database: Database;
    beforeAll( async () => {
            database = new Database();              //delete all Projects
            await database.prisma.project.deleteMany();
        }
    );

    it('after i create an project with id 1, i should be able to update it', async () => {
        let project = new Project(1, "test");
        await project.ready;
        await project.update("test2");
        await database.prisma.project.findUnique({where: {id: 1}}).then((result: any) => {
            expect(result.name).toBe("test2");
        })
        project.delete_all_projects();
    });

    it('i can not update project that not exist)', async () => {
        database.prisma.project.deleteMany();
        let project = new Project(1, "test");
        //expect project update with id = 2 to throw error
        await project.ready;
        await project.update( "test3")
        //i expect the project ot have the name of test3
        await database.prisma.project.findUnique({where: {id: 1}}).then((result: any) => {
            expect(result.name).toBe("test3");
        });
    });
});
