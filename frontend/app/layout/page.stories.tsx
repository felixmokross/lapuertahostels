import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { Page as PageType } from "~/payload-types";
import { ThemeProvider } from "~/themes";

const meta = {
  title: "layout/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Puerta: Story = {
  decorators: [
    // override the brand context, this is a Puerta-only component
    (Story) => (
      <ThemeProvider brandId="puerta">
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    content: {
      id: "home",
      createdAt: "2024-05-10T19:18:09.727Z",
      updatedAt: "2024-05-18T16:01:55.117Z",
      url: "/",
      hero: [
        {
          slides: [
            {
              name: "Tayrona",
              image: {
                id: "1",
                filename:
                  "mesmerizing-scenery-seascape-with-lush-nature-daytime.jpg",
                alt: "View of the beach in Tayrona National Park",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              overlayTitle: {
                show: true,
                text: [
                  { children: [{ text: "Hike Through" }] },
                  {
                    children: [
                      { text: "the " },
                      { text: "Tayrona Park", bold: true },
                    ],
                  },
                ],
                position: "top-left",
                overlay: "moderate",
                cta: {
                  show: true,
                  link: {
                    label: "Read More",
                    type: "external",
                    url: "http://example.com",
                  },
                },
              },
              id: "663e6ee0caac5f81e3216b3e",
            },
            {
              name: "Lost City",
              image: {
                id: "2",
                filename: "datingjungle-Vv4JB0SMfZ4-unsplash.jpg",
                alt: "View of the Lost City",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              overlayTitle: {
                show: true,
                text: [
                  { children: [{ text: "Find the" }] },
                  { children: [{ text: "Lost City", bold: true }] },
                ],
                position: "top-right",
                overlay: "moderate",
                cta: {
                  show: true,
                  link: {
                    label: "Read More",
                    type: "external",
                    url: "http://example.com",
                  },
                },
              },
              id: "663e6fbacaac5f81e3216b7d",
            },
            {
              name: "Minca",
              image: {
                id: "3",
                filename: "denise-leisner-8eVV287ST0E-unsplash.jpg",
                alt: "View of the forest in the Minca region",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              overlayTitle: {
                show: true,
                text: [
                  { children: [{ text: "Follow the" }] },
                  { children: [{ text: "Minca River", bold: true }] },
                ],
                position: "bottom-left",
                overlay: "moderate",
                cta: {
                  show: true,
                  link: {
                    label: "Read More",
                    type: "external",
                    url: "http://example.com",
                  },
                },
              },
              id: "663e8b33c79934cdb011e7d0",
            },
          ],
          id: "663e6ee0caac5f81e3216b3d",
          blockType: "Slides",
        },
      ],

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
                    name: "La Puerta Hostels",
                    id: "6649ce958dccc108dcab66ba",
                    page: { url: "/" } as PageType,
                    type: "internal",
                    label: "La Puerta Hostels",
                    updatedAt: "2024-05-19T10:04:05.148Z",
                    createdAt: "2024-05-19T10:04:05.148Z",
                  },
                ],
                logo: {
                  id: "6647dc15f50fb271d132f9c7",
                  filename: "logo-aqua-simple.png",
                  alt: "Puerta Aqua Logo",
                  createdAt: "2024-05-19T10:04:05.148Z",
                  updatedAt: "2024-05-19T10:04:05.148Z",
                },
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              image: {
                id: "2",
                filename: "Frente.jpg",
                alt: "Puerta Aqua",
                createdAt: "2022-01-01T00:00:00Z",
                updatedAt: "2022-01-01T00:00:00Z",
              },
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
                    type: "internal",
                    name: "La Puerta Hostels",
                    page: { url: "/" } as PageType,
                    label: "La Puerta Hostels",
                    updatedAt: "2024-05-19T10:04:05.148Z",
                    createdAt: "2024-05-19T10:04:05.148Z",
                  },
                ],
                logo: {
                  id: "6647dc15f50fb271d132f9c7",
                  filename: "logo-azul-simple.png",
                  alt: "La Puerta Azul Logo",
                  createdAt: "2024-05-19T10:04:05.148Z",
                  updatedAt: "2024-05-19T10:04:05.148Z",
                },
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              image: {
                id: "1",
                filename: "10.jpg",
                alt: "La Puerta Azul",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              description:
                "Being one of the oldest houses in Santa Marta, La Puerta Azul is filled with beauty and history. It can also be booked completely as a private six-room villa.",
            },
          ],
          id: "664b56be7f9772bcf6dffcb1",
        },
        {
          elementId: "santa-marta",
          image: {
            id: "1",
            filename: "oscar-ivan-esquivel-arteaga-DZVY-1I2peQ-unsplash.jpg",
            alt: "View of Santa Marta",
            createdAt: "2024-05-19T10:04:05.148Z",
            updatedAt: "2024-05-19T10:04:05.148Z",
          },
          overlayTitle: {
            text: [
              {
                children: [
                  { text: "Do You Know " },
                  { text: "Santa Marta?", bold: true },
                ],
              },
            ],
            position: "top-right",
            overlay: "moderate",
          },
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
          image: {
            id: "4",
            filename: "351429301_1381427532589680_2319248312954498147_n.jpg",
            alt: "Two persons chatting with each other and sitting in a relaxed manner at a table",
            createdAt: "2024-05-19T10:04:05.148Z",
            updatedAt: "2024-05-19T10:04:05.148Z",
          },
          imagePosition: "left",
          grayscaleImage: true,
          id: "664b56be7f9772bcf6dffcab",
          blockType: "Story",
          blockName: "About Us",
        },
      ],
    },
  },
};

