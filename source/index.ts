import {Project} from "./Apis/Project";
import {ProjectTable} from "./Apis/ProjectTable";
import {KategorienTable} from "./Apis/KategorienTable";
import {Asset} from "./Apis/Asset";
import {ProjektArtikel} from "./Apis/ProjektArtikel";
import {ServerSetup} from "./ServerSetup";
import {PrismaClient} from "@prisma/client";


async function start() {
    let project = new Project();
    new ProjectTable();
    new ProjektArtikel();
    new KategorienTable();
    new Asset();
    instantiate(project.prisma);
}


function instantiate(prisma: PrismaClient) {
    let kategory: any;

    if( prisma.kategorien.findMany() == null){
        kategory = prisma.kategorien.create({
            data: {
                kategoriename: "Asset"
            }
        })
    }

    let unterkategoriename: any;
    if(prisma.unterkategorie.findMany() == null){
        unterkategoriename = prisma.unterkategorie.create({
            data: {
                unterkategoriename: "Asset",
                kategorien: {
                    connect: {
                        kategorie_id: kategory.kategorie_id
                    }
                }

            }
        })
    }

    let projekt: any;
    if(prisma.tblprojekte.findMany() == null){
        projekt = prisma.tblprojekte.create({
            data: {
                ID: 802007,
                Standort: "Lager Hannover"
            }
        })
    }

}

start();

