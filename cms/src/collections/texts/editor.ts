import {
  BoldFeature,
  defaultEditorConfig,
  FixedToolbarFeature,
  getEnabledNodes,
  HeadingFeature,
  HTMLConverterFeature,
  IndentFeature,
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
  IndentFeature(),

  // TODO this feature doesn't fit in our 'Links' concept, as it already distinguishes between internal and external links
  // by itself. We should either create a custom feature or remove the 'Links' concept to ensure a consistent UX.
  // Also this feature in its current config doesn't allow us to add a fragment or query string – if we stick with it,
  // we should add the respective fields.
  // Also currently we don't support the 'open in new tab' checkbox, should we? External links are already always opened in a new tab.
  LinkFeature({ enabledCollections: ["new-pages"] }),

  FixedToolbarFeature(),

  // TODO remove this once we have migrated to Lexical on all environments
  SlateToLexicalFeature({ disableHooks: true }),
  HTMLConverterFeature({}),
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
