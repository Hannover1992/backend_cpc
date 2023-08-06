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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
        define(["require", "exports", "./Apis/Project", "./Apis/ProjectTable", "./Apis/KategorienTable", "./Apis/Asset", "./Apis/ProjektAssets", "./Apis/Simkarten", "./Apis/Notebook", "./Apis/Router", "./Apis/Handy", "./Apis/Acu", "./Apis/DeliveryNote", "./Apis/User", "./Apis/Role"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Project_1 = require("./Apis/Project");
    var ProjectTable_1 = require("./Apis/ProjectTable");
    var KategorienTable_1 = require("./Apis/KategorienTable");
    var Asset_1 = require("./Apis/Asset");
    var ProjektAssets_1 = require("./Apis/ProjektAssets");
    var Simkarten_1 = require("./Apis/Simkarten");
    var Notebook_1 = require("./Apis/Notebook");
    var Router_1 = require("./Apis/Router");
    var Handy_1 = require("./Apis/Handy");
    var Acu_1 = require("./Apis/Acu");
    var DeliveryNote_1 = require("./Apis/DeliveryNote");
    var User_1 = require("./Apis/User");
    var Role_1 = require("./Apis/Role");
    function start() {
        return __awaiter(this, void 0, void 0, function () {
            var project, jwtSecretKey;
            return __generator(this, function (_a) {
                project = new Project_1.Project();
                new ProjectTable_1.ProjectTable();
                new ProjektAssets_1.ProjektAssets();
                new KategorienTable_1.KategorienTable();
                new Asset_1.Asset();
                new Simkarten_1.Simkarten();
                new Notebook_1.Notebook();
                new Handy_1.Handy();
                new Router_1.Router();
                new Acu_1.Acu();
                jwtSecretKey = process.env.JWT_SECRET || require('crypto').randomBytes(64).toString('hex');
                new User_1.User(jwtSecretKey);
                new Role_1.Role();
                new DeliveryNote_1.DeliveryNote();
                instantiate(project.prisma);
                return [2];
            });
        });
    }
    function instantiate(prisma) {
        return __awaiter(this, void 0, void 0, function () {
            var kategories, unterkategorie, projekte, artikels, projekt_artikels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, prisma.kategorien.findMany()];
                    case 1:
                        kategories = _a.sent();
                        if (!(kategories.length === 0)) return [3, 3];
                        return [4, prisma.kategorien.create({
                                data: {
                                    kategoriename: "Asset",
                                },
                            })];
                    case 2:
                        kategories = [_a.sent()];
                        _a.label = 3;
                    case 3: return [4, prisma.unterkategorie.findMany()];
                    case 4:
                        unterkategorie = _a.sent();
                        if (!(unterkategorie.length === 0)) return [3, 6];
                        return [4, prisma.unterkategorie.create({
                                data: {
                                    unterkategoriename: "Divers",
                                    kategorien: {
                                        connect: {
                                            kategorie_id: kategories[0].kategorie_id,
                                        },
                                    },
                                },
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4, prisma.tblprojekte.findMany()];
                    case 7:
                        projekte = _a.sent();
                        if (!(projekte.length === 0)) return [3, 9];
                        return [4, prisma.tblprojekte.create({
                                data: {
                                    ID: 802007,
                                    Standort: "Lager Hannover",
                                },
                            })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4, prisma.artikel.findMany()];
                    case 10:
                        artikels = _a.sent();
                        if (!(artikels.length === 0)) return [3, 12];
                        return [4, prisma.artikel.create({
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
                    case 11:
                        artikels = [_a.sent()];
                        _a.label = 12;
                    case 12: return [4, prisma.projekt_artikel.findMany()];
                    case 13:
                        projekt_artikels = _a.sent();
                        if (!(projekt_artikels.length === 0)) return [3, 15];
                        return [4, prisma.projekt_artikel.create({
                                data: {
                                    projekt_id: 802007,
                                    menge: 6,
                                    artikel_id: artikels[0].artikel_id,
                                },
                            })];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15: return [2];
                }
            });
        });
    }
    start();
});
//# sourceMappingURL=index.js.map