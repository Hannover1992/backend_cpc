var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Database = void 0;
    var ServerSetup = (function () {
        function ServerSetup() {
        }
        Object.defineProperty(ServerSetup.prototype, "bodyParser", {
            get: function () {
                return this._bodyParser;
            },
            set: function (value) {
                this._bodyParser = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServerSetup.prototype, "cors", {
            get: function () {
                return this._cors;
            },
            set: function (value) {
                this._cors = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServerSetup.prototype, "prisma", {
            get: function () {
                return this._prisma;
            },
            set: function (value) {
                this._prisma = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServerSetup.prototype, "app", {
            get: function () {
                return this._app;
            },
            set: function (value) {
                this._app = value;
            },
            enumerable: false,
            configurable: true
        });
        ServerSetup.prototype.start_listen = function () {
            var _this = this;
            this.app.listen(this._PORT, function () {
                console.log("Server running on port ".concat(_this._PORT));
            });
        };
        ServerSetup.prototype.allow_any_sites_to_talk_with_this_id = function () {
            this.app.use(this.cors({ origin: '*' }));
        };
        ServerSetup.prototype.allow_communikation_from_all_ip_adress = function (res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        };
        ServerSetup.prototype.setup_express = function () {
            this._cors = require('cors');
            this._app = require('express')();
            this._bodyParser = require('body-parser');
            this.app.use(this.bodyParser.json());
            this._PORT = 8080;
            this.allow_any_sites_to_talk_with_this_id();
        };
        return ServerSetup;
    }());
    var Database = (function (_super) {
        __extends(Database, _super);
        function Database(prisma) {
            var _this = _super.call(this) || this;
            _this.prisma = prisma;
            _this.setup_express();
            return _this;
        }
        Database.prototype.run_apis = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.start_listen();
                    this.CRUD();
                    return [2];
                });
            });
        };
        Database.prototype.projects_CRUD = function () {
            this.projects_read();
        };
        Database.prototype.projects_read = function () {
            var _this = this;
            this.app.get('/projects', function (req, res) {
                _this.allow_communikation_from_all_ip_adress(res);
                _this._prisma.tblprojekte.findMany().
                    then(function (projects) {
                    res.status(200).send(projects);
                }).catch(function (error) {
                    res.status(500).send({ "message": error.message });
                });
            });
        };
        Database.prototype.CRUD = function () {
            this.read();
            this.create();
            this.update();
            this.deletee();
        };
        Database.prototype.read = function () {
            var _this = this;
            this.app.get('/project/:id', function (req, res) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                var id = _this.get_id(req);
                _this._prisma.tblprojekte.findUnique({
                    where: {
                        ID: id
                    }
                }).then(function (project) {
                    res.status(200).send(project);
                }).catch(function (error) {
                    res.status(500).send({ "message": error.message });
                });
            });
        };
        Database.prototype.get_id = function (req) {
            var id_as_string = req.params.id;
            var id = parseInt(id_as_string);
            return id;
        };
        Database.prototype.create = function () {
            var _this = this;
            this.app.post('/project/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.allow_communikation_from_all_ip_adress(res);
                    this.prisma.tblprojekte.create({
                        data: req.body
                    }).then(function (project) {
                        res.status(200).send({ "message": "Project created" });
                    }).catch(function (error) {
                        res.status(500).send({ "message": error.message });
                    });
                    return [2];
                });
            }); });
        };
        Database.prototype.update = function () {
            var _this = this;
            this.app.put('/project/:id', function (req, res) {
                _this.allow_communikation_from_all_ip_adress(res);
                var id = _this.get_id(req);
                _this._prisma.tblprojekte.update({
                    where: {
                        ID: id
                    },
                    data: req.body
                }).then(function (result) {
                    console.log("Project with ID: " + id + " wurde updated");
                }).then(function () {
                    res.status(200).send({ "message": "Project updated" });
                }).catch(function (error) {
                    res.status(404).send({ "message": error.message });
                });
            });
        };
        Database.prototype.deletee = function () {
            var _this = this;
            this.app.delete('/project/:id', function (req, res) {
                _this.allow_communikation_from_all_ip_adress(res);
                var id = _this.get_id(req);
                _this._prisma.tblprojekte.delete({
                    where: {
                        ID: id
                    }
                }).then(function () {
                    res.status(200).send({ "message": "Project deleted" });
                }).catch(function (error) {
                    res.status(404).send({ "message": error.message });
                });
            });
        };
        return Database;
    }(ServerSetup));
    exports.Database = Database;
});
//# sourceMappingURL=database.js.map