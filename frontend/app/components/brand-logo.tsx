import { Brand } from "~/payload-types";
import { BrandId, brands } from "../brands";
import { cn } from "./cn";
import { Image } from "./image";

export type BrandLogoProps = {
  size: "small" | "large";
  brand: Pick<Brand, "id" | "logoUrl" | "name">;
  type?: "with-wordmark" | "simple";
  className?: string;
};

export function BrandLogo({
  size,
  brand,
  type = "with-wordmark",
  className,
}: BrandLogoProps) {
  const brandConfig = brands[brand.id as BrandId];
  return (
    <span
      className={cn(
        "flex items-center text-nowrap font-serif uppercase",
        brandConfig.logoTextColor,
        {
          "gap-2 text-base tracking-wider": size === "small",
          "gap-4 text-2xl tracking-wide": size === "large",
        },
        className,
      )}
    >
      <Image
        className={cn({
          "h-7": size === "small",
          "h-10": size === "large",
        })}
        src={brand.logoUrl}
        alt={`${brand.name} Logo`}
        transformation={{
          height: size === "small" ? 56 : size === "large" ? 80 : undefined,
        }}
      />
      {type === "with-wordmark" && brand.name}
    </span>
  );
}
