import {beforeAll, describe} from '@jest/globals';
import {Project} from "../source/Classes/project";
import {PrismaClient} from "@prisma/client";
import {request} from "http";
// import supertest, {SuperTest} from "supertest";
import {waitForDebugger} from "inspector";
import {Project_old} from "../source/Classes/row/project_old";


describe('Projects', () => {
    let database: Project;

    beforeAll(async () => {
        database = new Project();
        const supertest = require('supertest')
        const request = supertest(database.app)
    });

    beforeEach(async () => {
        // await database.projects.delete();
    });

    test('Project_old create/update/delete', async () => {
        await test_create_read_update_delete(database);
    });

});


async function test_create_read_update_delete(database: Project) {
    // await database.projects.generate_array_of_projects(0, 9);
    // await database.projects.create()
    // await expect(database.projects.length).toBe(10);
    // await database.projects.read();
    // await expect(database.projects.length).toBe(10);
    // database.projects.project[2].Standort = "foo";
    // await database.projects.update();
    // await database.projects.generate_array_of_projects(0, 9);
    // await expect(database.projects.project[2].Standort).toBe("Standort2");
    // await database.projects.read();
    // await expect(database.projects.project[2].Standort).toBe("foo");
}

async function setup_database_for_testing(database: Project) {
    // database = new Project(new PrismaClient());
    // await database.projects.delete();
    // await database.projects.generate_array_of_projects(0, 9);
    // await database.projects.create()
    // await database.projects.read();
    // await database.start_server()
    // const supertest = require('supertest')
    // return supertest(database.app)
}

describe('express', () => {
    // let database: Project;
    // let request: any;
    //
    // beforeAll(async () => {
    //     database = new Project(new PrismaClient());
    //     request = await setup_database_for_testing(database);
    // });
    //
    // // it('gets the test endpoint',async () => {
    // //     await request.get('/project/0')
    // //         .then((response: any) => {
    // //             expect(response.status).toBe(200);
    // //             expect(response.body.Standort).toBe("Standort0");
    // //             expect(response.body.ID).toBe(0);
    // //         });
    // // })
    // //
    // // it('gets the endpoint, where the projects does not exist',async () => {
    // //     await request.get('/project/11')
    // //         .then((response: any) => {
    // //             expect(response.status).toBe(404);
    // //
    // //             // res.status(404).send({Data : "Project_old not found"});
    // //             expect(response.body.message).toBe("Project_old not found");
    // //         });
    // // });
    // //
    // // it('test if sites with other ip adress can gain access',async () => {
    // //     await request.get('/project/0')
    // //         .set('Origin', 'http://192.168.192.1:8080')
    // //         .then((response: any) => {
    // //             expect(response.status).toBe(200);
    // //             expect(response.body.Standort).toBe("Standort0");
    // //             expect(response.body.ID).toBe(0);
    // //         }
    // //     );
    // // });
    //
    // it('creat an function that can build an Project_old form body data',
    //     async () => {
    //         let body = {
    //             ID: 12,
    //             Anlagenummer: 12,
    //             Auftragsart: "Auftragsart12",
    //             Standort: "Standort12",
    //             Niederlassung: "Niederlassung12",
    //             Status: "Status12",
    //             Auftragsdatum: new Date(),
    //             Startdatum: new Date(),
    //             Endtermin: new Date(),
    //             Netto_Auftragswert: "Netto_Auftragswert12",
    //             Kommentar: "",
    //             Logistikkoordinator: "Logistikkoordinator12",
    //             LK_1: "LK_121",
    //             LK_2: "LK_212",
    //             ZuKo: "ZuKo12",
    //             PM_1: "PM_121",
    //             PM_2: "PM_212"
    //         };
    //
    //         let project = new Project_old(database.prisma, body.ID, body.Standort, body.Niederlassung, body.Auftragsart, body.Status, body.Logistikkoordinator, body.LK_1, body.LK_2, body.ZuKo, body.Auftragsdatum, body.Startdatum, body.Endtermin, body.Netto_Auftragswert, body.Kommentar, body.Anlagenummer, body.PM_1, body.PM_2);
    //         expect(project.ID).toBe(12);
    //         expect(project.Standort).toBe("Standort12");
    //         expect(project.Niederlassung).toBe("Niederlassung12");
    //         //expect to throw an error
    //         expect(() => {
    //             database.projects.get_project(12)
    //         } ).toThrow();
    //
    //         await database.projects.create_project(project);
    //
    //         expect(() => {
    //             database.projects.get_project(12)
    //         } ).not.toThrow();
    //
    //
    //     });
    //
    // it('should be able to send a project with the post method',async () => {
    //     let body = {
    //         ID: 11,
    //         Anlagenummer: 11,
    //         Auftragsart: "Auftragsart11",
    //         Standort: "Standort11",
    //         Niederlassung: "Niederlassung11",
    //         Status: "Status11",
    //         Auftragsdatum: new Date(),
    //         Startdatum: new Date(),
    //         Endtermin: new Date(),
    //         Netto_Auftragswert: "Netto",
    //         Kommentar: "",
    //         Logistikkoordinator: "Logistikkoordinator11",
    //         LK_1: "LK_111",
    //         LK_2: "LK_211",
    //         ZuKo: "ZuKo11",
    //         PM_1: "PM_111",
    //         PM_2: "PM_211"
    //     };
    //
    //     await request.post('/project')
    //         .send(body)
    //         .then((response: any) => {
    //             expect(response.status).toBe(200);
    //             expect(response.body.message).toBe("Project_old created");
    //         });
    //     await request.post('/project')
    //         .send(body)
    //         .then((response: any) => {
    //             expect(response.status).toBe(500);
    //             expect(response.body.message).toBe("PRIMARY");
    //         });
    // });
    //
    // //make the test async, and wait for the request to finish
    //
    // it('should be able to update a project with the put method', async () => {
    //     let body = {
    //         ID: 9,
    //         Anlagenummer: 9,
    //         Auftragsart: "Auftragsart11",
    //         Standort: "Standort11",
    //         Niederlassung: "Niederlassung11",
    //         Status: "Status11",
    //         Auftragsdatum: new Date(),
    //         Startdatum: new Date(),
    //         Endtermin: new Date(),
    //         Netto_Auftragswert: "Netto",
    //         Kommentar: "",
    //         Logistikkoordinator: "Logistikkoordinator11",
    //         LK_1: "LK_111",
    //         LK_2: "LK_211",
    //         ZuKo: "ZuKo11",
    //         PM_1: "PM_111",
    //         PM_2: "PM_211"
    //     };
    //
    //     const response1 = await request.put('/project/9')
    //         .send(body);
    //
    //     // expect(response1.status).toBe(200);
    //     // expect(response1.body.message).toBe("Project_old updated");
    //     //
    //     // body.ID = 10;
    //     //
    //     // const response2 = await request.put('/project')
    //     //     .send(body);
    //     //
    //     // expect(response2.status).toBe(404);
    //     // expect(response2.body.message).toBe("Project_old not found");
    // });
    //
    // it('should be able to delete a project with the delete method', async () => {
    //     await request.delete('/project/9')
    //         .then((response: any) => {
    //             expect(response.status).toBe(200);
    //             expect(response.body.message).toBe("Project_old deleted");
    //             request.delete('/project/9')
    //                 .then((response: any) => {
    //                     expect(response.status).toBe(404);
    //                     expect(response.body.message).toBe("Project_old not found");
    //                 });
    //         });
    // });
    //
    //
});


