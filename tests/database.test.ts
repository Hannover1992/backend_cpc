import {PrismaClient} from "@prisma/client";
import {describe, expect, test, beforeAll } from '@jest/globals';
import {Projects} from "../source/projects";


describe('CRUD', () => {
    let prisma: PrismaClient;
    let projects;

    beforeAll(async () => {
        prisma = new PrismaClient();
        await prisma.project.deleteMany().catch(
            (error) => {
                expect(error).toBeNull();
            }
        );
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
                Location: "test"
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
                    Location: "test"
                }
            }
        ).catch(
            (error) => {
                expect(error).not.toBeNull();
                expect(error.message).toContain("PRIMARY");
            }
        );
    });
});

describe('test the projects class', () => {
    let projects;

    beforeAll(async () => {
        projects = new Projects();
    });

});
