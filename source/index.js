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
    exports.SmokeTest = void 0;
    var SmokeTest;
    (function (SmokeTest) {
        function helloWorld() {
            return "hello world";
        }
        SmokeTest.helloWorld = helloWorld;
    })(SmokeTest = exports.SmokeTest || (exports.SmokeTest = {}));
});
//# sourceMappingURL=index.js.map