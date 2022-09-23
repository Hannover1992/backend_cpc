import {PrismaClient} from "@prisma/client";

export class Database {
    public prisma: any;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
        }
    }