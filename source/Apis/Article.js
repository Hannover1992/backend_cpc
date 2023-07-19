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
function updateArtikel(projektArtikelData) {
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
}
function updateProjektArtikel(projektArtikelData) {
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
}
//# sourceMappingURL=Article.js.map