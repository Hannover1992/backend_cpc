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
        define(["require", "exports", "./Article"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Acu = void 0;
    var Article_1 = require("./Article");
    var Acu = (function (_super) {
        __extends(Acu, _super);
        function Acu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Acu.prototype.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.app.post('/projektArtikelAcu', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var projektArtikelData, createdArtikel, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.allow_communikation_from_all_ip_adress(res);
                                    projektArtikelData = req.body;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 6, , 7]);
                                    return [4, this.createArtikel(projektArtikelData)];
                                case 2:
                                    createdArtikel = _a.sent();
                                    if (!projektArtikelData.artikel.acu) return [3, 4];
                                    return [4, this.createAcu(projektArtikelData, createdArtikel.artikel_id)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [4, this.createProjektArtikel(projektArtikelData, createdArtikel.artikel_id)];
                                case 5:
                                    _a.sent();
                                    res.status(200).send({ "message": "ProjektArtikel with Acu created" });
                                    console.log("ProjektArtikel with Acu created");
                                    return [3, 7];
                                case 6:
                                    error_1 = _a.sent();
                                    res.status(500).send({ "message": error_1.message });
                                    console.log(error_1.message);
                                    return [3, 7];
                                case 7: return [2];
                            }
                        });
                    }); });
                    return [2];
                });
            });
        };
        Acu.prototype.createAcu = function (projektArtikelData, artikelId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.prisma.acu.create({
                                data: {
                                    router: projektArtikelData.artikel.acu.router,
                                    ip_adresse: projektArtikelData.artikel.acu.ip_adresse,
                                    artikel: {
                                        connect: {
                                            artikel_id: artikelId,
                                        }
                                    }
                                }
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            });
        };
        Acu.prototype.read = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.read_single();
        };
        Acu.prototype.read_single = function () {
            var _this = this;
            this.app.get('/projektArtikelAcu/:projekt_id/:unterkategoriename', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var inputet_projekt_id, inputet_unterkategoriename;
                return __generator(this, function (_a) {
                    this.allow_communikation_from_all_ip_adress(res);
                    inputet_projekt_id = parseInt(req.params.projekt_id);
                    inputet_unterkategoriename = req.params.unterkategoriename;
                    this.prisma.projekt_artikel.findMany({
                        where: {
                            projekt_id: inputet_projekt_id,
                            artikel: {
                                unterkategorie: {
                                    unterkategoriename: {
                                        equals: inputet_unterkategoriename,
                                    },
                                },
                            },
                        },
                        include: {
                            artikel: {
                                include: {
                                    unterkategorie: true,
                                    acu: true
                                },
                            },
                        },
                    })
                        .then(function (artikel) {
                        res.status(200).send(artikel);
                    }).catch(function (error) {
                        res.status(500).send({ "message": error.message });
                    });
                    return [2];
                });
            }); });
        };
        Acu.prototype.update = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.put('/projektArtikelAcu', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var projektArtikelData, existingAcu, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.allow_communikation_from_all_ip_adress(res);
                            projektArtikelData = req.body;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 8]);
                            if (!projektArtikelData.artikel.acu) return [3, 4];
                            return [4, this.prisma.acu.findUnique({
                                    where: {
                                        acu_id: projektArtikelData.artikel.acu.acu_id
                                    }
                                })];
                        case 2:
                            existingAcu = _a.sent();
                            if (!existingAcu) return [3, 4];
                            return [4, this.prisma.acu.update({
                                    where: {
                                        acu_id: projektArtikelData.artikel.acu.acu_id
                                    },
                                    data: projektArtikelData.artikel.acu
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [4, this.updateArtikel(projektArtikelData)];
                        case 5:
                            _a.sent();
                            return [4, this.updateProjektArtikel(projektArtikelData)];
                        case 6:
                            _a.sent();
                            res.status(200).send({ "message": "ProjektArtikelAcu updated" });
                            return [3, 8];
                        case 7:
                            error_2 = _a.sent();
                            res.status(500).send({ "message": error_2.message });
                            console.log(error_2.message);
                            return [3, 8];
                        case 8: return [2];
                    }
                });
            }); });
        };
        Acu.prototype.deletee = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.delete('/projektArtikelAcu/:projekt_artikel_id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var projektArtikelID, projArtikel, acuID, error_3;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.allow_communikation_from_all_ip_adress(res);
                            projektArtikelID = parseInt(req.params.projekt_artikel_id);
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 6, , 7]);
                            return [4, this.prisma.projekt_artikel.findUnique({
                                    where: {
                                        projekt_artikel_id: projektArtikelID
                                    },
                                    include: {
                                        artikel: {
                                            select: {
                                                acu: {
                                                    select: {
                                                        acu_id: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })];
                        case 2:
                            projArtikel = _c.sent();
                            acuID = (_b = (_a = projArtikel === null || projArtikel === void 0 ? void 0 : projArtikel.artikel) === null || _a === void 0 ? void 0 : _a.acu) === null || _b === void 0 ? void 0 : _b.acu_id;
                            if (!acuID) return [3, 4];
                            return [4, this.prisma.acu.delete({
                                    where: {
                                        acu_id: acuID
                                    }
                                })];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4: return [4, this.prisma.projekt_artikel.delete({
                                where: {
                                    projekt_artikel_id: projektArtikelID
                                }
                            })];
                        case 5:
                            _c.sent();
                            res.status(200).send({ "message": "Acu und ProjektArtikel wurden erfolgreich gelöscht" });
                            return [3, 7];
                        case 6:
                            error_3 = _c.sent();
                            res.status(500).send({ "message": error_3.message });
                            console.log(error_3.message);
                            return [3, 7];
                        case 7: return [2];
                    }
                });
            }); });
        };
        return Acu;
    }(Article_1.Article));
    exports.Acu = Acu;
});
//# sourceMappingURL=Acu.js.map