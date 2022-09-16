(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mocha", "assert", "../source"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("mocha");
    var assert = require("assert");
    var source_1 = require("../source");
    var helloWorld = source_1.SmokeTest.helloWorld;
    describe("index", function () {
        it("should say 'hello world'", function () {
            assert.equal(helloWorld(), "hello world");
            assert.ok(true);
        });
    });
});
//# sourceMappingURL=index.js.map