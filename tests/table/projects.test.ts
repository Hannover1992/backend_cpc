import {describe, expect, test, beforeAll, afterEach} from '@jest/globals';
import {Projects} from '../../source/table/projects';

describe("Projects", () => {

    test("should be defined", () => {
        let projects: Projects = new Projects();
        expect(projects).toBeDefined();
    });

    test("at the beginning the array of project should be empty", () => {
        let projects: Projects = new Projects();
        expect(projects.projects).toEqual([]);
    });
});