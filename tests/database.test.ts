import {beforeAll, describe} from '@jest/globals';
import {Database} from "../source/database";
import {PrismaClient} from "@prisma/client";


describe('Projects', () => {
    let database: Database;

    beforeAll(async () => {
        database = new Database(new PrismaClient());
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
    //temp
    let database: Database;

    beforeAll(async () => {
        database = new Database(new PrismaClient());
        await database.start_server()
    });

    beforeEach(async () => {
        await database.projects.delete();
    });

    test('Project create/update/delete', async () => {
        await test_create_read_update_delete(database);
        await database.run_apis();
    });
});
