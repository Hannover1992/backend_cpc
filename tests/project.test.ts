import {PrismaClient} from "@prisma/client";
import {describe, expect, test, beforeAll} from '@jest/globals';
import {Projects} from "../source/projects";

describe('test the projects class', () => {
    let projects;

   beforeAll(async () => {
       projects = new Projects();
   });

});
