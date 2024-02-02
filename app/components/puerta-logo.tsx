import { Image } from "./image";

export function PuertaLogo() {
  return (
    <span className="flex items-center gap-4 font-serif text-2xl uppercase tracking-wide text-neutral-900">
      <Image
        src="logos/logo-puerta-simple.png?updatedAt=1703906701749&tr=h-80"
        alt="La Puerta Hostels Logo"
        width={33}
        height={40}
      />
      <>La Puerta Hostels</>
    </span>
  );
}
