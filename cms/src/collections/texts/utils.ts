import {
  consolidateHTMLConverters,
  convertLexicalToHTML,
} from "@payloadcms/richtext-lexical";
import { createEditor, getEditorConfig } from "./editor";
import { $getRoot, $getSelection, SerializedEditorState } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import { JSDOM } from "jsdom";

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
  return await convertLexicalToHTML({
    converters: consolidateHTMLConverters({
      editorConfig: await getEditorConfig(),
    }),
    data: richText,
  });
}

export async function htmlToRichText(html: string) {
  const editor = await createEditor();
  editor.update(
    () => {
      const dom = new JSDOM(html);

      const nodes = $generateNodesFromDOM(editor, dom.window.document);

      $getRoot().select();

      const selection = $getSelection();
      if (!selection) throw new Error("No selection");

      selection.insertNodes(nodes);
    },
    { discrete: true },
  );

  return editor.getEditorState().toJSON();
}

export function fullTextToTitle(fullText: string) {
  return fullText.length > 80 ? `${fullText.slice(0, 79).trim()}…` : fullText;
}
