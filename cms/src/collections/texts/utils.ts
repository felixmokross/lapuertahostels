import { createEditor } from "./editor";
import { $getRoot, SerializedEditorState } from "lexical";

export async function richTextToFullText(richText: SerializedEditorState) {
  const editor = await createEditor();

  try {
    editor.update(
      () => {
        editor.setEditorState(editor.parseEditorState(richText));
      },
      { discrete: true }, // This should commit the editor state immediately
    );
  } catch (e) {
    console.error("Failed to update headless editor", e);
  }

  return editor.getEditorState().read(() => $getRoot().getTextContent());
}

export async function richTextToHtml(richText: SerializedEditorState) {
  return "";
}

export async function htmlToRichText(html: string) {
  // return "";
  return null;
}

export function fullTextToTitle(fullText: string) {
  return fullText.length > 80 ? `${fullText.slice(0, 79).trim()}…` : fullText;
}
