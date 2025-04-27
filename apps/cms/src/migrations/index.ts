import * as migration_20241229_110109_rename_pages_collection from "./20241229_110109_rename_pages_collection";
import * as migration_20250412_113904_inline_banner_texts from "./20250412_113904_inline_banner_texts";
import * as migration_20250412_233818_inline_all_texts from "./20250412_233818_inline_all_texts";
import * as migration_20250420_151225_recreate_pages_indexes from "./20250420_151225_recreate_pages_indexes";
import * as migration_20250420_170045_pathname_localized from "./20250420_170045_pathname_localized";
import * as migration_20250421_184948_fix_localized_text_fields from "./20250421_184948_fix_localized_text_fields";
import * as migration_20250424_201434_inline_links from "./20250424_201434_inline_links";

export const migrations = [
  {
    up: migration_20241229_110109_rename_pages_collection.up,
    down: migration_20241229_110109_rename_pages_collection.down,
    name: "20241229_110109_rename_pages_collection",
  },
  {
    up: migration_20250412_113904_inline_banner_texts.up,
    down: migration_20250412_113904_inline_banner_texts.down,
    name: "20250412_113904_inline_banner_texts",
  },
  {
    up: migration_20250412_233818_inline_all_texts.up,
    down: migration_20250412_233818_inline_all_texts.down,
    name: "20250412_233818_inline_all_texts",
  },
  {
    up: migration_20250420_151225_recreate_pages_indexes.up,
    down: migration_20250420_151225_recreate_pages_indexes.down,
    name: "20250420_151225_recreate_pages_indexes",
  },
  {
    up: migration_20250420_170045_pathname_localized.up,
    down: migration_20250420_170045_pathname_localized.down,
    name: "20250420_170045_pathname_localized",
  },
  {
    up: migration_20250421_184948_fix_localized_text_fields.up,
    down: migration_20250421_184948_fix_localized_text_fields.down,
    name: "20250421_184948_fix_localized_text_fields",
  },
  {
    up: migration_20250424_201434_inline_links.up,
    down: migration_20250424_201434_inline_links.down,
    name: "20250424_201434_inline_links",
  },
];
