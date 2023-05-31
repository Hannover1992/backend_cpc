(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@prisma/client"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServerSetup = void 0;
    var client_1 = require("@prisma/client");
    var ServerSetup = (function () {
        function ServerSetup() {
            if (ServerSetup._prisma == null) {
                ServerSetup._prisma = new client_1.PrismaClient();
                this.setup_express();
                this.start_listen();
            }
            this.CRUD();
        }
        Object.defineProperty(ServerSetup.prototype, "bodyParser", {
            get: function () {
                return ServerSetup._bodyParser;
            },
            set: function (value) {
                ServerSetup._bodyParser = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServerSetup.prototype, "cors", {
            get: function () {
                return ServerSetup._cors;
            },
            set: function (value) {
                ServerSetup._cors = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServerSetup.prototype, "prisma", {
            get: function () {
                return ServerSetup._prisma;
            },
            set: function (value) {
                ServerSetup._prisma = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServerSetup.prototype, "app", {
            get: function () {
                return ServerSetup._app;
            },
            set: function (value) {
                ServerSetup._app = value;
            },
            enumerable: false,
            configurable: true
        });
        ServerSetup.prototype.CRUD = function () {
            this.create();
            this.read();
            this.update();
            this.deletee();
        };
        ServerSetup.prototype.start_listen = function () {
            this.app.listen(ServerSetup._PORT, function () {
                console.log("Server running on port ".concat(ServerSetup._PORT));
            });
        };
        ServerSetup.prototype.allow_any_sites_to_talk_with_this_id = function () {
            this.app.use(this.cors({ origin: '*' }));
        };
        ServerSetup.prototype.allow_communikation_from_all_ip_adress = function (res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        };
        ServerSetup.prototype.setup_express = function () {
            this.cors = require('cors');
            this.app = require('express')();
            this.bodyParser = require('body-parser');
            this.app.use(this.bodyParser.json());
            ServerSetup._PORT = 8080;
            this.allow_any_sites_to_talk_with_this_id();
        };
        return ServerSetup;
    }());
    exports.ServerSetup = ServerSetup;
});
//# sourceMappingURL=ServerSetup.js.map