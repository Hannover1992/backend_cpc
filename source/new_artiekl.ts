import {PrismaClient} from "@prisma/client";

let prisma = new PrismaClient();
// was habe ich, ich gehe davon aus das die Kategori und Unterkategorie schon vorhanden sind

let kategorie_id = 1;
let unterkategorie_id = 1;
let projekt_id = 802007;
let menge = 10;


let artikel = prisma.artikel.create ({
    data: {
        artikelname: "HDMI Kabel",
        unterkategorie_id: unterkategorie_id,
    }
}) .then(
        (artikel) => {
            let artikel_id = artikel.artikel_id;
            return prisma.projekt_artikel.create({
                data : {
                    projekt_id: projekt_id,
                    artikel_id: artikel_id,
                    menge: menge
                }
            }).then(
                ( projekt_artikel_newely_created)  => {
                    console.log(projekt_artikel_newely_created)
                }
            )
        });

// artikel = prisma.artikel.findMany({
//     include: {
//         unterkategorie: {
//             include: {
//                 kategorien: true
//             }
//         }
//     }
// }).then(
//     (artikel) => {
//         console.log(artikel);
//     }
// )

