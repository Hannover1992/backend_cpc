import {beforeAll, describe} from '@jest/globals';
import {Database} from "../source/Classes/database";
import {PrismaClient} from "@prisma/client";
import {request} from "http";
import {SuperTest} from "supertest";
import {waitForDebugger} from "inspector";


describe('Projects', () => {
    let database: Database;

    beforeAll(async () => {
        database = new Database(new PrismaClient());
        const supertest = require('supertest')
        const request = supertest(database.app)
    });

    beforeEach(async () => {
        await database.projects.delete();
    });

    test('Project create/update/delete', async () => {
        await test_create_read_update_delete(database);
    });
});


async function test_create_read_update_delete(database: Database) {
    await database.projects.generate_array_of_projects(0, 9);
    await database.projects.create()
    await expect(database.projects.length).toBe(10);
    await database.projects.read();
    await expect(database.projects.length).toBe(10);
    database.projects.project[2].name = "foo";
    await database.projects.update();
    await database.projects.generate_array_of_projects(0, 9);
    await expect(database.projects.project[2].name).toBe("test2");
    await database.projects.read();
    await expect(database.projects.project[2].name).toBe("foo");
}

describe('express', () => {
    let database: Database;
    let request: any;

    beforeAll(async () => {
        database = new Database(new PrismaClient());
        await database.projects.delete();
        await database.projects.generate_array_of_projects(0, 9);
        await database.projects.create()
        await database.projects.read();
        await database.start_server()
        const supertest = require('supertest')
        request = supertest(database.app)
    });

    it('gets the test endpoint',async () => {
        await request.get('/project/0')
            .then((response: any) => {
                expect(response.status).toBe(200);
                expect(response.body.name).toBe("test0");
                expect(response.body.id).toBe(0);
            });
    })

    it('gets the endpoint, where the projects does not exist',async () => {
        await request.get('/project/11')
            .then((response: any) => {
                expect(response.status).toBe(404);

                // res.status(404).send({Data : "Project not found"});
                expect(response.body.message).toBe("Project not found");
            });
    });
});

