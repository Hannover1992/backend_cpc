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
        define(["require", "exports", "../ServerSetup"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Simkarten = void 0;
    var ServerSetup_1 = require("../ServerSetup");
    var Simkarten = (function (_super) {
        __extends(Simkarten, _super);
        function Simkarten() {
            return _super.call(this) || this;
        }
        Simkarten.prototype.updateProjektArtikel = function (projektArtikelData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.prisma.projekt_artikel.update({
                                where: {
                                    projekt_artikel_id: projektArtikelData.projekt_artikel_id
                                },
                                data: {
                                    menge: projektArtikelData.menge,
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Simkarten.prototype.updateArtikel = function (projektArtikelData) {
            var _a, _b, _c, _d, _e, _f;
            return __awaiter(this, void 0, void 0, function () {
                var existingArtikel;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0: return [4, this.prisma.artikel.findUnique({
                                where: {
                                    artikel_id: projektArtikelData.artikel_id
                                }
                            })];
                        case 1:
                            existingArtikel = _g.sent();
                            if (!existingArtikel) return [3, 3];
                            return [4, this.prisma.artikel.update({
                                    where: {
                                        artikel_id: projektArtikelData.artikel_id
                                    },
                                    data: {
                                        artikelname: projektArtikelData.artikel.artikelname,
                                        unterkategorie: {
                                            connect: {
                                                unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                                            }
                                        },
                                        preis: parseFloat(projektArtikelData.artikel.preis) || 0,
                                        beschreibung: (_a = projektArtikelData.artikel.beschreibung) !== null && _a !== void 0 ? _a : "",
                                        zustand: (_b = projektArtikelData.artikel.zustand) !== null && _b !== void 0 ? _b : "",
                                        einkaufs_datum: new Date(projektArtikelData.artikel.einkaufs_datum) || undefined,
                                        belegt_von: new Date(projektArtikelData.artikel.belegt_von) || undefined,
                                        belegt_bis: new Date(projektArtikelData.artikel.belegt_bis) || undefined,
                                        anlagenummer: (_c = projektArtikelData.artikel.anlagenummer) !== null && _c !== void 0 ? _c : "",
                                        edit_date: new Date(projektArtikelData.artikel.edit_date) || undefined,
                                        firma: (_d = projektArtikelData.artikel.firma) !== null && _d !== void 0 ? _d : "",
                                        model: (_e = projektArtikelData.artikel.model) !== null && _e !== void 0 ? _e : "",
                                        seriennummer: (_f = projektArtikelData.artikel.seriennummer) !== null && _f !== void 0 ? _f : "",
                                    },
                                })];
                        case 2:
                            _g.sent();
                            return [3, 4];
                        case 3: throw new Error("Artikel with ID ".concat(projektArtikelData.artikel_id, " does not exist."));
                        case 4: return [2];
                    }
                });
            });
        };
        Simkarten.prototype.create = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.post('/projektArtikelSimkarte', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var projektArtikelData;
                var _a, _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            this.allow_communikation_from_all_ip_adress(res);
                            projektArtikelData = req.body;
                            return [4, this.prisma.projekt_artikel.create({
                                    data: {
                                        menge: projektArtikelData.menge,
                                        tblprojekte: {
                                            connect: {
                                                ID: projektArtikelData.projekt_id
                                            }
                                        },
                                        artikel: {
                                            create: {
                                                artikelname: projektArtikelData.artikel.artikelname,
                                                unterkategorie: {
                                                    connect: {
                                                        unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                                                    }
                                                },
                                                preis: projektArtikelData.artikel.preis,
                                                beschreibung: projektArtikelData.artikel.beschreibung,
                                                zustand: projektArtikelData.artikel.zustand,
                                                einkaufs_datum: new Date(projektArtikelData.artikel.einkaufs_datum),
                                                belegt_von: new Date(projektArtikelData.artikel.belegt_von),
                                                belegt_bis: new Date(projektArtikelData.artikel.belegt_bis),
                                                anlagenummer: projektArtikelData.artikel.anlagenummer,
                                                edit_date: new Date(projektArtikelData.artikel.edit_date),
                                                firma: projektArtikelData.artikel.firma,
                                                model: projektArtikelData.artikel.model,
                                                seriennummer: projektArtikelData.artikel.seriennummer,
                                                simkarten: {
                                                    create: {
                                                        kundennummer: (_a = projektArtikelData.artikel.simkarten.kundennummer) !== null && _a !== void 0 ? _a : "",
                                                        rufnummer: (_b = projektArtikelData.artikel.simkarten.rufnummer) !== null && _b !== void 0 ? _b : "",
                                                        tarif: (_c = projektArtikelData.artikel.simkarten.tarif) !== null && _c !== void 0 ? _c : "",
                                                        pin: (_d = projektArtikelData.artikel.simkarten.pin) !== null && _d !== void 0 ? _d : "",
                                                        puk: (_e = projektArtikelData.artikel.simkarten.puk) !== null && _e !== void 0 ? _e : "",
                                                        einsatzort: (_f = projektArtikelData.artikel.simkarten.einsatzort) !== null && _f !== void 0 ? _f : "",
                                                        aktiv: (_g = projektArtikelData.artikel.simkarten.aktiv) !== null && _g !== void 0 ? _g : false
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })
                                    .then(function () {
                                    res.status(200).send({ "message": "ProjektArtikel created" });
                                    console.log("ProjektArtikel created");
                                })
                                    .catch(function (error) {
                                    res.status(500).send({ "message": error.message });
                                    console.log(error.message);
                                })];
                        case 1: return [2, _h.sent()];
                    }
                });
            }); });
        };
        Simkarten.prototype.read = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.get('/projektArtikelSimkarte/:projekt_id/:unterkategoriename', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                                    simkarten: true
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
        Simkarten.prototype.update = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.put('/projektArtikelSimkarte', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var projektArtikelData, existingSimkarte, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.allow_communikation_from_all_ip_adress(res);
                            projektArtikelData = req.body;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 8]);
                            if (!projektArtikelData.artikel.simkarten) return [3, 4];
                            return [4, this.prisma.simkarten.findUnique({
                                    where: {
                                        simkarten_id: projektArtikelData.artikel.simkarten.simkarten_id
                                    }
                                })];
                        case 2:
                            existingSimkarte = _a.sent();
                            if (!existingSimkarte) return [3, 4];
                            return [4, this.prisma.simkarten.update({
                                    where: {
                                        simkarten_id: projektArtikelData.artikel.simkarten.simkarten_id
                                    },
                                    data: projektArtikelData.artikel.simkarten
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
                            res.status(200).send({ "message": "ProjektArtikelSimkarte updated" });
                            return [3, 8];
                        case 7:
                            error_1 = _a.sent();
                            res.status(500).send({ "message": error_1.message });
                            console.log(error_1.message);
                            return [3, 8];
                        case 8: return [2];
                    }
                });
            }); });
        };
        Simkarten.prototype.deletee = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.delete('/projektArtikelSimkarte/:projekt_artikel_id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var projektArtikelID, projArtikel, simkartenID, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.allow_communikation_from_all_ip_adress(res);
                            projektArtikelID = parseInt(req.params.projekt_artikel_id);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            return [4, this.prisma.projekt_artikel.findUnique({
                                    where: {
                                        projekt_artikel_id: projektArtikelID
                                    },
                                    include: {
                                        artikel: {
                                            select: {
                                                simkarten: {
                                                    select: {
                                                        simkarten_id: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })];
                        case 2:
                            projArtikel = _a.sent();
                            simkartenID = projArtikel === null || projArtikel === void 0 ? void 0 : projArtikel.artikel.simkarten.simkarten_id;
                            if (!(simkartenID !== undefined)) return [3, 4];
                            return [4, this.prisma.simkarten.delete({
                                    where: {
                                        simkarten_id: simkartenID
                                    }
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [4, this.prisma.projekt_artikel.delete({
                                where: {
                                    projekt_artikel_id: projektArtikelID
                                }
                            })];
                        case 5:
                            _a.sent();
                            res.status(200).send({ "message": "Simkarte und ProjektArtikel wurden erfolgreich gelöscht" });
                            return [3, 7];
                        case 6:
                            error_2 = _a.sent();
                            res.status(500).send({ "message": error_2.message });
                            return [3, 7];
                        case 7: return [2];
                    }
                });
            }); });
        };
        return Simkarten;
    }(ServerSetup_1.ServerSetup));
    exports.Simkarten = Simkarten;
});
//# sourceMappingURL=Simkarten.js.map