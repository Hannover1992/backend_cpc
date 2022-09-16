(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@prisma/client"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SmokeTest = void 0;
    var SmokeTest;
    (function (SmokeTest) {
        function helloWorld() {
            return "hello world";
        }
        SmokeTest.helloWorld = helloWorld;
    })(SmokeTest = exports.SmokeTest || (exports.SmokeTest = {}));
    var client_1 = require("@prisma/client");
    var prisma = new client_1.PrismaClient();
    prisma.project.findMany().then(function (projects) {
        console.log(projects);
    });
    prisma.project.findMany({
        where: {
            Id: {
                equals: 1
            }
        }
    }).then(function (products) {
        console.log(products);
    });
});
//# sourceMappingURL=index.js.map