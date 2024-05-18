import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const date = new Date();
  await payload.db.connection.db
    .collection<Migration_Brand>("brands")
    .insertMany([
      {
        _id: "puerta",
        name: "La Puerta Hostels",
        navLinks: [
          { url: "/aqua", label: "Puerta Aqua" },
          { url: "/azul", label: "La Puerta Azul" },
          { url: ".#santa-marta", label: "Santa Marta" },
          { url: ".#about-us", label: "About Us" },
          { url: "#", label: "Contact" },
        ],
        logoUrl:
          "https://ik.imagekit.io/lapuertahostels/logos/logo-puerta-simple.png?updatedAt=1703906701749",
        createdAt: date,
        updatedAt: date,
        __v: 0,
      },
      {
        _id: "azul",
        name: "La Puerta Azul",
        navLinks: [{ url: "/", label: "La Puerta Hostels" }],
        logoUrl:
          "https://ik.imagekit.io/lapuertahostels/logos/logo-azul-simple.png?updatedAt=1703915175439",
        createdAt: date,
        updatedAt: date,
        __v: 0,
      },
      {
        _id: "aqua",
        name: "Puerta Aqua",
        navLinks: [{ url: "/", label: "La Puerta Hostels" }],
        logoUrl:
          "https://ik.imagekit.io/lapuertahostels/logos/logo-aqua-simple.png?updatedAt=1703915191239",
        createdAt: date,
        updatedAt: date,
        __v: 0,
      },
    ]);
}

type Migration_Brand = {
  _id: string;
  name: string;
  navLinks: { url: string; label: string }[];
  logoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
