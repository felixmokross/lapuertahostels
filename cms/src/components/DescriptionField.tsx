import { FieldDescription } from "@payloadcms/ui";
import { StaticDescription } from "payload";

export type DescriptionFieldProps = {
  path: string;
  description: StaticDescription;
};

export function DescriptionField({ path, description }: DescriptionFieldProps) {
  return (
    <FieldDescription
      path={path}
      description={description}
      marginPlacement="bottom"
    />
  );
}
