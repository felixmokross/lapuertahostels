import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "bson";
import { CollectionSlug, Data, Field, GlobalSlug, Payload } from "payload";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await migrateGlobal("common", payload);

  await migrateCollection("brands", payload);
  await migrateCollection("banners", payload);
  await migrateCollection("pages", payload);
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // Migration code
}

async function migrateCollection(
  collectionSlug: CollectionSlug,
  payload: Payload,
) {
  console.log(`Collection: ${collectionSlug}`);
  const items = await payload.db.connection
    .collection(collectionSlug)
    .find()
    .toArray();

  for (const item of items) {
    console.log(`Migrating ${collectionSlug}/${item._id}…`);
    const linkEntries = await getLinkEntries(
      payload,
      item,
      payload.collections[collectionSlug].config.fields,
    );

    if (linkEntries.length === 0) {
      console.log("Found no links");
      console.log("");
      continue;
    }

    console.log(`Found ${linkEntries.length} links`);

    const update = {
      $set: Object.fromEntries(
        linkEntries.map(({ path, data }) => [
          path,
          {
            linkType: data.type === "external" ? "custom" : "internal",
            doc: data.page,
            queryString: data.queryString,
            fragment: data.fragment,
            url: data.url,
          } as InlineLink,
        ]),
      ),
    };

    await payload.db.connection
      .collection(collectionSlug)
      .updateOne({ _id: item._id }, update);

    console.log("");
  }

  console.log("");
}

async function migrateGlobal(globalSlug: GlobalSlug, payload: Payload) {
  console.log(`Global: ${globalSlug}`);
  const global = await payload.db.connection
    .collection("globals")
    .findOne({ globalType: globalSlug });

  if (!global) throw new Error(`Global ${globalSlug} not found`);

  const globalConfig = payload.globals.config.find(
    (c) => c.slug === globalSlug,
  );
  if (!globalConfig) throw new Error(`Global config ${globalSlug} not found`);

  console.log(`Migrating ${globalSlug}…`);
  const linkEntries = await getLinkEntries(
    payload,
    global,
    globalConfig.fields,
  );

  if (linkEntries.length === 0) {
    console.log("Found no links");
    console.log("");
    return;
  }

  console.log(`Found ${linkEntries.length} links`);

  const update = {
    $set: Object.fromEntries(
      linkEntries.map(({ path, data }) => [
        path,
        {
          linkType: data.type === "external" ? "custom" : "internal",
          doc: data.page,
          queryString: data.queryString,
          fragment: data.fragment,
          url: data.url,
        } as InlineLink,
      ]),
    ),
  };

  await payload.db.connection
    .collection("globals")
    .updateOne({ _id: global._id }, update);

  console.log("");
}

type LinkEntry = {
  path: string;
  data: {
    type: "internal" | "external";
    page?: ObjectId;
    queryString?: string;
    fragment?: string;
    url?: string;
  };
};

type InlineLink = {
  linkType: "custom" | "internal";
  doc?: ObjectId | null;
  queryString?: string | null;
  fragment?: string | null;
  url?: string | null;
};

async function getLinkEntries(
  payload: Payload,
  data: Data,
  fields: Field[],
  basePath: string = "",
  links: LinkEntry[] = [],
) {
  for (const field of fields) {
    if (
      "name" in field &&
      (field.name === "link" || field.name === "homeLink") &&
      field.type === "group"
    ) {
      const id = data[field.name] as ObjectId;
      if (id) {
        const linkData = await payload.db.connection
          .collection<LinkEntry["data"]>("links")
          .findOne({ _id: id });
        if (!linkData) throw new Error("Link not found");
        links.push({
          path: joinPath(basePath, field.name),
          data: linkData,
        });
      }
    } else if (field.type === "blocks") {
      const blocks = data[field.name] as Data[] | undefined;
      if (blocks) {
        for (const [i, block] of blocks.entries()) {
          const blockConfig = field.blocks.find(
            (b) => b.slug === block.blockType,
          );

          if (!blockConfig) {
            throw new Error(
              `Block type ${block.blockType} not found in config`,
            );
          }
          await getLinkEntries(
            payload,
            block,
            blockConfig.fields,
            joinPath(basePath, joinPath(field.name, i.toString())),
            links,
          );
        }
      }
    } else if (field.type === "tabs") {
      for (const tab of field.tabs) {
        await getLinkEntries(
          payload,
          "name" in tab ? data[tab.name] : data,
          tab.fields,
          "name" in tab ? joinPath(basePath, tab.name) : basePath,
          links,
        );
      }
    } else if (field.type === "array") {
      for (const [i, item] of data[field.name].entries()) {
        await getLinkEntries(
          payload,
          item,
          field.fields,
          joinPath(basePath, joinPath(field.name, i.toString())),
          links,
        );
      }
    } else if (field.type === "group") {
      await getLinkEntries(
        payload,
        data[field.name],
        field.fields,
        joinPath(basePath, field.name),
        links,
      );
    }
  }

  return links;
}

function joinPath(basePath: string, path: string) {
  return basePath ? `${basePath}.${path}` : path;
}
