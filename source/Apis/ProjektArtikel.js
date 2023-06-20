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
    exports.ProjektArtikel = void 0;
    var ServerSetup_1 = require("../ServerSetup");
    var ProjektArtikel = (function (_super) {
        __extends(ProjektArtikel, _super);
        function ProjektArtikel() {
            return _super.call(this) || this;
        }
        ProjektArtikel.prototype.deletee = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.delete('/projektArtikelAsset/:projekt_artikel_id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var projektArtikelID;
                return __generator(this, function (_a) {
                    this.allow_communikation_from_all_ip_adress(res);
                    projektArtikelID = parseInt(req.params.projekt_artikel_id);
                    this.prisma.projekt_artikel.delete({
                        where: {
                            projekt_artikel_id: projektArtikelID
                        },
                        include: {
                            artikel: {
                                include: {
                                    assets: true,
                                    electronics: true
                                }
                            }
                        }
                    }).then(function () {
                        res.status(200).send({ "message": "Asset wurde erfolgreich gelöscht" });
                    }).catch(function (error) {
                        res.status(500).send({ "message": error.message });
                    });
                    return [2];
                });
            }); });
        };
        ProjektArtikel.prototype.read = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.get('/projekt_assets/:projekt_id/:unterkategoriename', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                                    assets: true,
                                    unterkategorie: true,
                                    electronics: true
                                },
                            },
                        },
                    })
                        .then(function (artikel) {
                        res.status(200).send(artikel);
                        console.log("Deleted Success");
                    }).catch(function (error) {
                        res.status(500).send({ "message": error.message });
                    });
                    return [2];
                });
            }); });
            this.app.get('/projekt_artikel', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.allow_communikation_from_all_ip_adress(res);
                    this.prisma.projekt_artikel.findMany({
                        include: {
                            artikel: {
                                include: {
                                    unterkategorie: {
                                        include: {
                                            kategorien: true,
                                        },
                                    },
                                    assets: true,
                                },
                            },
                            tblprojekte: true,
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
        ProjektArtikel.prototype.upsertProjektArtikel = function (projektArtikelData) {
            return __awaiter(this, void 0, void 0, function () {
                var existingArtikel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(projektArtikelData.artikel.artikel_id != null)) return [3, 2];
                            return [4, this.prisma.artikel.findUnique({
                                    where: {
                                        artikel_id: projektArtikelData.artikel.artikel_id
                                    }
                                })];
                        case 1:
                            existingArtikel = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!existingArtikel) return [3, 4];
                            return [4, this.updateProjektArtikel(projektArtikelData)];
                        case 3: return [2, _a.sent()];
                        case 4: return [4, this.createProjectArticle(projektArtikelData)];
                        case 5: return [2, _a.sent()];
                    }
                });
            });
        };
        ProjektArtikel.prototype.createProjectArticle = function (projektArtikelData) {
            return __awaiter(this, void 0, void 0, function () {
                var parsedData, project, articleData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parsedData = this.parseArticleData(projektArtikelData);
                            return [4, this.connectProject(parsedData.projekt_id)];
                        case 1:
                            project = _a.sent();
                            return [4, this.createArticle(parsedData)];
                        case 2:
                            articleData = _a.sent();
                            return [4, this.prisma.projekt_artikel.create({
                                    data: {
                                        menge: parsedData.menge,
                                        tblprojekte: project,
                                        artikel: articleData
                                    }
                                })];
                        case 3: return [2, _a.sent()];
                    }
                });
            });
        };
        ProjektArtikel.prototype.parseArticleData = function (projektArtikelData) {
            return {
                menge: parseInt(projektArtikelData.artikel.asset_numbers.menge),
                projekt_id: projektArtikelData.projekt_id,
                artikel: projektArtikelData.artikel,
                unterkategorie_id: projektArtikelData.artikel.unterkategorie_id,
                assets: projektArtikelData.artikel.assets
            };
        };
        ProjektArtikel.prototype.connectProject = function (projekt_id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, {
                            connect: {
                                ID: projekt_id
                            }
                        }];
                });
            });
        };
        ProjektArtikel.prototype.createArticle = function (parsedData) {
            return __awaiter(this, void 0, void 0, function () {
                var unterkategorie, assets, article;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.connectSubcategory(parsedData.unterkategorie_id)];
                        case 1:
                            unterkategorie = _a.sent();
                            assets = null;
                            if (!parsedData.assets) return [3, 3];
                            return [4, this.createAssets(parsedData)];
                        case 2:
                            assets = _a.sent();
                            _a.label = 3;
                        case 3:
                            article = {
                                create: {
                                    artikelname: parsedData.artikel.asset_details.artikelname,
                                    preis: parseFloat(parsedData.artikel.asset_numbers.preis),
                                    beschreibung: parsedData.artikel.asset_details.beschreibung,
                                    zustand: parsedData.artikel.asset_details.zustand,
                                    einkaufs_datum: new Date(parsedData.artikel.date_info.einkaufs_datum),
                                    belegt_von: new Date(parsedData.artikel.date_info.belegt_von),
                                    belegt_bis: new Date(parsedData.artikel.date_info.belegt_bis),
                                    anlagenummer: parsedData.artikel.asset_numbers.anlagenummer,
                                    edit_date: new Date(parsedData.artikel.date_info.edit_date),
                                    firma: parsedData.artikel.asset_details.firma,
                                    model: parsedData.artikel.asset_details.model,
                                    seriennummer: parsedData.artikel.asset_numbers.seriennummer,
                                    unterkategorie: unterkategorie,
                                    assets: assets
                                }
                            };
                            return [2, article];
                    }
                });
            });
        };
        ProjektArtikel.prototype.connectSubcategory = function (unterkategorie_id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, {
                            connect: {
                                unterkategorie_id: unterkategorie_id
                            }
                        }];
                });
            });
        };
        ProjektArtikel.prototype.createAssets = function (parsedData) {
            return __awaiter(this, void 0, void 0, function () {
                var assetsData;
                return __generator(this, function (_a) {
                    assetsData = parsedData.artikel.assets && parsedData.artikel.assets.Inventarnummer
                        ? { create: { Inventarnummer: parseInt(parsedData.artikel.assets.Inventarnummer) } }
                        : undefined;
                    return [2, assetsData];
                });
            });
        };
        ProjektArtikel.prototype.create = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.post('/projektArtikelAsset', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var projektArtikelData;
                return __generator(this, function (_a) {
                    this.allow_communikation_from_all_ip_adress(res);
                    console.log(req.body);
                    projektArtikelData = req.body;
                    this.upsertProjektArtikel(projektArtikelData)
                        .then(function (response) {
                        if (response) {
                            res.status(200).send({ "message": "ProjektArtikel updated" });
                            console.log("ProjektArtikel updated");
                        }
                        else {
                            res.status(200).send({ "message": "ProjektArtikel created" });
                            console.log("ProjektArtikel created");
                        }
                    })
                        .catch(function (error) {
                        res.status(500).send({ "message": error.message });
                        console.log(error.message);
                    });
                    return [2];
                });
            }); });
            this.app.post('/projektArtikelAsset', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var projektArtikelData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.allow_communikation_from_all_ip_adress(res);
                            console.log(req.body);
                            projektArtikelData = req.body;
                            this.createProjectArticle(projektArtikelData);
                            return [4, this.prisma.projekt_artikel.create({
                                    data: {
                                        menge: parseInt(projektArtikelData.artikel.asset_numbers.menge),
                                        tblprojekte: {
                                            connect: {
                                                ID: projektArtikelData.projekt_id
                                            }
                                        },
                                        artikel: {
                                            create: {
                                                artikelname: projektArtikelData.artikel.asset_details.artikelname,
                                                unterkategorie: {
                                                    connect: {
                                                        unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                                                    }
                                                },
                                                preis: parseFloat(projektArtikelData.artikel.asset_numbers.preis),
                                                beschreibung: projektArtikelData.artikel.asset_details.beschreibung,
                                                zustand: projektArtikelData.artikel.asset_details.zustand,
                                                einkaufs_datum: new Date(projektArtikelData.artikel.date_info.einkaufs_datum),
                                                belegt_von: new Date(projektArtikelData.artikel.date_info.belegt_von),
                                                belegt_bis: new Date(projektArtikelData.artikel.date_info.belegt_bis),
                                                anlagenummer: projektArtikelData.artikel.asset_numbers.anlagenummer,
                                                edit_date: new Date(projektArtikelData.artikel.date_info.edit_date),
                                                firma: projektArtikelData.artikel.asset_details.firma,
                                                model: projektArtikelData.artikel.asset_details.model,
                                                seriennummer: projektArtikelData.artikel.asset_numbers.serriennummer,
                                                assets: {
                                                    create: {
                                                        Inventarnummer: parseInt(projektArtikelData.artikel.assets.Inventarnummer)
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
                        case 1: return [2, _a.sent()];
                    }
                });
            }); });
        };
        ProjektArtikel.prototype.updateProjektArtikel = function (projektArtikelData) {
            return __awaiter(this, void 0, void 0, function () {
                var existingArtikel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.prisma.artikel.findUnique({
                                where: {
                                    artikel_id: projektArtikelData.artikel.artikel_id
                                }
                            })];
                        case 1:
                            existingArtikel = _a.sent();
                            if (!existingArtikel) return [3, 3];
                            return [4, this.prisma.projekt_artikel.update({
                                    where: {
                                        artikel_id: projektArtikelData.artikel.artikel_id
                                    },
                                    data: {
                                        data: {
                                            menge: projektArtikelData.artikel.asset_numbers.menge,
                                            tblprojekte: {
                                                connect: {
                                                    ID: projektArtikelData.projekt_id
                                                }
                                            },
                                            artikel: {
                                                update: {
                                                    artikelname: projektArtikelData.artikel.asset_details.artikelname,
                                                    unterkategorie: {
                                                        connect: {
                                                            unterkategorie_id: projektArtikelData.artikel.unterkategorie_id
                                                        }
                                                    },
                                                    preis: parseFloat(projektArtikelData.artikel.asset_numbers.preis),
                                                    beschreibung: projektArtikelData.artikel.asset_details.beschreibung,
                                                    zustand: projektArtikelData.artikel.asset_details.zustand,
                                                    einkaufs_datum: new Date(projektArtikelData.artikel.date_info.einkaufs_datum),
                                                    belegt_von: new Date(projektArtikelData.artikel.date_info.belegt_von),
                                                    belegt_bis: new Date(projektArtikelData.artikel.date_info.belegt_bis),
                                                    anlagenummer: projektArtikelData.artikel.asset_numbers.anlagenummer,
                                                    edit_date: new Date(projektArtikelData.artikel.date_info.edit_date),
                                                    firma: projektArtikelData.artikel.asset_details.firma,
                                                    model: projektArtikelData.artikel.asset_details.model,
                                                    seriennummer: projektArtikelData.artikel.asset_numbers.serriennummer,
                                                    assets: {
                                                        update: {
                                                            Inventarnummer: parseInt(projektArtikelData.artikel.assets.Inventarnummer)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })];
                        case 2: return [2, _a.sent()];
                        case 3: return [2, null];
                    }
                });
            });
        };
        ProjektArtikel.prototype.update = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        return ProjektArtikel;
    }(ServerSetup_1.ServerSetup));
    exports.ProjektArtikel = ProjektArtikel;
});
//# sourceMappingURL=ProjektArtikel.js.map