export const Aqua: Story = {
  decorators: [
    // override the brand context, this is a Aqua-only component
    (Story) => (
      <ThemeProvider brandId="aqua">
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    content: {
      id: "aqua",
      createdAt: "2024-05-10T19:18:09.727Z",
      updatedAt: "2024-05-18T16:01:55.117Z",
      url: "/aqua",
      hero: [
        {
          blockType: "Slides",
          id: "hero",
          slides: [
            {
              id: "slide-1",
              name: "Front View",
              image: {
                id: "4",
                filename: "Frente.jpg",
                alt: "Front view of Puerta Aqua",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              overlayTitle: {
                show: true,
                text: [
                  {
                    children: [{ type: "text", text: "Welcome to Your " }],
                  },
                  {
                    children: [
                      { type: "text", text: "Vacation Home", bold: true },
                    ],
                  },
                ],
                overlay: "intense",
                cta: {
                  show: true,
                  link: {
                    label: "Reserve Now",
                    type: "external",
                    url: "http://example.com",
                  },
                },
              },
            },
          ],
        },
      ],
      layout: [
        {
          heading: "Welcome to Our Boutique Hostel",
          text: [
            {
              children: [
                {
                  text: "Nestled in the vibrant heart of Santa Marta, our ",
                },
                {
                  text: "boutique hostel",
                  bold: true,
                },
                {
                  text: " offers an intimate escape with a touch of ",
                },
                {
                  text: "local charm, ",
                  bold: true,
                },
                {
                  text: "where ",
                },
                {
                  text: "comfort meets culture",
                  bold: true,
                },
                {
                  text: " just steps away from the city's most captivating attractions.",
                },
              ],
            },
          ],
          cta: {
            show: false,
            variant: "secondary",
          },
          id: "665b9c90f1606522b13acc31",
          blockType: "Lead",
        },
        {
          id: "665cb2cea786af09309d3c40",
          blockType: "Separator",
        },
        {
          orientation: "first-image-left",
          items: [
            {
              image: {
                id: "1",
                filename: "IMG_6244.jpg",
                alt: "Person playing a board game on a table in the hostel’s community areas.",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              heading: "Time to Play",
              text: [
                {
                  children: [
                    {
                      text: "Join fellow travelers in our ",
                    },
                    {
                      text: "cozy community area",
                      bold: true,
                    },
                    {
                      text: " to unwind and connect over a friendly board game, creating ",
                    },
                    {
                      text: "unforgettable memories and new friendships",
                      bold: true,
                    },
                    {
                      text: ".",
                    },
                  ],
                },
              ],
              cta: {
                show: false,
                variant: "secondary",
              },
              id: "665cb2a2a786af09309d3c3c",
            },
            {
              image: {
                id: "2",
                filename: "IMG_6591.jpg",
                alt: "View of the Deluxe room’s terrace",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              heading: "Relax on the Terrace",
              text: [
                {
                  children: [
                    {
                      text: "Indulge in our ",
                    },
                    {
                      text: "Deluxe room",
                      bold: true,
                    },
                    {
                      text: ", featuring a ",
                    },
                    {
                      text: "private terrace",
                      bold: true,
                    },
                    {
                      text: " where you can unwind and soak up the serene atmosphere.",
                    },
                  ],
                },
              ],
              cta: {
                show: false,
                variant: "secondary",
              },
              id: "665cb2a2a786af09309d3c3d",
            },
            {
              image: {
                id: "3",
                filename: "IMG_6591.jpg",
                alt: "View of the Deluxe room’s terrace",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              heading: "Right in the City Center",
              text: [
                {
                  children: [
                    {
                      text: "Located in the ",
                    },
                    {
                      text: "historic city center,",
                      bold: true,
                    },
                    {
                      text: " our hostel is just a short stroll from the ",
                    },
                    {
                      text: "beach and all the major sights",
                      bold: true,
                    },
                    {
                      text: ", offering the perfect base for your Santa Marta adventure.",
                    },
                  ],
                },
              ],
              cta: {
                show: false,
                variant: "secondary",
              },
              id: "665cb2a2a786af09309d3c3e",
            },
          ],
          elementId: null,
          id: "665b9cfaf1606522b13acc32",
          blockName: null,
          blockType: "Features",
        },
        {
          heading: "Come By",
          text: [
            {
              children: [
                {
                  text: "\nDiscover the charm of Santa Marta at our boutique hostel, ideally located in the historic city center. Steps from pristine beaches and local attractions, our welcoming community area is perfect for connecting with fellow travelers over a board game.",
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
                  text: "For a touch of luxury, our deluxe room with a private terrace offers a tranquil retreat. Relax with a cool drink and enjoy the beautiful surroundings after a day of adventure. Experience our warm hospitality and make unforgettable memories in the heart of Santa Marta.",
                },
              ],
            },
          ],
          image: {
            id: "1",
            filename: "366944756_17942281163690648_3066160991932660286_n.jpg",
            alt: "Woman looking at the viewer with a cup of coffee in her hand",
            createdAt: "2024-05-19T10:04:05.148Z",
            updatedAt: "2024-05-19T10:04:05.148Z",
          },
          imagePosition: "right",
          grayscaleImage: false,
          elementId: null,
          id: "665b9f33f1606522b13acc36",
          blockName: null,
          blockType: "Story",
        },
      ],
    },
  },
};

export const Azul: Story = {
  decorators: [
    // override the brand context, this is a Azul-only component
    (Story) => (
      <ThemeProvider brandId="azul">
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    content: {
      id: "azul",
      createdAt: "2024-05-10T19:18:09.727Z",
      updatedAt: "2024-05-18T16:01:55.117Z",
      url: "/azul",
      hero: [
        {
          slides: [
            {
              image: {
                id: "1",
                filename: "10.jpg",
                alt: "Atrium of La Puerta Azul",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              imageAlignment: "bottom",
              name: "Atrium",
              overlayTitle: {
                show: true,
                text: [
                  {
                    children: [
                      { type: "text", text: "Welcome to Your " },
                      { type: "text", text: "Vacation Home", bold: true },
                    ],
                  },
                ],
                overlay: "intense",
                position: "center",
                cta: {
                  show: true,
                  link: {
                    label: "Reserve Now",
                    type: "external",
                    url: "http://example.com",
                  },
                },
              },
            },
            {
              name: "Room View",
              image: {
                id: "8",
                filename: "_DSC0299.jpg",
                alt: "Room view of La Puerta Azul",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              overlayTitle: {
                show: true,
                text: [
                  {
                    children: [
                      { type: "text", text: "Cool Down" },
                      { type: "text", text: " by the Pool", bold: true },
                    ],
                  },
                ],
                overlay: "subtle",
                position: "bottom-left",
                cta: {
                  show: true,
                  link: {
                    label: "Book Now",
                    type: "external",
                    url: "http://example.com",
                  },
                },
              },
            },
          ],
          id: "664b5b879e149f43ef4874c8",
          blockType: "Slides",
        },
      ],
      layout: [
        {
          items: [
            {
              image: {
                id: "4",
                filename: "_DSC0358.jpg",
                alt: "View of a room",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              heading: "Feel Newborn",
              text: [
                {
                  children: [
                    {
                      text: "A day full of exploring the city can be tiring. Our ",
                    },
                    {
                      text: "air-conditioned",
                      bold: true,
                    },
                    {
                      text: " rooms with ",
                    },
                    {
                      text: "tasteful",
                      bold: true,
                    },
                    {
                      text: " details give you the perfect place to relax and unwind.",
                    },
                  ],
                },
              ],
              id: "664904b75b1291dc0b0a9fa5",
            },
            {
              image: {
                id: "5",
                filename: "_DSC0325.jpg",
                alt: "View of a Twin Room with two double beds",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              heading: "Bring Your Family",
              text: [
                {
                  children: [
                    {
                      text: "Traveling with your loved ones? We offer ",
                    },
                    {
                      text: "Twin Rooms",
                      bold: true,
                    },
                    {
                      text: " allowing an occupancy of up to four people. Perfect for your family get-away.\n",
                    },
                  ],
                },
              ],
              id: "6649076a43cd15be5c01796e",
            },
            {
              image: {
                id: "6",
                filename: "_DSC0299.jpg",
                alt: "Example image",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              heading: "Cool Down by the Pool",
              text: [
                {
                  children: [
                    {
                      text: "Our ",
                    },
                    {
                      text: "courtyard pool",
                      bold: true,
                    },
                    {
                      text: " is the perfect place to cool down after a hot day under the                  Carribean sun.",
                    },
                  ],
                },
              ],
              id: "6649070543cd15be5c01796d",
            },
            {
              image: {
                id: "8",
                filename: "_DSC0299.jpg",
                alt: "Example image",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              heading: "A Beautiful Courtyard",
              text: [
                {
                  children: [
                    {
                      text: "Our courtyard is the perfect place to enjoy a cocktail or two. With the nice little ",
                    },
                    {
                      text: "pool",
                      bold: true,
                    },
                    {
                      text: " and the lush greenery, you’ll feel like you’re in paradise.",
                    },
                  ],
                },
              ],
              id: "664907e143cd15be5c01796f",
            },
            {
              image: {
                id: "9",
                filename: "_DSC0820.jpg",
                alt: "Example image",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              heading: "Freshen Up",
              text: [
                {
                  children: [
                    {
                      text: "Experience our impeccably appointed bathrooms, ",
                    },
                    {
                      text: "thoughtfully equipped",
                      bold: true,
                    },
                    {
                      text: " to ensure you’re primed for a night out in the historic center or refreshed for a restful night’s sleep.\n",
                    },
                  ],
                },
              ],
              id: "6649090d43cd15be5c017970",
            },
            {
              image: {
                id: "10",
                filename: "_dsc0989.jpg",
                alt: "Example image",
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              heading: "Enjoy the Morning",
              text: [
                {
                  children: [
                    {
                      text: "Start your day right with a tinto on your ",
                    },
                    {
                      text: "private terrace",
                      bold: true,
                    },
                    {
                      text: " and listen to Santa Marta coming to life.",
                    },
                  ],
                },
              ],
              id: "664909b4f949fd4d1b850f24",
            },
          ],
          id: "664b5b879e149f43ef4874c8",
          blockType: "Features",
          blockName: "Features",
        },
      ],
    },
  },
};
