import { expect, test } from "vitest";
import { transformRichTextToElements } from "./rich-text-transform";

test("transforms rich text correctly into elements", () => {
  const line1 = {
    children: [{ text: "Hello, " }, { text: "world!", bold: true }],
  };

  const line2 = { type: "h4", children: [{ text: "Heading Level 4" }] };
  const line3 = { children: [{ text: "Another paragraph" }] };
  const line4 = { children: [{ text: "Same paragraph" }] };
  const line5 = { children: [{ text: "" }] };
  const line6 = { children: [{ text: "Third paragraph" }] };
  const line7 = { type: "h5", children: [{ text: "Heading Level 5" }] };

  const result = transformRichTextToElements([
    line1,
    line2,
    line3,
    line4,
    line5,
    line6,
    line7,
  ]);

  expect(result).toEqual([
    { type: "p", richText: [line1] },
    { type: "h4", richText: [line2] },
    { type: "p", richText: [line3, line4] },
    { type: "p", richText: [line6] },
    { type: "h5", richText: [line7] },
  ]);
});
