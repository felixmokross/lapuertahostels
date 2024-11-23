import {
  defaultEditorConfig,
  defaultEditorFeatures,
  FixedToolbarFeature,
  getEnabledNodes,
  lexicalEditor,
  sanitizeServerEditorConfig,
} from "@payloadcms/richtext-lexical";
import { SlateToLexicalFeature } from "@payloadcms/richtext-lexical/migrate";
import { createHeadlessEditor } from "@lexical/headless";
import payloadConfig from "@/payload.config";

// TODO remove this once we have migrated to Lexical on all environments
const customFeatures = [
  SlateToLexicalFeature({ disableHooks: true }),
  FixedToolbarFeature(),
];

export async function getEditorConfig() {
  return await sanitizeServerEditorConfig(
    {
      ...defaultEditorConfig,
      features: [...defaultEditorFeatures, ...customFeatures],
    },
    await payloadConfig,
  );
}

export function editor() {
  return lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, ...customFeatures],
  });
}

export async function createEditor() {
  return createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: await getEditorConfig(),
    }),
  });
}
