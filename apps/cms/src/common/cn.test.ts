import { cn } from "./cn";
import { expect, test } from "vitest";

test("concatenates the class names", () => {
  const result = cn("class-1", "class-2", "class-3");

  expect(result).toBe("class-1 class-2 class-3");
});

test("filters out falsy values", () => {
  const result = cn("class-1", false, "", null, undefined, "class-2");

  expect(result).toBe("class-1 class-2");
});

test("filters out the boolean 'true'", () => {
  const result = cn("class-1", true, "class-2");

  expect(result).toBe("class-1 class-2");
});

test("transforms truthy properties to class names and discards falsy properties", () => {
  const result = cn("class-1", {
    "class-2": "hello, world",
    "class-3": 0,
    "class-4": "",
    "class-5": false,
    "class-6": true,
  });

  expect(result).toBe("class-1 class-2 class-6");
});
