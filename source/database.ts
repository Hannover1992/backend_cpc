import {PrismaClient} from "@prisma/client";

export class Database{
    prisma: any;
    constructor() {
        this.prisma = new PrismaClient();
        }
    }