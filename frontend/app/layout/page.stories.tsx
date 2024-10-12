import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { Brand } from "~/payload-types";
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
      <ThemeProvider brand={{ id: "puerta" } as Brand}>
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
                url: "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/images_1684813711570.jpg?updatedAt=1714264025241",
                alt: "View of the beach in Tayrona National Park",
                aspectRatio: undefined!,
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
                  text: "Read More",
                  url: "/experiences/tayrona",
                },
              },
              id: "663e6ee0caac5f81e3216b3e",
            },
            {
              name: "Lost City",
              image: {
                url: "https://ik.imagekit.io/lapuertahostels/datingjungle-Vv4JB0SMfZ4-unsplash.jpg?updatedAt=1703284394843",
                alt: "View of the Lost City",
                aspectRatio: undefined!,
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
                  text: "Read More",
                  url: "/experiences/lost-city",
                },
              },
              id: "663e6fbacaac5f81e3216b7d",
            },
            {
              name: "Minca",
              image: {
                url: "https://ik.imagekit.io/lapuertahostels/denise-leisner-8eVV287ST0E-unsplash.jpg?updatedAt=1703369612704",
                alt: "View of the forest in the Minca region",
                aspectRatio: undefined!,
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
                  text: "Read More",
                  url: "/experiences/minca",
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
                    id: "6649ce958dccc108dcab66ba",
                    url: "/",
                    label: "La Puerta Hostels",
                  },
                ],
                logo: {
                  url: "https://ik.imagekit.io/lapuertahostels/logos/logo-aqua-simple.png?updatedAt=1703915191239",
                  aspectRatio: undefined!,
                },
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              image: {
                url: "https://ik.imagekit.io/lapuertahostels/aqua/spaces/Frente.jpg?updatedAt=1714161155761",
                alt: "Puerta Aqua",
                aspectRatio: undefined!,
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
                    url: "/",
                    label: "La Puerta Hostels",
                  },
                ],
                logo: {
                  url: "https://ik.imagekit.io/lapuertahostels/logos/logo-azul-simple.png?updatedAt=1703915175439",
                  aspectRatio: undefined!,
                },
                createdAt: "2024-05-19T10:04:05.148Z",
                updatedAt: "2024-05-19T10:04:05.148Z",
              },
              image: {
                url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/10.jpg?updatedAt=1714162021839",
                alt: "La Puerta Azul",
                aspectRatio: undefined!,
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
            url: "https://ik.imagekit.io/lapuertahostels//oscar-ivan-esquivel-arteaga-DZVY-1I2peQ-unsplash.jpg?updatedAt=1703778785707",
            alt: "View of Santa Marta",
            aspectRatio: undefined!,
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
            show: true,
            url: "https://ik.imagekit.io/lapuertahostels//351429301_1381427532589680_2319248312954498147_n.jpg?updatedAt=1703702171449",
            alt: "Two persons chatting with each other and sitting in a relaxed manner at a table",
            position: "left",
            grayscale: true,
            aspectRatio: undefined!,
          },
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
      <ThemeProvider brand={{ id: "aqua" } as Brand}>
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
                url: "https://ik.imagekit.io/lapuertahostels/aqua/spaces/Frente.jpg?updatedAt=1714161502803",
                alt: "Front view of Puerta Aqua",
                aspectRatio: undefined!,
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
                  text: "Reserve Now",
                  url: "/booking",
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
                url: "https://ik.imagekit.io/lapuertahostels/aqua/spaces/IMG_6244.jpg?updatedAt=1714161153045",
                alt: "Person playing a board game on a table in the hostel’s community areas.",
                aspectRatio: undefined!,
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
                url: "https://ik.imagekit.io/lapuertahostels/aqua/deluxe-con-terraza/IMG_6591.jpg?updatedAt=1717280340182",
                alt: "View of the Deluxe room’s terrace",
                aspectRatio: undefined!,
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
                url: "https://ik.imagekit.io/lapuertahostels/aqua/spaces/Frente.jpg?updatedAt=1714161502803",
                alt: "Front view of the hotel",
                aspectRatio: undefined!,
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
            show: true,
            url: "https://ik.imagekit.io/lapuertahostels/366944756_17942281163690648_3066160991932660286_n.jpg?updatedAt=1704147703325",
            alt: "Woman looking at the viewer with a cup of coffee in her hand",
            position: "right",
            grayscale: false,
            aspectRatio: undefined!,
          },
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
      <ThemeProvider brand={{ id: "azul" } as Brand}>
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
                url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/10.jpg?updatedAt=1714162021839",
                alt: "Atrium of La Puerta Azul",
                alignment: "bottom",
                aspectRatio: undefined!,
              },
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
                  text: "Reserve Now",
                  url: "/booking",
                },
              },
            },
            {
              name: "Room View",
              image: {
                url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
                alt: "Room view of La Puerta Azul",
                aspectRatio: undefined!,
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
                  text: "Book Now",
                  url: "/booking",
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
                url: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
                alt: "View of a room",
                aspectRatio: undefined!,
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
                url: "https://ik.imagekit.io/lapuertahostels/azul/delux%20twin%20with%20terrace/_DSC0325.jpg?updatedAt=1714162301928",
                alt: "View of a Twin Room with two double beds",
                aspectRatio: undefined!,
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
                url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
                alt: "View of the courtyard pool",
                aspectRatio: undefined!,
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
                url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/10.jpg?updatedAt=1714162021839",
                alt: "Picture of the courtyard",
                aspectRatio: undefined!,
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
                url: "https://ik.imagekit.io/lapuertahostels/azul/standard%20twin/_DSC0820.jpg?updatedAt=1714162321093",
                alt: "Picture of the bathroom table with the hairdryer on it",
                aspectRatio: undefined!,
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
                url: "https://ik.imagekit.io/lapuertahostels/azul/delux%20king%20room%20with%20terrace/_dsc0989.jpg?updatedAt=1714162269331",
                alt: "Picture of the room terrace with two coffee cups on the table",
                aspectRatio: undefined!,
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
