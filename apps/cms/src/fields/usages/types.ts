import { CollectionSlug, GlobalSlug } from "payload";

export type RelationshipFieldType = "relationship" | "upload";

export type UsagesConfig = {
  fieldType: RelationshipFieldType;
  collectionToFind: CollectionSlug;
  collections?: CollectionSlug[];
  globals?: GlobalSlug[];
};
