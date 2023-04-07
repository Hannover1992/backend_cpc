import {PrismaClient} from "@prisma/client";

export abstract class ServerSetup {

    get bodyParser(): any {
        return this._bodyParser;
    }

    set bodyParser(value: any) {
        this._bodyParser = value;
    }

    get cors(): any {
        return this._cors;
    }

    set cors(value: any) {
        this._cors = value;
    }

    get prisma(): any {
        return ServerSetup._prisma;
    }

    set prisma(value: any) {
        ServerSetup._prisma = value;
    }

    get app(): any {
        return this._app;
    }

    set app(value: any) {
        this._app = value;
    }

    private _cors: any;
    private static _prisma: any;
    private _app: any;
    private _PORT: number;
    private _bodyParser: any;

    constructor() {
        if(ServerSetup._prisma == null){
            ServerSetup._prisma = new PrismaClient();
            console.log("prisma wurde etabliert")
        }
        this.setup_express();
        this.start_listen();
    }


    protected start_listen() {
        this.app.listen(this._PORT, () => {
            console.log(`Server running on port ${this._PORT}`);
        });
    }

    private allow_any_sites_to_talk_with_this_id() {
        this.app.use(this.cors({origin: '*'}));
    }

    protected allow_communikation_from_all_ip_adress(res: any) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    setup_express() {
        this._cors = require('cors');
        this._app = require('express')();
        this._bodyParser = require('body-parser');
        this.app.use(this.bodyParser.json());
        this._PORT = 8080;
        this.allow_any_sites_to_talk_with_this_id();
    }

    abstract CRUD(): void;

}
