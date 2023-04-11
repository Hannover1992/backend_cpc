import {beforeAll, describe} from '@jest/globals';
import {Project} from "../source/Apis/Project";
import {ProjectTable} from "../source/Apis/ProjectTable";
import supertest from "supertest";
import {request} from "http";
import SuperTest from "supertest";



describe('CRUD', () => {
    let project: Project;
    let projectTable: ProjectTable;
    let request: SuperTest.SuperTest<SuperTest.Test>;

    let body_1 = {
        ID: 1,
        Anlagenummer: 1,
        Auftragsart: "Auftragsart1",
        Standort: "Standort1",
        Niederlassung: "Niederlassung1",
        Status: "Status1",
        Auftragsdatum: new Date(),
        Startdatum: new Date(),
        Endtermin: new Date(),
        Netto_Auftragswert: "Netto",
        Kommentar: "Around the survivors a perimeter create.",
        Logistikkoordinator: "Logistikkoordinator1",
        LK_1: "LK_11",
        LK_2: "LK_21",
        ZuKo: "ZuKo1",
        PM_1: "PM_11",
        PM_2: "PM_21"
    };

    beforeAll(async () => {
        project = new Project();
        projectTable = new ProjectTable();
        const supertest = require('supertest')
        const request = supertest(project.app)
        await projectTable.deletee()
    });

    beforeEach(async () => {
        // await database.projects.delete();
    });

    it('test CRUD', async () => {
        await projectTable.deletee();
        const request = supertest(project.app)
        await request.post('/project/1')
            .send(body_1)
            .then(async (response: any) => {
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Project created");

                await request.get('/project/1').then(
                    (data: any) => {
                        expect(data.status).toBe(200);
                        expect(data.body.ID).toBe(1);
                    }
                )

                await projectTable.deletee();
                await request.get('/project/1').then(
                    (data: any) => {
                        expect(data.body).toStrictEqual({});
                    });
            });
    });

    it('test Update', async () => {
        const request = supertest(project.app);

        // Create a project
        await request.post('/project/1')
            .send(body_1)
            .then(async (response: any) => {
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Project created");
            });

        const updatedBody = body_1;
        updatedBody.LK_1 = "LK_22";

        await request.put('/project/1')
            .send(updatedBody)
            .then(async (response: any) => {
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Project updated");
            });

        // Verify the project has been updated
        await request.get('/project/1')
            .then((data: any) => {
                expect(data.status).toBe(200);
                expect(data.body.ID).toBe(1);
                expect(data.body.LK_1).toBe('LK_22');
                // Add more assertions for the updated fields
            });

        // Clean up the project
        await projectTable.deletee();
    });
});

