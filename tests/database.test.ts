import {PrismaClient} from "@prisma/client";
import {describe, expect, test, beforeAll } from '@jest/globals';
import {Projects} from "../source/projects";
import {Project} from "../source/project";


describe('CRUD Project Direct', () => {
    let prisma: PrismaClient;
    let projects;

    beforeAll(async () => {
        prisma = new PrismaClient();
        projects = new Projects();
    });



    it("the project should be empty at the begin", async () => {
        await prisma.project.findMany().then(
            (projects) => {
                expect(projects.length).toBe(0);
            }
        )
    });

    it("after insert an Project the projects id should be 1", async () => {
        await prisma.project.create({
            data: {
                Id: 1,
                Name: "test"
            }
        })
        await prisma.project.findMany()
            .then(
                (projects) => {
                    expect(projects.length).toBe(1);
                }
            )
        ;
    });

    it("It should throw an erorr, after insert the same ID", async () => {
        // test if you can't insert the same project again
        await prisma.project.create({
                data: {
                    Id: 1,
                    Name: "test"
                }
            }
        ).catch(
            (error) => {
                expect(error).not.toBeNull();
                expect(error.message).toContain("PRIMARY");
            }
        );
    });

    it("after inserting new project with Name TEST3, the project should be in the database", async () => {
        await prisma.project.create({
            data: {
                Id: 3,
                Name: "test3"
            }
        })
        await prisma.project.findMany()
            .then(
                (projects) => {
                    //project will contain the project with the name TEST3
                    let project: Project;
                    // @ts-ignore
                    project = projects.find((project) => project.Name === "test3");
                    expect(project).not.toBeNull();
                    // @ts-ignore
                    expect(project.Name).toBe("test3");
                }
            )
        ;
    });

    afterAll(async () => {
        prisma = new PrismaClient();
        await prisma.project.deleteMany().catch(
            (error) => {
                expect(error).toBeNull();
            }
        );
    });

});

