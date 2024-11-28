import { Text } from "@/payload-types";
import { Usage } from "./usages";
import { FieldDescription } from "@payloadcms/ui";

export function UsageCountField({ path, data }: { path: string; data: Text }) {
  return (
    <FieldDescription
      path={path}
      // TODO add translation (how can we interpolate in a Server Component?)
      description={`${(data.usages as Usage[]).length} usages`}
      marginPlacement="top"
    />
  );
}
