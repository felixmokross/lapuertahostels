import { FieldDescription } from "@payloadcms/ui";
export type CustomDescriptionProps = {
  custom: {
    description: string;
  };
};

export function CustomDescription({ custom }: CustomDescriptionProps) {
  // TODO ?
  return <FieldDescription path="" description={custom.description} />;
}
