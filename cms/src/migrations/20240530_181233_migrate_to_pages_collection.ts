import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const pageGlobals = await payload.db.connection.db
    .collection("globals")
    .find({ globalType: { $in: ["home", "azul", "aqua"] } })
    .toArray();

  for (const pageGlobal of pageGlobals) {
    const { _id, globalType, ...pageData } = pageGlobal;
    await payload.db.connection.db.collection("pages").insertOne({
      _id: globalType,
      url: getUrlForPage(globalType),
      ...pageData,
    });

    await payload.db.connection.db
      .collection("globals")
      .deleteOne({ globalType });
  }
}

function getUrlForPage(globalType: "home" | "azul" | "aqua") {
  switch (globalType) {
    case "home":
      return "/";
    case "azul":
      return "/azul";
    case "aqua":
      return "/aqua";
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
