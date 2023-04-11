import {PrismaClient} from "@prisma/client";

export abstract class ServerSetup {

    get bodyParser(): any {
        return ServerSetup._bodyParser;
    }

    set bodyParser(value: any) {
        ServerSetup._bodyParser = value;
    }

    get cors(): any {
        return ServerSetup._cors;
    }

    set cors(value: any) {
        ServerSetup._cors = value;
    }

    get prisma(): any {
        return ServerSetup._prisma;
    }

    set prisma(value: any) {
        ServerSetup._prisma = value;
    }

    get app(): any {
        return ServerSetup._app;
    }

    set app(value: any) {
        ServerSetup._app = value;
    }

    private static _cors: any;
    private static _prisma: any;
    private static _app: any;
    private static _PORT: number;
    private static _bodyParser: any;

    constructor() {
        if(ServerSetup._prisma == null){
            ServerSetup._prisma = new PrismaClient();
            this.setup_express();
            this.start_listen();
        }
        this.CRUD();
    }


    CRUD() {
        this.create();
        this.read();
        this.update();
        this.deletee();
    }


    protected start_listen() {
        this.app.listen(ServerSetup._PORT, () => {
            console.log(`Server running on port ${ServerSetup._PORT}`);
        });
    }

    private allow_any_sites_to_talk_with_this_id() {
        this.app.use(this.cors({origin: '*'}));
    }

    protected allow_communikation_from_all_ip_adress(res: any) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    setup_express() {
        this.cors = require('cors');
        this.app = require('express')();
        this.bodyParser = require('body-parser');
        this.app.use(this.bodyParser.json());
        ServerSetup._PORT = 8080;
        this.allow_any_sites_to_talk_with_this_id();
    }

    abstract create(...args: any[]): any;
    abstract read(...args: any[]): any;
    abstract update(...args: any[]): any;
    abstract deletee(...args: any[]): any;

}
