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
    exports.generate_test_project = exports.Project = void 0;
    var Project = (function () {
        function Project(prisma, ID, Standort, Niederlassung, Auftragsart, Status, Logistikkoordinator, LK_1, LK_2, ZuKo, Auftragsdatum, Startdatum, Endtermin, Netto_Auftragswert, Kommentar, Anlagenummer, PM_1, PM_2) {
            this.prisma = prisma;
            this.ID = ID;
            this.Standort = Standort || "";
            this.Niederlassung = Niederlassung || "";
            this.Auftragsart = Auftragsart || "";
            this.Status = Status || "";
            this.Logistikkoordinator = Logistikkoordinator || "";
            this.LK_1 = LK_1 || "";
            this.LK_2 = LK_2 || "";
            this.ZuKo = ZuKo || "";
            this.Auftragsdatum = Auftragsdatum || new Date(0);
            this.Startdatum = Startdatum || new Date(0);
            this.Endtermin = Endtermin || new Date(0);
            this.Netto_Auftragswert = Netto_Auftragswert || "";
            this.Kommentar = Kommentar || "";
            this.Anlagenummer = Anlagenummer || 0;
            this.PM_1 = PM_1 || "";
            this.PM_2 = PM_2 || "";
        }
        Object.defineProperty(Project.prototype, "Endtermin", {
            get: function () {
                return this._Endtermin;
            },
            set: function (value) {
                this._Endtermin = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "PM_2", {
            get: function () {
                return this._PM_2;
            },
            set: function (value) {
                this._PM_2 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "PM_1", {
            get: function () {
                return this._PM_1;
            },
            set: function (value) {
                this._PM_1 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Anlagenummer", {
            get: function () {
                return this._Anlagenummer;
            },
            set: function (value) {
                this._Anlagenummer = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Kommentar", {
            get: function () {
                return this._Kommentar;
            },
            set: function (value) {
                this._Kommentar = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Netto_Auftragswert", {
            get: function () {
                return this._Netto_Auftragswert;
            },
            set: function (value) {
                this._Netto_Auftragswert = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Startdatum", {
            get: function () {
                return this._Startdatum;
            },
            set: function (value) {
                this._Startdatum = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Auftragsdatum", {
            get: function () {
                return this._Auftragsdatum;
            },
            set: function (value) {
                this._Auftragsdatum = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "ZuKo", {
            get: function () {
                return this._ZuKo;
            },
            set: function (value) {
                this._ZuKo = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "LK_2", {
            get: function () {
                return this._LK_2;
            },
            set: function (value) {
                this._LK_2 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "LK_1", {
            get: function () {
                return this._LK_1;
            },
            set: function (value) {
                this._LK_1 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Logistikkoordinator", {
            get: function () {
                return this._Logistikkoordinator;
            },
            set: function (value) {
                this._Logistikkoordinator = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Status", {
            get: function () {
                return this._Status;
            },
            set: function (value) {
                this._Status = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Auftragsart", {
            get: function () {
                return this._Auftragsart;
            },
            set: function (value) {
                this._Auftragsart = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Niederlassung", {
            get: function () {
                return this._Niederlassung;
            },
            set: function (value) {
                this._Niederlassung = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "Standort", {
            get: function () {
                return this._Standort;
            },
            set: function (value) {
                this._Standort = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "ID", {
            get: function () {
                return this._ID;
            },
            set: function (value) {
                this._ID = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Project.prototype, "prisma", {
            get: function () {
                return this._prisma;
            },
            set: function (value) {
                this._prisma = value;
            },
            enumerable: false,
            configurable: true
        });
        Project.prototype.create = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.prisma.tblprojekte.create({
                                data: {
                                    ID: this.ID,
                                    Standort: this.Standort || "",
                                    Niederlassung: this.Niederlassung || "",
                                    Auftragsart: this.Auftragsart || "",
                                    Status: this.Status || "",
                                    Logistikkoordinator: this.Logistikkoordinator || "",
                                    LK_1: this.LK_1 || "",
                                    LK_2: this.LK_2 || "",
                                    ZuKo: this.ZuKo || "",
                                    Auftragsdatum: this.Auftragsdatum || "",
                                    Startdatum: this.Startdatum || "",
                                    Endtermin: this.Endtermin || "",
                                    Netto_Auftragswert: this.Netto_Auftragswert || "",
                                    Kommentar: this.Kommentar || "",
                                    Anlagenummer: this.Anlagenummer || 0,
                                    PM_1: this.PM_1 || "",
                                    PM_2: this.PM_2 || "",
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Project.prototype.read = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this._prisma.tblprojekte.findMany({
                                where: {
                                    ID: id || this.ID
                                }
                            }).then(function (result) {
                                if (result.length > 0) {
                                    _this.Standort = result[0].Standort;
                                    _this.Niederlassung = result[0].Niederlassung;
                                    _this.Auftragsart = result[0].Auftragsart;
                                    _this.Status = result[0].Status;
                                    _this.Logistikkoordinator = result[0].Logistikkoordinator;
                                    _this.LK_1 = result[0].LK_1;
                                    _this.LK_2 = result[0].LK_2;
                                    _this.ZuKo = result[0].ZuKo;
                                    _this.Auftragsdatum = result[0].Auftragsdatum;
                                    _this.Startdatum = result[0].Startdatum;
                                    _this.Endtermin = result[0].Endtermin;
                                    _this.Netto_Auftragswert = result[0].Netto_Auftragswert;
                                    _this.Kommentar = result[0].Kommentar;
                                    _this.Anlagenummer = result[0].Anlagenummer;
                                    _this.PM_1 = result[0].PM_1;
                                    _this.PM_2 = result[0].PM_2;
                                }
                                else {
                                    throw new Error("Project not found in db");
                                }
                            }).catch(function () {
                                throw new Error("Project not found in db");
                            })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Project.prototype.update = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this._prisma.tblprojekte.update({
                                where: {
                                    ID: this.ID
                                },
                                data: {
                                    Standort: this.Standort,
                                    Niederlassung: this.Niederlassung,
                                    Auftragsart: this.Auftragsart,
                                    Status: this.Status,
                                    Logistikkoordinator: this.Logistikkoordinator,
                                    LK_1: this.LK_1,
                                    LK_2: this.LK_2,
                                    ZuKo: this.ZuKo,
                                    Auftragsdatum: this.Auftragsdatum,
                                    Startdatum: this.Startdatum,
                                    Endtermin: this.Endtermin,
                                    Netto_Auftragswert: this.Netto_Auftragswert,
                                    Kommentar: this.Kommentar,
                                    Anlagenummer: this.Anlagenummer,
                                    PM_1: this.PM_1,
                                    PM_2: this.PM_2,
                                }
                            }).then(function (result) {
                                console.log("updated");
                            })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Project.prototype.delete = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this._prisma.tblprojekte.delete({
                                where: {
                                    ID: this.ID
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Project.prototype.project_exists_in_db = function () {
            return __awaiter(this, void 0, void 0, function () {
                var users;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this._prisma.tblprojekte.findMany({
                                where: {
                                    ID: this.ID,
                                    Standort: this.Standort,
                                    Niederlassung: this.Niederlassung,
                                    Auftragsart: this.Auftragsart,
                                    Status: this.Status,
                                    Logistikkoordinator: this.Logistikkoordinator,
                                    LK_1: this.LK_1,
                                    LK_2: this.LK_2,
                                    ZuKo: this.ZuKo,
                                    Auftragsdatum: this.Auftragsdatum,
                                    Startdatum: this.Startdatum,
                                    Endtermin: this.Endtermin,
                                    Netto_Auftragswert: this.Netto_Auftragswert,
                                    Kommentar: this.Kommentar,
                                    Anlagenummer: this.Anlagenummer,
                                    PM_1: this.PM_1,
                                    PM_2: this.PM_2,
                                }
                            })];
                        case 1:
                            users = _a.sent();
                            return [2, users.length > 0];
                    }
                });
            });
        };
        Project.prototype.get_ready_to_send_over_rest_api = function () {
            return {
                Prisma: null,
                ID: this.ID,
                Standort: this.Standort,
                Niederlassung: this.Niederlassung,
                Auftragsart: this.Auftragsart,
                Status: this.Status,
                Logistikkoordinator: this.Logistikkoordinator,
                LK_1: this.LK_1,
                LK_2: this.LK_2,
                ZuKo: this.ZuKo,
                Auftragsdatum: this.Auftragsdatum,
                Startdatum: this.Startdatum,
                Endtermin: this.Endtermin,
                Netto_Auftragswert: this.Netto_Auftragswert,
                Kommentar: this.Kommentar,
                Anlagenummer: this.Anlagenummer,
                PM_1: this.PM_1,
                PM_2: this.PM_2,
            };
        };
        return Project;
    }());
    exports.Project = Project;
    function generate_test_project(prisma, i) {
        var random_komments_rick_and_morty = [
            "I'm Pickle Rick!",
            "Wubba Lubba Dub Dub!",
            "I'm Mr. Meeseeks, look at me!",
            "Sometimes science is a lot more art, than science. A lot of people don't get that.",
            " I'm not a scientist. I'm a mad scientist.",
            "I did it. Your parents are going to do it. Break the cycle Morty, rise above, focus on science.",
            "Having a family doesn't mean that you stop being an individual.",
            "Great, now I have to take over an entire planet because of your stupid boobs.",
        ];
        var project = new Project(prisma, i);
        project.Standort = "Standort" + i;
        project.Niederlassung = "Niederlassung" + i;
        project.Auftragsart = "Auftragsart" + i;
        project.Status = "Status" + i;
        project.Logistikkoordinator = "Logistikkoordinator" + i;
        project.LK_1 = "LK_1" + i;
        project.LK_2 = "LK_2" + i;
        project.ZuKo = "ZuKo" + i;
        project.Auftragsdatum = new Date(i);
        project.Startdatum = new Date(i);
        project.Endtermin = new Date(i);
        project.Netto_Auftragswert = "Netto_Auftragswert" + i;
        project.Kommentar = random_komments_rick_and_morty[i % random_komments_rick_and_morty.length];
        project.Anlagenummer = i;
        project.PM_1 = "PM_1" + i;
        project.PM_2 = "PM_2" + i;
        return project;
    }
    exports.generate_test_project = generate_test_project;
});
//# sourceMappingURL=project.js.map