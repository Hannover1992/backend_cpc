import "mocha";
import * as assert from "assert";
import {Database} from "../source/database";
import {Projects} from "../source/projects";
import {PrismaClient} from "@prisma/client";



describe("test if the project are empty", () => {
    let projects: Projects;
    before(() => {
        projects = new Projects();
    });

    it("the projects should be empty", () => {
        assert.equal(projects.projects.length, 0);
    });

    it("after insert an Project the projects id should be 1", async () => {
        const prisma = new PrismaClient()
        // projects.insert_project(1, "test");
        // projects.update_projects()
        prisma.project.create({
            data: {
                Id: 99,
                Location: 'last',
            },
        }).then(() => {
                console.log("inserted")
            }
        ).catch((e) => {
            console.log(e)
            });
        });
});

