import {Project} from "./Apis/Project";
import {ProjectTable} from "./Apis/ProjectTable";
import {KategorienTable} from "./Apis/KategorienTable";


async function start() {
    new Project();
    new ProjectTable();
    new KategorienTable();
}

start();

