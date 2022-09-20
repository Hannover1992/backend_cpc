import {describe, expect, test, beforeAll, afterEach} from '@jest/globals';
import {Project} from "../source/project";

describe('test the projects class', () => {
    let project: Project;

    beforeAll(async () => {
        project = new Project(1, "test");
        await project.Ready;
    });

    it('the id of the project should be instance of Promise<number>', () => {
        expect(project.id).toBeInstanceOf(Promise);
    });



    afterAll(async () => {
        //delete all projects
        // await project.Ready;
        await project.delete();
    });

});
