import {Project} from "./Apis/Project";
import {ProjectTable} from "./Apis/ProjectTable";
import {KategorienTable} from "./Apis/KategorienTable";
import {Asset} from "./Apis/Asset";
import {ProjektArtikel} from "./Apis/ProjektArtikel";


async function start() {
    new Project();
    new ProjectTable();
    new ProjektArtikel();
    new KategorienTable();
    new Asset();
}

start();

