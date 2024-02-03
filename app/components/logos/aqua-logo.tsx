import { cn } from "../classnames";
import { Image } from "../image";

export type AquaLogoProps = {
  size: "small" | "large";
};

export function AquaLogo({ size }: AquaLogoProps) {
  return (
    <span
      className={cn("flex items-center font-serif uppercase text-aqua-600", {
        "gap-2 text-base tracking-wider": size === "small",
        "gap-4 text-2xl tracking-wide": size === "large",
      })}
    >
      <Image
        className={cn({
          "h-7": size === "small",
          "h-10": size === "large",
        })}
        src={`logos/logo-aqua-simple.png?updatedAt=1703915191239&tr=${
          {
            small: "h-56",
            large: "h-80",
          }[size]
        }`}
        alt="Puerta Aqua Logo"
      />
      <>Puerta Aqua</>
    </span>
  );
}
