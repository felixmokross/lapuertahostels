import {
  BoldFeature,
  defaultEditorConfig,
  getEnabledNodes,
  HeadingFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
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
import { createHeadlessEditor } from "@payloadcms/richtext-lexical/lexical/headless";
import payloadConfig from "@/payload.config";
import { queryStringAndFragmentField } from "@/fields/link";

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
  LinkFeature({
    enabledCollections: ["pages"],
    fields: ({ defaultFields }) => [
      // Not using the 'newTab' field, as our external links are automatically opened in a new tab and for internal we don't want this (yet).
      ...defaultFields.filter((f) => f.name !== "newTab"),
      queryStringAndFragmentField(),
    ],
  }),

  InlineToolbarFeature(),
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
