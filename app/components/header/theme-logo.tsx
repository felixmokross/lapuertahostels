import { type Theme } from "~/common";
import { PuertaLogo } from "../logos/puerta-logo";
import { Link } from "../link";
import { Transition } from "@headlessui/react";
import { AquaLogo } from "../logos/aqua-logo";
import { AzulLogo } from "../logos/azul-logo";

export type ThemeLogoProps = {
  theme: Theme;
};

const logos = {
  puerta: PuertaLogo,
  aqua: AquaLogo,
  azul: AzulLogo,
};

export function ThemeLogo({ theme }: ThemeLogoProps) {
  return (
    <h1 className="relative h-10 w-full">
      <Link to="/">
        {Object.entries(logos).map(([t, Logo]) => (
          <Transition
            key={t}
            as="span"
            className="absolute inset-0 block"
            show={t === theme}
            enter="transition ease-out duration-500"
            enterFrom="-translate-x-3/4 opacity-0"
            enterTo="translate-x-0 opacity-100"
          >
            <Logo size="large" />
          </Transition>
        ))}
      </Link>
    </h1>
  );
}
