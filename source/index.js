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
        define(["require", "exports", "./Apis/Project", "./Apis/ProjectTable", "./Apis/KategorienTable", "./Apis/Asset", "./Apis/ProjektArtikel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Project_1 = require("./Apis/Project");
    var ProjectTable_1 = require("./Apis/ProjectTable");
    var KategorienTable_1 = require("./Apis/KategorienTable");
    var Asset_1 = require("./Apis/Asset");
    var ProjektArtikel_1 = require("./Apis/ProjektArtikel");
    function start() {
        return __awaiter(this, void 0, void 0, function () {
            var project;
            return __generator(this, function (_a) {
                project = new Project_1.Project();
                new ProjectTable_1.ProjectTable();
                new ProjektArtikel_1.ProjektArtikel();
                new KategorienTable_1.KategorienTable();
                new Asset_1.Asset();
                return [2];
            });
        });
    }
    function instantiate(prisma) {
        var kategory;
        if (prisma.kategorien.findMany() == null) {
            kategory = prisma.kategorien.create({
                data: {
                    kategoriename: "Asset"
                }
            });
        }
        var unterkategoriename;
        if (prisma.unterkategorie.findMany() == null) {
            unterkategoriename = prisma.unterkategorie.create({
                data: {
                    unterkategoriename: "Asset",
                    kategorien: {
                        connect: {
                            kategorie_id: kategory.kategorie_id
                        }
                    }
                }
            });
        }
        var projekt;
        if (prisma.tblprojekte.findMany() == null) {
            projekt = prisma.tblprojekte.create({
                data: {
                    ID: 802007,
                    Standort: "Lager Hannover"
                }
            });
        }
    }
    start();
});
//# sourceMappingURL=index.js.map