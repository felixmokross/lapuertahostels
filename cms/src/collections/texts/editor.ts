import {
  defaultEditorConfig,
  defaultEditorFeatures,
  getEnabledNodes,
  lexicalEditor,
  sanitizeServerEditorConfig,
} from "@payloadcms/richtext-lexical";
import { SlateToLexicalFeature } from "@payloadcms/richtext-lexical/migrate";
import { createHeadlessEditor } from "@lexical/headless";
import payloadConfig from "@/payload.config";

// TODO remove this once we have migrated to Lexical on all environments
const customFeatures = [SlateToLexicalFeature({ disableHooks: true })];

export function editor() {
  return lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, ...customFeatures],
  });
}

export async function createEditor() {
  return createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: await sanitizeServerEditorConfig(
        {
          ...defaultEditorConfig,
          features: [...defaultEditorFeatures, ...customFeatures],
        },
        await payloadConfig,
      ),
    }),
  });
}
