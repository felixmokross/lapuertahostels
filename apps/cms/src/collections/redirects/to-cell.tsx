import { DefaultServerCellComponentProps } from "payload";

export async function ToCell({
  cellData,
  payload,
}: DefaultServerCellComponentProps) {
  const page = await payload.findByID({
    collection: "pages",
    id: cellData.page,
  });
  return `${page.pathname}${cellData.queryString ? `?${cellData.queryString}` : ""}${cellData.fragment ? `#${cellData.fragment}` : ""}`;
}
