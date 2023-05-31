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
    var client_1 = require("@prisma/client");
    var prisma = new client_1.PrismaClient();
    var kategorie_id = 1;
    var unterkategorie_id = 1;
    var projekt_id = 802007;
    var menge = 10;
    var artikel = prisma.artikel.create({
        data: {
            artikelname: "with asset Kabel",
            unterkategorie_id: unterkategorie_id,
        }
    }).then(function (artikel) {
        var artikel_id = artikel.artikel_id;
        return prisma.projekt_artikel.create({
            data: {
                projekt_id: projekt_id,
                artikel_id: artikel_id,
                menge: menge
            }
        }).then(function (projekt_artikel_newely_created) {
            console.log(projekt_artikel_newely_created);
            return prisma.assets.create({
                data: {
                    ID: projekt_artikel_newely_created.artikel_id,
                    Inventarnummer: 123456,
                }
            });
        });
    });
});
//# sourceMappingURL=new_artiekl.js.map