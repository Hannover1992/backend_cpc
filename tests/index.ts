import "mocha";
import * as assert from "assert";
import {SmokeTest} from "../source";
import helloWorld = SmokeTest.helloWorld;

describe("index", () => {
    it("should say 'hello world'", () => {
        assert.equal(helloWorld(), "hello world");
        assert.ok(true);
    });
});