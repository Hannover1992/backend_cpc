import {beforeAll, describe} from '@jest/globals';
import {Database} from "../source/Classes/database";
import {PrismaClient} from "@prisma/client";
import {request} from "http";
// import supertest, {SuperTest} from "supertest";
import {waitForDebugger} from "inspector";
import {Project} from "../source/Classes/row/project";


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

    it('creat an function that can build an Project form body data',
        async () => {
            let body = {
                ID: 11,
                Anlagenummer: 11,
                Auftragsart: "Auftragsart11",
                Standort: "Standort11",
                Niederlassung: "Niederlassung11",
                Status: "Status11",
                Auftragsdatum: new Date(),
                Startdatum: new Date(),
                Endtermin: new Date(),
                Netto_Auftragswert: "Netto_Auftragswert11",
                Kommentar: "",
                Logistikkoordinator: "Logistikkoordinator11",
                LK_1: "LK_111",
                LK_2: "LK_211",
                ZuKo: "ZuKo11",
                PM_1: "PM_111",
                PM_2: "PM_211"
            };

            let project = new Project(database.prisma, body.ID, body.Standort, body.Niederlassung, body.Auftragsart, body.Status, body.Logistikkoordinator, body.LK_1, body.LK_2, body.ZuKo, body.Auftragsdatum, body.Startdatum, body.Endtermin, body.Netto_Auftragswert, body.Kommentar, body.Anlagenummer, body.PM_1, body.PM_2);
            expect(project.ID).toBe(11);
            expect(project.Standort).toBe("Standort11");
            expect(project.Niederlassung).toBe("Niederlassung11");
            //expect to throw an error
            expect(() => {
                database.projects.get_project(11)
            } ).toThrow();

            await database.projects.create_project(project);

            expect(() => {
                database.projects.get_project(11)
            } ).not.toThrow();
        });
});


async function test_create_read_update_delete(database: Database) {
    await database.projects.generate_array_of_projects(0, 9);
    await database.projects.create()
    await expect(database.projects.length).toBe(10);
    await database.projects.read();
    await expect(database.projects.length).toBe(10);
    database.projects.project[2].Standort = "foo";
    await database.projects.update();
    await database.projects.generate_array_of_projects(0, 9);
    await expect(database.projects.project[2].Standort).toBe("Standort2");
    await database.projects.read();
    await expect(database.projects.project[2].Standort).toBe("foo");
}

async function setup_database_for_testing(database: Database) {
    database = new Database(new PrismaClient());
    await database.projects.delete();
    await database.projects.generate_array_of_projects(0, 9);
    await database.projects.create()
    await database.projects.read();
    await database.start_server()
    const supertest = require('supertest')
    return supertest(database.app)
}

describe('express', () => {
    let database: Database;
    let request: any;

    beforeAll(async () => {
        request = await setup_database_for_testing(database);
    });

    it('gets the test endpoint',async () => {
        await request.get('/project/0')
            .then((response: any) => {
                expect(response.status).toBe(200);
                expect(response.body.Standort).toBe("Standort0");
                expect(response.body.ID).toBe(0);
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

    it('test if sites with other ip adress can gain access',async () => {
        await request.get('/project/0')
            .set('Origin', 'http://192.168.192.1:8080')
            .then((response: any) => {
                expect(response.status).toBe(200);
                expect(response.body.Standort).toBe("Standort0");
                expect(response.body.ID).toBe(0);
            }
        );
    });
});

describe('test test', () => {
    let database: Database;
    let request: any;

    beforeAll(async () => {
        request = await setup_database_for_testing(database);
    });


});

