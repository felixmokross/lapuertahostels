import { Brand } from "@lapuertahostels/shared";
import { type BrandId } from "../brands";
import { cn } from "./cn";
import { themesByBrand } from "~/themes";
import { MediaImage } from "./media";

export type BrandLogoProps = {
  size: "small" | "large";
  brand: Brand;
  type?: "with-wordmark" | "simple";
  className?: string;
};

export function BrandLogo({
  size,
  brand,
  type = "with-wordmark",
  className,
}: BrandLogoProps) {
  const theme = themesByBrand[brand.id as BrandId];
  return (
    <span
      className={cn(
        "flex items-center text-nowrap font-serif uppercase",
        theme.logoTextColor,
        {
          "gap-2 text-base tracking-wider": size === "small",
          "gap-4 text-2xl tracking-wide": size === "large",
        },
        className,
      )}
    >
      <MediaImage
        className={cn({
          "h-7": size === "small",
          "h-10": size === "large",
        })}
        media={brand.logo}
        transformation={{
          height: size === "small" ? 28 : size === "large" ? 40 : undefined,
        }}
        layout="fixed"
      />
      {type === "with-wordmark" && brand.name}
    </span>
  );
}
