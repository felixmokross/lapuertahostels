import { cn } from "./classnames";
import { Image } from "./image";

export type AzulLogoProps = {
  size: "small" | "large";
};

export function AzulLogo({ size }: AzulLogoProps) {
  return (
    <span
      className={cn("flex items-center font-serif uppercase text-azul-900", {
        "gap-2 text-base tracking-wider": size === "small",
        "gap-4 text-2xl tracking-wide": size === "large",
      })}
    >
      <Image
        className={cn({
          "h-7": size === "small",
          "h-10": size === "large",
        })}
        src={`logos/logo-azul-simple.png?updatedAt=1703915175439&tr=${
          {
            small: "h-56",
            large: "h-80",
          }[size]
        }`}
        alt="La Puerta Azul Logo"
      />
      <>La Puerta Azul</>
    </span>
  );
}
