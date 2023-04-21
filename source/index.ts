import {Project} from "./Apis/Project";
import {ProjectTable} from "./Apis/ProjectTable";
import {KategorienTable} from "./Apis/KategorienTable";
import {Asset} from "./Apis/Asset";


async function start() {
    new Project();
    new ProjectTable();
    new KategorienTable();
    new Asset();
}

start();

