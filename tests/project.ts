import "mocha";
import * as assert from "assert";
import {Database} from "../source/database";
import {Projects} from "../source/projects";



describe("test if the project are empty", () => {
    let projects : Projects;
    before(() => {
        projects = new Projects();
    });

    it("the projects should be empty", () => {
        assert.equal(projects.projects.length, 0);
    });

    it("after insert an Project the projects id should be 1",  () => {
        projects.insert_project(1, "test");
        projects.update_projects();
        assert.equal(projects.projects.length, 1);
    });
});
