import {PrismaClient} from "@prisma/client";

export class Database {
    public prisma: any;

    constructor() {
        this.prisma = new PrismaClient();
        }
    }