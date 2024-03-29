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
        define(["require", "exports", "@jest/globals", "../source/Apis/Project", "../source/Apis/ProjectTable", "supertest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals_1 = require("@jest/globals");
    var Project_1 = require("../source/Apis/Project");
    var ProjectTable_1 = require("../source/Apis/ProjectTable");
    var supertest_1 = require("supertest");
    (0, globals_1.describe)('CRUD', function () {
        var project;
        var projectTable;
        var request;
        var body_1 = {
            ID: 1,
            Anlagenummer: 1,
            Auftragsart: "Auftragsart1",
            Standort: "Standort1",
            Niederlassung: "Niederlassung1",
            Status: "Status1",
            Auftragsdatum: new Date(),
            Startdatum: new Date(),
            Endtermin: new Date(),
            Netto_Auftragswert: "Netto",
            Kommentar: "Around the survivors a perimeter create.",
            Logistikkoordinator: "Logistikkoordinator1",
            LK_1: "LK_11",
            LK_2: "LK_21",
            ZuKo: "ZuKo1",
            PM_1: "PM_11",
            PM_2: "PM_21"
        };
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var supertest, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        project = new Project_1.Project();
                        projectTable = new ProjectTable_1.ProjectTable();
                        supertest = require('supertest');
                        request = supertest(project.app);
                        return [4, projectTable.deletee()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        }); });
        it('test CRUD', function () { return __awaiter(void 0, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, projectTable.deletee()];
                    case 1:
                        _a.sent();
                        request = (0, supertest_1.default)(project.app);
                        return [4, request.post('/project/1')
                                .send(body_1)
                                .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            expect(response.status).toBe(200);
                                            expect(response.body.message).toBe("Project created");
                                            return [4, request.get('/project/1').then(function (data) {
                                                    expect(data.status).toBe(200);
                                                    expect(data.body.ID).toBe(1);
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [4, projectTable.deletee()];
                                        case 2:
                                            _a.sent();
                                            return [4, request.get('/project/1').then(function (data) {
                                                    expect(data.body).toStrictEqual({});
                                                })];
                                        case 3:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it('test Update', function () { return __awaiter(void 0, void 0, void 0, function () {
            var request, updatedBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = (0, supertest_1.default)(project.app);
                        return [4, request.post('/project/1')
                                .send(body_1)
                                .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    expect(response.status).toBe(200);
                                    expect(response.body.message).toBe("Project created");
                                    return [2];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        updatedBody = body_1;
                        updatedBody.LK_1 = "LK_22";
                        return [4, request.put('/project/1')
                                .send(updatedBody)
                                .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    expect(response.status).toBe(200);
                                    expect(response.body.message).toBe("Project updated");
                                    return [2];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [4, request.get('/project/1')
                                .then(function (data) {
                                expect(data.status).toBe(200);
                                expect(data.body.ID).toBe(1);
                                expect(data.body.LK_1).toBe('LK_22');
                            })];
                    case 3:
                        _a.sent();
                        return [4, projectTable.deletee()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        }); });
    });
});
//# sourceMappingURL=database.test.js.map