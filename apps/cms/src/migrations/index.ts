import * as migration_20250412_113904_inline_banner_texts from "./20250412_113904_inline_banner_texts";
import * as migration_20250412_233818_inline_all_texts from "./20250412_233818_inline_all_texts";
import * as migration_20250420_151225_recreate_pages_indexes from "./20250420_151225_recreate_pages_indexes";
import * as migration_20250420_170045_pathname_localized from "./20250420_170045_pathname_localized";
import * as migration_20250421_184948_fix_localized_text_fields from "./20250421_184948_fix_localized_text_fields";
import * as migration_20250424_201434_inline_links from "./20250424_201434_inline_links";
import * as migration_20250502_171326_rename_layout_to_content from "./20250502_171326_rename_layout_to_content";
import * as migration_20250502_174357_move_map_settings from "./20250502_174357_move_map_settings";

export const migrations = [
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
  {
    up: migration_20250502_171326_rename_layout_to_content.up,
    down: migration_20250502_171326_rename_layout_to_content.down,
    name: "20250502_171326_rename_layout_to_content",
  },
  {
    up: migration_20250502_174357_move_map_settings.up,
    down: migration_20250502_174357_move_map_settings.down,
    name: "20250502_174357_move_map_settings",
  },
];
