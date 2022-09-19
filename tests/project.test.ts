import {PrismaClient} from "@prisma/client";
import {describe, expect, test, beforeAll} from '@jest/globals';
import {Projects} from "../source/projects";



describe('CRUD', () => {
    let prisma: PrismaClient;
    let projects;

    beforeAll(async () => {
        prisma = new PrismaClient();
        await prisma.project.deleteMany();
    });

    it("after insert an Project the projects id should be 1", async () => {
        projects = await prisma.project.findMany();
        expect(projects.length).toBe(0);
    });

    it("after insert an Project the projects id should be 1", async () => {
        await prisma.project.create({
            data: {
                Id: 1,
                Location: "test"
            }
        });
        projects = await prisma.project.findMany();
        expect(projects.length).toBe(1);
    });

    it("It should throw an erorr, after insert the same ID", async () => {
    //test if you can't insert the same project again
        let error;
        await prisma.project.create({
                data: {
                    Id: 1,
                    Location: "test"
                }
        }
        ).then(() => {
            console.log("inserted")
        }
        ).catch((e) => {
            error = e;
            expect(e).not.toBeUndefined();
            expect(e.message).toContain("PRIMARY")
        }
        );
        expect(error).not.toBeUndefined();
    });
});

describe('test the projects class', () => {
    let projects;

   beforeAll(async () => {
       projects = new Projects();
   });

});
