import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { ThemeProvider } from "~/brands";
import { Brand } from "~/payload-types";

const meta = {
  title: "routes/_index/Page",
  component: Page,
  decorators: [
    // override the brand context, this is a Puerta-only component
    (Story) => (
      <ThemeProvider brand={{ id: "puerta" } as Brand}>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content: {
      createdAt: "2024-05-10T19:18:09.727Z",
      updatedAt: "2024-05-18T16:01:55.117Z",
      slides: [
        {
          name: "Tayrona",
          title: [
            { children: [{ text: "Hike Through" }] },
            {
              children: [
                { text: "the " },
                { text: "Tayrona Park", bold: true },
              ],
            },
          ],
          titlePosition: "top-left",
          imageUrl:
            "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/images_1684813711570.jpg?updatedAt=1714264025241",
          imageAlt: "View of the beach in Tayrona National Park",
          ctaUrl: "/experiences/tayrona",
          id: "663e6ee0caac5f81e3216b3e",
          imageOverlay: "moderate",
          imagePosition: "center",
        },
        {
          name: "Lost City",
          title: [
            { children: [{ text: "Find the" }] },
            { children: [{ text: "Lost City", bold: true }] },
          ],
          titlePosition: "top-right",
          imageUrl:
            "https://ik.imagekit.io/lapuertahostels/datingjungle-Vv4JB0SMfZ4-unsplash.jpg?updatedAt=1703284394843",
          imageAlt: "View of the Lost City",
          ctaUrl: "/experiences/lost-city",
          id: "663e6fbacaac5f81e3216b7d",
          imageOverlay: "moderate",
          imagePosition: "center",
        },
        {
          name: "Minca",
          title: [
            { children: [{ text: "Follow the" }] },
            { children: [{ text: "Minca River", bold: true }] },
          ],
          titlePosition: "bottom-left",
          imageUrl:
            "https://ik.imagekit.io/lapuertahostels/denise-leisner-8eVV287ST0E-unsplash.jpg?updatedAt=1703369612704",
          imageAlt: "View of the forest in the Minca region",
          ctaUrl: "/experiences/minca",
          id: "663e8b33c79934cdb011e7d0",
          imageOverlay: "moderate",
          imagePosition: "center",
        },
      ],
      slideCta: "Read More",
      layout: [
        {
          heading: "Discover the Colombian Costa Caribe",
          text: [
            {
              children: [
                {
                  text: "Hike through the breath-taking beauty of ",
                },
                {
                  text: "Tayrona National Park",
                  bold: true,
                },
                {
                  text: ", discover the mysterious ",
                },
                {
                  text: "Lost City",
                  bold: true,
                },
                {
                  text: ", or refresh yourself in the river of ",
                },
                {
                  text: "Minca",
                  bold: true,
                },
                {
                  text: ". Our variety of heartful accommodations in the city of Santa Marta are ",
                },
                {
                  text: "your perfect home base",
                  bold: true,
                },
                {
                  text: ".",
                },
              ],
            },
          ],
          id: "664b56be7f9772bcf6dffcb4",
          blockType: "Lead",
          blockName: "Intro",
        },
        {
          blockName: "Accommodations",
          blockType: "AccommodationSelector",
          heading: "Your Home Base for a Perfect Trip",
          text: [
            {
              children: [
                {
                  text: "Choose between our ",
                },
                {
                  text: "two accommodations",
                  bold: true,
                },
                {
                  text: " in Santa Marta. ",
                },
              ],
            },
          ],
          cards: [
            {
              id: "6647dbf8f50fb271d132f9c6",
              brand: {
                id: "aqua",
                name: "Puerta Aqua",
                homeLinkUrl: "/aqua",
                navLinks: [
                  {
                    id: "6649ce958dccc108dcab66ba",
                    url: "/",
                    label: "La Puerta Hostels",
                  },
                ],
                logoUrl:
                  "https://ik.imagekit.io/lapuertahostels/logos/logo-aqua-simple.png?updatedAt=1703915191239",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              imageUrl:
                "https://ik.imagekit.io/lapuertahostels/aqua/spaces/Frente.jpg?updatedAt=1714161155761",
              imageAlt: "Puerta Aqua",
              description:
                "Stay at our lively hostel in the heart of Santa Marta and meet travelers from all over the world. Our rooftop bar is perfect for a get-together at night.",
            },
            {
              id: "6647dc15f50fb271d132f9c7",
              brand: {
                id: "azul",
                name: "La Puerta Azul",
                homeLinkUrl: "/azul",
                navLinks: [
                  {
                    id: "6649ce958dccc108dcab66b9",
                    url: "/",
                    label: "La Puerta Hostels",
                  },
                ],
                logoUrl:
                  "https://ik.imagekit.io/lapuertahostels/logos/logo-azul-simple.png?updatedAt=1703915175439",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              imageUrl:
                "https://ik.imagekit.io/lapuertahostels/azul/piscina/10.jpg?updatedAt=1714162021839",
              imageAlt: "La Puerta Azul",
              description:
                "Being one of the oldest houses in Santa Marta, La Puerta Azul is filled with beauty and history. It can also be booked completely as a private six-room villa.",
            },
          ],
          id: "664b56be7f9772bcf6dffcb1",
        },
        {
          elementId: "santa-marta",
          imageUrl:
            "https://ik.imagekit.io/lapuertahostels//oscar-ivan-esquivel-arteaga-DZVY-1I2peQ-unsplash.jpg?updatedAt=1703778785707",
          imageAlt: "View of Santa Marta",
          heading: [
            {
              children: [
                {
                  text: "Do You Know ",
                },
                {
                  text: "Santa Marta?",
                  bold: true,
                },
              ],
            },
          ],
          text: [
            {
              children: [
                {
                  text: "Santa Marta, nestled ",
                },
                {
                  text: "between the Caribbean Sea and the Sierra Nevada mountains, ",
                  bold: true,
                },
                {
                  text: "beckons tourists with its captivating blend of ",
                },
                {
                  text: "natural beauty",
                  bold: true,
                },
                {
                  text: " and ",
                },
                {
                  text: "rich cultural heritage",
                  bold: true,
                },
                {
                  text: ". Boasting pristine beaches, lush national parks, and a historic city center, Santa Marta offers an ",
                },
                {
                  text: "enchanting escape",
                  bold: true,
                },
                {
                  text: " for travelers seeking a perfect balance of ",
                },
                {
                  text: "sun-soaked relaxation",
                  bold: true,
                },
                {
                  text: " and ",
                },
                {
                  text: "exploration",
                  bold: true,
                },
                {
                  text: " of Colombia’s diverse landscapes.",
                },
              ],
            },
          ],
          id: "664b56be7f9772bcf6dffcae",
          blockType: "ImageWithFloatingText",
          blockName: "Santa Marta",
          textPosition: "right",
          imageOverlay: "moderate",
        },
        {
          heading: "About Us",
          text: [
            {
              children: [
                {
                  text: "Step into our ",
                },
                {
                  text: "Santa Marta haven,",
                  bold: true,
                },
                {
                  text: " where the ",
                },
                {
                  text: "Caribbean breeze whispers tales of adventure,",
                  bold: true,
                },
                {
                  text: " and the Sierra Nevada mountains cradle our dreams. Three years ago, a passionate soul embarked on a journey to craft more than just a hostel—a place where every traveler feels the warmth of connection and the embrace of a second home.",
                },
              ],
            },
            {
              children: [
                {
                  text: "",
                },
              ],
            },
            {
              children: [
                {
                  text: "We didn’t just paint walls; we painted stories. Our founder, driven by a ",
                },
                {
                  text: "deep love for Santa Marta,",
                  bold: true,
                },
                {
                  text: " worked tirelessly to create a space that resonates with the city’s soul. From vibrant murals that speak of local tales to cozy corners designed for shared laughter, every inch is a canvas of our commitment to authentic experiences.",
                },
              ],
            },
            {
              children: [
                {
                  text: "",
                },
              ],
            },
            {
              children: [
                {
                  text: "Collaborating with skilled local artisans, we’ve woven the spirit of Santa Marta into the very fabric of our hostel. The past three years have seen our space evolve into a ",
                },
                {
                  text: "sanctuary for adventurers, a haven for backpackers, and a tapestry of shared memories",
                  bold: true,
                },
                {
                  text: " for those exploring Santa Marta’s wonders.",
                },
              ],
            },
            {
              children: [
                {
                  text: "",
                },
              ],
            },
            {
              children: [
                {
                  text: "Join us in this heartfelt journey—where stories come to life, friendships find a common thread, and the enchantment of Santa Marta unfolds at our intimately personal hostel.",
                },
              ],
            },
          ],
          elementId: "about-us",
          imageUrl:
            "https://ik.imagekit.io/lapuertahostels//351429301_1381427532589680_2319248312954498147_n.jpg?updatedAt=1703702171449",
          imageAlt:
            "Two persons chatting with each other and sitting in a relaxed manner at a table",
          imagePosition: "left",
          grayscale: true,
          id: "664b56be7f9772bcf6dffcab",
          blockType: "Story",
          blockName: "About Us",
        },
      ],
      id: "663e72f1fb66f2adea0300f9",
    },
  },
};
