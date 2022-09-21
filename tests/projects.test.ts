import {PrismaClient} from "@prisma/client";
import {describe, expect, test, beforeAll} from '@jest/globals';
import {Projects} from "../source/projects";
import {Project} from "../source/project";

describe('Projects CRUD', () => {
    let projects: Projects;

   beforeAll(async () => {
       projects = new Projects();
   });

   //toDo: Hier weiter, dieser error lauft nicht
    it("the project should be empty at the begin", async () => {
       expect(projects.length).toBe(0);
    });

    it("after insert an Project the projects id should be 1", async () => {
        let project = new Project(1, "test");
        expect(projects.length).toBe(1);
    });

    it("test if the project is in the database", async () => {
    });

    it("after insert an Project the projects id should be 1", async () => {
    });

    afterEach(async () => {
        //delete all projects
        await projects.delete_all_projects();
    }
    );

});


describe('Project Create Test', () => {
    let projects: Projects;
    beforeEach(async () => {
        projects = new Projects();
        await projects.update();
    });

    it("create, after insert an Project the projects id should be 1", async () => {
        await projects.create_project(1, "test");
        expect(projects.length).toBe(1);
    });

    it("after iserting project with the same id i should get an error", async () => {
        await projects.create_project(1, "test");
        await projects.create_project(1, "test").catch(
            (error) => {
                expect(error).not.toBeNull();
                expect(error.message).toContain("PRIMARY");
            }
        );
    });

    it("READ, after inserting new project with Name TEST3, the project should be in the database", async () => {
        await projects.create_project(1, "test");
        await projects.update();
        expect(projects.projects).not.toBeNull();
        expect(projects.projects.length).toBe(1);
        let project : Project = projects.projects[0];
        expect(project.name).toBe("test");
    });

    it("UPDATE, after inserting new project with Name TEST3, the project should be in the database", async () => {
        let project : Project = new Project(1, "test");
    });
    //toDo: hier weiter mit Projects Update




    afterEach(async () => {
        //delete all projects
        await projects.delete_all_projects();
    });
});