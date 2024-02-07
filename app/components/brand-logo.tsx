import { Brand, brands } from "../brands";
import { cn } from "./cn";
import { Image } from "./image";

export type BrandLogoProps = {
  size: "small" | "large";
  brand: Brand;
};

export function BrandLogo({ size, brand }: BrandLogoProps) {
  const brandConfig = brands[brand];
  return (
    <span
      className={cn(
        "flex items-center font-serif uppercase",
        brandConfig.logoTextColor,
        {
          "gap-2 text-base tracking-wider": size === "small",
          "gap-4 text-2xl tracking-wide": size === "large",
        },
      )}
    >
      <Image
        className={cn({
          "h-7": size === "small",
          "h-10": size === "large",
        })}
        src={`${brandConfig.logoUrl}&tr=${
          {
            small: "h-56",
            large: "h-80",
          }[size]
        }`}
        alt={`${brandConfig.name} Logo`}
      />
      {brandConfig.name}
    </span>
  );
}
