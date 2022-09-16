export module SmokeTest {
    export function helloWorld() {
        return "hello world";
    }
}

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
//insert into project project with nr 5
prisma.project.findMany().then((projects) => {
    console.log(projects)
});

prisma.project.findMany(
    {
        where: {
            Id: {
                equals: 1
            }
        }
    }
).then((products) => {
    console.log(products)
});
