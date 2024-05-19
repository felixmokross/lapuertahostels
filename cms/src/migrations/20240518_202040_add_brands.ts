import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { ObjectId } from "mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const date = new Date();
  await payload.db.connection.db
    .collection<Migration_Brand>("brands")
    .insertMany([
      {
        _id: "puerta",
        name: "La Puerta Hostels",
        homeLinkUrl: "/",
        navLinks: [
          {
            id: new ObjectId().toHexString(),
            url: "/aqua",
            label: "Puerta Aqua",
          },
          {
            id: new ObjectId().toHexString(),
            url: "/azul",
            label: "La Puerta Azul",
          },
          {
            id: new ObjectId().toHexString(),
            url: ".#santa-marta",
            label: "Santa Marta",
          },
          {
            id: new ObjectId().toHexString(),
            url: ".#about-us",
            label: "About Us",
          },
          { id: new ObjectId().toHexString(), url: "#", label: "Contact" },
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
        homeLinkUrl: "/azul",
        navLinks: [
          {
            id: new ObjectId().toHexString(),
            url: "/",
            label: "La Puerta Hostels",
          },
        ],
        logoUrl:
          "https://ik.imagekit.io/lapuertahostels/logos/logo-azul-simple.png?updatedAt=1703915175439",
        createdAt: date,
        updatedAt: date,
        __v: 0,
      },
      {
        _id: "aqua",
        name: "Puerta Aqua",
        homeLinkUrl: "/aqua",
        navLinks: [
          {
            id: new ObjectId().toHexString(),
            url: "/",
            label: "La Puerta Hostels",
          },
        ],
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
  homeLinkUrl: string;
  navLinks: { id: string; url: string; label: string }[];
  logoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
