import "mocha";
import * as assert from "assert";
import {Database} from "../source/database";

before(() => {
    console.log("bevor");
});

after(() => {
    console.log("after");
});


describe("test if connection can be establiesched to database", () => {
    it("should say 'connec to database'", () => {
        assert.equal(true, true);
    });
    //
});

