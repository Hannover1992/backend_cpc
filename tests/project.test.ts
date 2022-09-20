import {describe, expect, test, beforeAll, afterEach} from '@jest/globals';
import {Project} from "../source/project";

describe('test the projects class', () => {
    let project: Project;

    beforeAll(async () => {
        project = new Project(1, "test");
        await project.Ready;
    });

    it("test the project name", async () => {
        expect(project.name).toBe("test");
    });

    it("test the project id", async () => {
        expect(project.id).toBe(1);
    });

    it("when get the id direct from db, expect the same id", async () => {
        expect(await project.get_id_direct_from_db()).toBe(1);
    });

    it("when get the name direct from db, expect the same name", async () => {
        expect(await project.get_name_direct_from_db()).toBe("test");
    });

    it("test if after adding another project with the same id throw error Primary Key", async () => {

    });



    afterAll(async () => {
        //delete all projects
        // await project.Ready;
        await project.delete();
    });

});
