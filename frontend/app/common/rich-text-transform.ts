export type RichTextObject = {
  children: { text: string; bold?: boolean }[];
  type?: "h4" | "h5";
}[];

export function transformRichTextToElements(lines: RichTextObject) {
  const elements: RichTextElement[] = [];
  let startNewParagraph = true;

  for (const line of lines) {
    if (line.type === "h4" || line.type === "h5") {
      elements.push({ type: line.type, richText: [line] });
      startNewParagraph = true;
    } else if (line.children.length === 1 && line.children[0].text === "") {
      startNewParagraph = true;
    } else if (startNewParagraph) {
      elements.push({ type: "p", richText: [line] });
      startNewParagraph = false;
    } else {
      elements[elements.length - 1].richText.push(line);
    }
  }

  return elements;
}

type RichTextElement = {
  type: "p" | "h4" | "h5";
  richText: RichTextObject;
};
