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
    exports.ProjectTable = void 0;
    var ServerSetup_1 = require("../ServerSetup");
    var ProjectTable = (function (_super) {
        __extends(ProjectTable, _super);
        function ProjectTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ProjectTable.prototype.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        ProjectTable.prototype.read = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.app.get('/projects', function (req, res) {
                _this.allow_communikation_from_all_ip_adress(res);
                _this.prisma.tblprojekte.findMany().
                    then(function (projects) {
                    res.status(200).send(projects);
                }).catch(function (error) {
                    res.status(500).send({ "message": error.message });
                });
            });
        };
        ProjectTable.prototype.deletee = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.prisma.tblprojekte.deleteMany();
        };
        ProjectTable.prototype.update = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        return ProjectTable;
    }(ServerSetup_1.ServerSetup));
    exports.ProjectTable = ProjectTable;
});
//# sourceMappingURL=ProjectTable.js.map