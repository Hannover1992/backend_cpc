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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        define(["require", "exports", "../ServerSetup"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Asset = void 0;
    var ServerSetup_1 = require("../ServerSetup");
    var Asset = (function (_super) {
        __extends(Asset, _super);
        function Asset() {
            return _super.call(this) || this;
        }
        Asset.prototype.create = function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.app.post('/asset', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var artikelData, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.allow_communikation_from_all_ip_adress(res);
                                    artikelData = req.body.artikel;
                                    console.log(artikelData);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4, this.create_new_artikel(artikelData)];
                                case 2:
                                    _a.sent();
                                    res.status(200).send({
                                        message: "Asset created",
                                    });
                                    return [3, 4];
                                case 3:
                                    error_1 = _a.sent();
                                    console.error(error_1);
                                    res.status(500).send({ message: error_1.message });
                                    return [3, 4];
                                case 4: return [2];
                            }
                        });
                    }); });
                    return [2];
                });
            });
        };
        Asset.prototype.create_new_artikel = function (artikelData) {
            return __awaiter(this, void 0, void 0, function () {
                var kategorienData, unterkategorie;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            kategorienData = artikelData.unterkategorie.kategorien;
                            return [4, this.create_new_Kategory(kategorienData)];
                        case 1:
                            _a.sent();
                            unterkategorie = artikelData.unterkategorie;
                            return [4, this.create_new_unterkategory(unterkategorie, kategorienData)];
                        case 2:
                            _a.sent();
                            return [4, this.create_artikel(artikelData, unterkategorie)];
                        case 3: return [2, _a.sent()];
                    }
                });
            });
        };
        Asset.prototype.create_artikel = function (artikelData, unterkategorie) {
            return __awaiter(this, void 0, void 0, function () {
                var createdArtikel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.prisma.artikel.findFirst({
                                where: { artikel_id: artikelData.artikel_id },
                            })];
                        case 1:
                            createdArtikel = _a.sent();
                            delete artikelData.unterkategorie;
                            if (!!createdArtikel) return [3, 3];
                            return [4, this.prisma.artikel.create({
                                    data: __assign({}, artikelData),
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        Asset.prototype.create_new_Kategory = function (kategorienData) {
            return __awaiter(this, void 0, void 0, function () {
                var kategorie;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.prisma.kategorien.findFirst({
                                where: { kategorie_id: kategorienData.kategorien_id },
                            })];
                        case 1:
                            kategorie = _a.sent();
                            if (!!kategorie) return [3, 3];
                            return [4, this.prisma.kategorien.create({
                                    data: kategorienData,
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        Asset.prototype.create_new_unterkategory = function (subkategorienData, kategorie) {
            return __awaiter(this, void 0, void 0, function () {
                var unterkategorie;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.prisma.unterkategorie.findFirst({
                                where: { unterkategorie_id: subkategorienData.unterkategorie_id },
                            })];
                        case 1:
                            unterkategorie = _a.sent();
                            if (!!unterkategorie) return [3, 3];
                            return [4, this.prisma.unterkategorie.create({
                                    data: __assign(__assign({}, subkategorienData), { kategorien: {
                                            connect: {
                                                kategorie_id: kategorie.kategorie_id,
                                            },
                                        } }),
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        Asset.prototype.read = function () {
            var _this = this;
            this.app.get('/assets', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var project_number, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.allow_communikation_from_all_ip_adress(res);
                            project_number = req.query.project_number;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, this.prisma.assets.findMany({
                                    include: {
                                        artikel: {
                                            include: {
                                                unterkategorie: {
                                                    include: {
                                                        kategorien: true
                                                    }
                                                }
                                            }
                                        }
                                    },
                                }).then(function (assets) {
                                    res.status(200).send(assets);
                                }).catch(function (error) {
                                    res.status(500).send({ "message": error.message });
                                })];
                        case 2:
                            _a.sent();
                            return [3, 4];
                        case 3:
                            error_2 = _a.sent();
                            console.error(error_2);
                            res.status(500).send({ message: error_2.message });
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            }); });
        };
        Asset.prototype.update = function () {
        };
        Asset.prototype.deletee = function () {
        };
        return Asset;
    }(ServerSetup_1.ServerSetup));
    exports.Asset = Asset;
});
//# sourceMappingURL=Asset.js.map