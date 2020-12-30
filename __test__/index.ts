import { sayHello } from "../index";

describe("index", () => {
  test("should say heelo", () => {
    expect(sayHello()).toBe("Hello");
  });
});
