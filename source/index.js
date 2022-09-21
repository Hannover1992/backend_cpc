(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./project"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var project_1 = require("./project");
    var express = require("express");
    var app = express();
    var port = 8080;
    var project = new project_1.Project(1, "my-project");
    var name = project.name;
    app.get("/", function (req, res) {
    });
    app.listen(port, function () {
        console.log("server started at http://localhost:".concat(port));
    });
});
//# sourceMappingURL=index.js.map