// import {Project} from "./project";
//
// const express = require( "express" );
// const app = express();
// const port = 8080; // default port to listen
//
// let project: Project = new Project(1, "my-project" );
// let name = project.name;
// // define a route handler for the default home page
// app.get( "/", ( req, res ) => {
//     // res.send( "Hello world!" );
// } );
//
//
//
// // start the Express server
// app.listen( port, () => {
//     console.log( `server started at http://localhost:${ port }` );
// } );

import {PrismaClient} from "@prisma/client";
let prisma = new PrismaClient();


async function something() {
    await prisma.project.create({
        data: {
            id: 123,
            name: "test"
        }
    })
}

something()
    .then(() => {
        console.log("done")
    }).catch(
    (e) => {
        console.log("shit")
    }
);
console.log("11")