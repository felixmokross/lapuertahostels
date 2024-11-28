import {
  BoldFeature,
  defaultEditorConfig,
  FixedToolbarFeature,
  getEnabledNodes,
  HeadingFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  sanitizeServerEditorConfig,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import { SlateToLexicalFeature } from "@payloadcms/richtext-lexical/migrate";
import { createHeadlessEditor } from "@lexical/headless";
import payloadConfig from "@/payload.config";

const features = [
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  StrikethroughFeature(),
  InlineCodeFeature(),
  ParagraphFeature(),
  HeadingFeature({ enabledHeadingSizes: ["h4", "h5"] }),
  UnorderedListFeature(),
  OrderedListFeature(),
  LinkFeature({ enabledCollections: ["links"] }),
  FixedToolbarFeature(),

  // TODO remove this once we have migrated to Lexical on all environments
  SlateToLexicalFeature({ disableHooks: true }),
];

export async function getEditorConfig() {
  return await sanitizeServerEditorConfig(
    {
      ...defaultEditorConfig,
      features,
    },
    await payloadConfig,
  );
}

export function editor() {
  return lexicalEditor({ features });
}

export async function createEditor() {
  return createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: await getEditorConfig(),
    }),
  });
}
