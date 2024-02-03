import { cn } from "../classnames";
import { Image } from "../image";

export type PuertaLogoProps = {
  size: "small" | "large";
};

export function PuertaLogo({ size }: PuertaLogoProps) {
  return (
    <span
      className={cn("flex items-center font-serif uppercase text-neutral-900", {
        "gap-2 text-base tracking-wider": size === "small",
        "gap-4 text-2xl tracking-wide": size === "large",
      })}
    >
      <Image
        className={cn({
          "h-7": size === "small",
          "h-10": size === "large",
        })}
        src={`logos/logo-puerta-simple.png?updatedAt=1703906701749&tr=${
          {
            small: "h-56",
            large: "h-80",
          }[size]
        }`}
        alt="La Puerta Hostels Logo"
      />
      <>La Puerta Hostels</>
    </span>
  );
}
