import {Project} from "./Apis/Project";
import {ProjectTable} from "./Apis/ProjectTable";
import {KategorienTable} from "./Apis/KategorienTable";
import {Asset} from "./Apis/Asset";
import {ProjektAssets} from "./Apis/ProjektAssets";
import {kategorien, PrismaClient} from "@prisma/client";
import {Simkarten} from "./Apis/Simkarten";
import {Notebook} from "./Apis/Notebook";
import {Router} from "./Apis/Router";
import {Handy} from "./Apis/Handy";
import {Acu} from "./Apis/Acu";


async function start() {
    let project = new Project();
    new ProjectTable();
    new ProjektAssets();
    new KategorienTable();
    new Asset();
    new Simkarten();
    new Notebook();
    new Handy()
    new Router();
    new Acu();
    instantiate(project.prisma);

}


async function instantiate(prisma: PrismaClient) {
    let kategories : kategorien[] = await prisma.kategorien.findMany();

    if (kategories.length === 0) {
        kategories = [await prisma.kategorien.create({
            data: {
                kategoriename: "Asset",
            },
        })];
    }

    let unterkategorie = await prisma.unterkategorie.findMany();
// async function instantiate(prisma: PrismaClient) {
//     let kategories = await prisma.kategorien.findMany();
//
//     if (kategories.length === 0) {
//         kategories = [await prisma.kategorien.create({
//             data: {
//                 kategoriename: "Asset",
//             },
//         })];
//     }
//
//     let unterkategorie = await prisma.unterkategorie.findMany();
//
//     if (unterkategorie.length === 0) {
//         await prisma.unterkategorie.create({
//             data: {
//                 unterkategoriename: "Divers",
//                 kategorien: {
//                     connect: {
//                         kategorie_id: kategories[0].kategorie_id,
//                     },
//                 },
//             },
//         });
//     }
//
//     let projekte = await prisma.tblprojekte.findMany();
//
//     if (projekte.length === 0) {
//         await prisma.tblprojekte.create({
//             data: {
//                 ID: 802007,
//                 Standort: "Lager Hannover",
//             },
//         });
//     }
//
//     let artikels = await prisma.artikel.findMany();
//
//     if (artikels.length === 0) {
//         artikels = [await prisma.artikel.create({
//             data: {
//                 artikelname: "other Kabel last over REST API",
//                 unterkategorie: {
//                     connect: {
//                         unterkategorie_id: 1,
//                     },
//                 },
//                 einkaufs_datum: new Date(),
//                 edit_date: new Date(),
//             },
//         })];
//     }
//
//     let projekt_artikels = await prisma.projekt_artikel.findMany();
//
//     if (projekt_artikels.length === 0) {
//         await prisma.projekt_artikel.create({
//             data: {
//                 projekt_id: 802007,
//                 menge: 6,
//                 artikel_id: artikels[0].artikel_id,
//             },
//         });
//     }
// }

    if (unterkategorie.length === 0) {
        await prisma.unterkategorie.create({
            data: {
                unterkategoriename: "Divers",
                kategorien: {
                    connect: {
                        kategorie_id: kategories[0].kategorie_id,
                    },
                },
            },
        });
    }

    let projekte = await prisma.tblprojekte.findMany();

    if (projekte.length === 0) {
        await prisma.tblprojekte.create({
            data: {
                ID: 802007,
                Standort: "Lager Hannover",
            },
        });
    }

    let artikels = await prisma.artikel.findMany();

    if (artikels.length === 0) {
        artikels = [await prisma.artikel.create({
            data: {
                artikelname: "other Kabel last over REST API",
                unterkategorie: {
                    connect: {
                        unterkategorie_id: 1,
                    },
                },
                einkaufs_datum: new Date(),
                edit_date: new Date(),
            },
        })];
    }

    let projekt_artikels = await prisma.projekt_artikel.findMany();

    if (projekt_artikels.length === 0) {
        await prisma.projekt_artikel.create({
            data: {
                projekt_id: 802007,
                menge: 6,
                artikel_id: artikels[0].artikel_id,
            },
        });
    // async function instantiate(prisma: PrismaClient) {
//     let kategories = await prisma.kategorien.findMany();
//
//     if (kategories.length === 0) {
//         kategories = [await prisma.kategorien.create({
//             data: {
//                 kategoriename: "Asset",
//             },
//         })];
//     }
//
//     let unterkategorie = await prisma.unterkategorie.findMany();
//
//     if (unterkategorie.length === 0) {
//         await prisma.unterkategorie.create({
//             data: {
//                 unterkategoriename: "Divers",
//                 kategorien: {
//                     connect: {
//                         kategorie_id: kategories[0].kategorie_id,
//                     },
//                 },
//             },
//         });
//     }
//
//     let projekte = await prisma.tblprojekte.findMany();
//
//     if (projekte.length === 0) {
//         await prisma.tblprojekte.create({
//             data: {
//                 ID: 802007,
//                 Standort: "Lager Hannover",
//             },
//         });
//     }
//
//     let artikels = await prisma.artikel.findMany();
//
//     if (artikels.length === 0) {
//         artikels = [await prisma.artikel.create({
//             data: {
//                 artikelname: "other Kabel last over REST API",
//                 unterkategorie: {
//                     connect: {
//                         unterkategorie_id: 1,
//                     },
//                 },
//                 einkaufs_datum: new Date(),
//                 edit_date: new Date(),
//             },
//         })];
//     }
//
//     let projekt_artikels = await prisma.projekt_artikel.findMany();
//
//     if (projekt_artikels.length === 0) {
//         await prisma.projekt_artikel.create({
//             data: {
//                 projekt_id: 802007,
//                 menge: 6,
//                 artikel_id: artikels[0].artikel_id,
//             },
//         });
//     }
// }
}
}

start();

