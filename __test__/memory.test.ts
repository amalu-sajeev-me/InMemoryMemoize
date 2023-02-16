import { doesNotThrow, throws } from "assert/strict";
import { InMemoryMemoize } from "../index";

describe("memoization memory tests", () => {
  it("should create a new instances", () => {
    doesNotThrow(() => {
      new InMemoryMemoize("user");
    });
    throws(() => {
      new InMemoryMemoize("user");
    });
  });
});
