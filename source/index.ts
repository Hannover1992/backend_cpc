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
}).catch((e) => {
    console.log(e)
});

//insert into project project with nr 5
// prisma.project.create({
//     data: {
//         Id: 28,
//         Location: "test"
//     }
// }
// ).then(() => {
//     console.log("inserted")
// }
// ).catch((e) => {
//     console.log(e)
// }
// );


prisma.project.deleteMany().then(() => {
    console.log("deleted")
}).catch((e) => {
    console.log(e);
});