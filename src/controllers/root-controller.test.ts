import { getHello } from "./root-controller.js";

describe("helloController", () => {
  describe("getHello", () => {
    it("should return Hello World!", () => {
      expect(getHello()).toEqual("Hello World!");
    });
  });
});
