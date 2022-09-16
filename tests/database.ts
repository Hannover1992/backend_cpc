import "mocha";
import * as assert from "assert";

before(() => {
    delete_all_data_in_table_projects();
});

after(() => {
    console.log("after");
});

describe("index", () => {

    it("should say 'hello world'", () => {
        assert.equal(true, true);
    });
    //
    it("doesnt should be equal", () => {
        assert.notEqual(true, false);
    });
});

