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
    exports.get_id_from_request = void 0;
    function get_id_from_request(req) {
        var id = parseInt(req.params.id);
        return id;
    }
    exports.get_id_from_request = get_id_from_request;
});
//# sourceMappingURL=string_manipulation.js.map