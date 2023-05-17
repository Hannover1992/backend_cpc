import {PrismaClient} from "@prisma/client";

let prisma = new PrismaClient();

prisma.artikel.create({
    data: {
        artikel_id: 1,
        artikelname: "test",
        unterkategorie_id: 1,
        zustand: "test",
    }
});