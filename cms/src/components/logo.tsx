import React from "react";
import puertaAdminLogo from "../assets/puerta-admin-logo.png";
import Image from "next/image";

export function Logo() {
  return (
    <Image
      src={puertaAdminLogo.src}
      alt="La Puerta Hostels Admin Logo"
      width={50}
      height={61}
    />
  );
}

export function LogoSmall() {
  return (
    <img
      src={puertaAdminLogo.src}
      alt="La Puerta Hostels Admin Logo"
      width={20}
      height={24}
    />
  );
}
