import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { ThemeProvider } from "~/themes";
import {
  brand,
  callToAction,
  internalLink,
  media,
  plainText,
  richText,
} from "~/common/cms-data.builders";
import { createId } from "@paralleldrive/cuid2";
import {
  bold,
  Page as PageItem,
  paragraph,
  text,
} from "@lapuertahostels/shared";

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
      id: createId(),
      createdAt: "2024-05-10T19:18:09.727Z",
      updatedAt: "2024-05-18T16:01:55.117Z",
      pathname: "/",
      hero: [
        {
          slides: [
            {
              image: media(
                "mesmerizing-scenery-seascape-with-lush-nature-daytime.jpg",
              ),
              overlayTitle: {
                show: true,
                text: richText(
                  paragraph(text("Hike Through\nthe "), bold("Tayrona Park")),
                ),
                position: "top-left",
                overlay: "moderate",
                cta: callToAction("Read More", "primary"),
              },
              id: createId(),
            },
            {
              image: media("datingjungle-Vv4JB0SMfZ4-unsplash.jpg"),
              overlayTitle: {
                show: true,
                text: richText(
                  paragraph(text("Find the\n"), bold("Lost City")),
                ),
                position: "top-right",
                overlay: "moderate",
                cta: callToAction("Read More", "primary"),
              },
              id: createId(),
            },
            {
              image: media("denise-leisner-8eVV287ST0E-unsplash.jpg"),
              overlayTitle: {
                show: true,
                text: richText(
                  paragraph(text("Follow the\n"), bold("Minca River")),
                ),
                position: "bottom-left",
                overlay: "moderate",
                cta: callToAction("Read More", "primary"),
              },
              id: createId(),
            },
          ],
          id: createId(),
          blockType: "HeroSlides",
        },
      ],

      layout: [
        {
          heading: plainText("Discover the Colombian Costa Caribe"),
          text: richText(
            paragraph(
              text("Hike through the breath-taking beauty of "),
              bold("Tayrona National Park"),
              text(", discover the mysterious "),
              bold("Lost City"),
              text(", or refresh yourself in the river of "),
              bold("Minca"),
              text(
                ". Our variety of heartful accommodations in the city of Santa Marta are ",
              ),
              bold("your perfect home base"),
              text("."),
            ),
          ),
          id: createId(),
          blockType: "LeadText",
        },
        {
          blockType: "AccommodationSelector",
          heading: plainText("Your Home Base for a Perfect Trip"),
          text: richText(
            paragraph(
              text("Choose between our "),
              bold("two accommodations"),
              text(" in Santa Marta. "),
            ),
          ),
          cards: [
            {
              id: createId(),
              brand: brand({
                id: "aqua",
                name: "Puerta Aqua",
                homeLink: internalLink("/aqua"),
              }),
              image: media("Frente.jpg"),
              description: richText(
                paragraph(
                  text(
                    "Stay at our lively hostel in the heart of Santa Marta and meet travelers from all over the world. Our rooftop bar is perfect for a get-together at night.",
                  ),
                ),
              ),
            },
            {
              id: createId(),
              brand: brand({
                id: "azul",
                name: "La Puerta Azul",
                homeLink: internalLink("/azul"),
              }),
              image: media("10.jpg"),
              description: richText(
                paragraph(
                  text(
                    "Being one of the oldest houses in Santa Marta, La Puerta Azul is filled with beauty and history. It can also be booked completely as a private six-room villa.",
                  ),
                ),
              ),
            },
          ],
          id: createId(),
        },
        {
          elementId: "santa-marta",
          image: media("oscar-ivan-esquivel-arteaga-DZVY-1I2peQ-unsplash.jpg"),
          overlayTitle: {
            text: richText(
              paragraph(text("Do You Know "), bold("Santa Marta?")),
            ),
            position: "top-right",
            overlay: "moderate",
          },
          text: richText(
            paragraph(
              text("Santa Marta, nestled "),
              bold(
                "between the Caribbean Sea and the Sierra Nevada mountains, ",
              ),
              text("beckons tourists with its captivating blend of "),
              bold("natural beauty"),
              text(" and "),
              bold("rich cultural heritage"),
              text(
                ". Boasting pristine beaches, lush national parks, and a historic city center, Santa Marta offers an ",
              ),
              bold("enchanting escape"),
              text(" for travelers seeking a perfect balance of "),
              bold("sun-soaked relaxation"),
              text(" and "),
              bold("exploration"),
              text(" of Colombia’s diverse landscapes."),
            ),
          ),
          id: createId(),
          blockType: "ImageWithFloatingText",
        },
        {
          heading: plainText("About Us"),
          text: richText(
            paragraph(
              text("Step into our "),
              bold("Santa Marta haven,"),
              text(" where the "),
              bold("Caribbean breeze whispers tales of adventure,"),
              text(
                " and the Sierra Nevada mountains cradle our dreams. Three years ago, a passionate soul embarked on a journey to craft more than just a hostel—a place where every traveler feels the warmth of connection and the embrace of a second home.",
              ),
            ),
            paragraph(
              text(
                "We didn’t just paint walls; we painted stories. Our founder, driven by a ",
              ),
              bold("deep love for Santa Marta,"),
              text(
                " worked tirelessly to create a space that resonates with the city’s soul. From vibrant murals that speak of local tales to cozy corners designed for shared laughter, every inch is a canvas of our commitment to authentic experiences.",
              ),
            ),
            paragraph(
              text(
                "Collaborating with skilled local artisans, we’ve woven the spirit of Santa Marta into the very fabric of our hostel. The past three years have seen our space evolve into a ",
              ),
              bold(
                "sanctuary for adventurers, a haven for backpackers, and a tapestry of shared memories",
              ),
              text(" for those exploring Santa Marta’s wonders."),
            ),
            paragraph(
              text(
                "Join us in this heartfelt journey—where stories come to life, friendships find a common thread, and the enchantment of Santa Marta unfolds at our intimately personal hostel.",
              ),
            ),
          ),
          elementId: "about-us",
          image: media("351429301_1381427532589680_2319248312954498147_n.jpg"),
          imagePosition: "left",
          grayscaleImage: true,
          id: createId(),
          blockType: "Story",
        },
      ],
    } as PageItem,
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
      pathname: "/aqua",
      hero: [
        {
          blockType: "HeroSlides",
          id: "hero",
          slides: [
            {
              id: "slide-1",
              image: media("Frente.jpg"),
              overlayTitle: {
                show: true,
                text: richText(
                  paragraph(text("Welcome to Your\n"), bold("Vacation Home")),
                ),
                overlay: "intense",
                cta: callToAction("Reserve Now", "primary"),
              },
            },
          ],
        },
      ],
      layout: [
        {
          heading: plainText("Welcome to Our Boutique Hostel"),
          text: richText(
            paragraph(
              text("Nestled in the vibrant heart of Santa Marta, our "),
              bold("boutique hostel"),
              text(" offers an intimate escape with a touch of "),
              bold("local charm, "),
              text("where "),
              bold("comfort meets culture"),
              text(
                " just steps away from the city's most captivating attractions.",
              ),
            ),
          ),
          blockType: "LeadText",
        },
        { blockType: "Separator" },
        {
          orientation: "first-image-left",
          items: [
            {
              image: media("IMG_6244.jpg"),
              heading: plainText("Time to Play"),
              text: richText(
                paragraph(
                  text("Join fellow travelers in our "),
                  bold("cozy community area"),
                  text(
                    " to unwind and connect over a friendly board game, creating ",
                  ),
                  bold("unforgettable memories and new friendships"),
                  text("."),
                ),
              ),
            },
            {
              image: media("IMG_6591.jpg"),
              heading: plainText("Relax on the Terrace"),
              text: richText(
                paragraph(
                  text("Indulge in our "),
                  bold("Deluxe room"),
                  text(", featuring a "),
                  bold("private terrace"),
                  text(
                    " where you can unwind and soak up the serene atmosphere.",
                  ),
                ),
              ),
            },
            {
              image: media("IMG_6591.jpg"),
              heading: plainText("Right in the City Center"),
              text: richText(
                paragraph(
                  text("Located in the "),
                  bold("historic city center,"),
                  text(" our hostel is just a short stroll from the "),
                  bold("beach and all the major sights"),
                  text(
                    ", offering the perfect base for your Santa Marta adventure.",
                  ),
                ),
              ),
            },
          ],
          blockType: "Features",
        },
        {
          heading: plainText("Come By"),
          text: richText(
            paragraph(
              text(
                "Discover the charm of Santa Marta at our boutique hostel, ideally located in the historic city center. Steps from pristine beaches and local attractions, our welcoming community area is perfect for connecting with fellow travelers over a board game.",
              ),
            ),
            paragraph(
              text(
                "For a touch of luxury, our deluxe room with a private terrace offers a tranquil retreat. Relax with a cool drink and enjoy the beautiful surroundings after a day of adventure. Experience our warm hospitality and make unforgettable memories in the heart of Santa Marta.",
              ),
            ),
          ),
          image: media("366944756_17942281163690648_3066160991932660286_n.jpg"),
          imagePosition: "right",
          grayscaleImage: false,
          blockType: "Story",
        },
      ],
    } as PageItem,
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
      pathname: "/azul",
      hero: [
        {
          slides: [
            {
              image: media("10.jpg"),
              imageAlignment: "bottom",
              overlayTitle: {
                show: true,
                text: richText(
                  paragraph(text("Welcome to Your\n"), bold("Vacation Home")),
                ),
                overlay: "intense",
                position: "center",
                cta: callToAction("Reserve Now", "primary"),
              },
            },
            {
              image: media("10.jpg"),
              overlayTitle: {
                show: true,
                text: richText(
                  paragraph(text("Cool Down\n"), bold(" by the Pool")),
                ),
                overlay: "subtle",
                position: "bottom-left",
                cta: callToAction("Book Now", "primary"),
              },
            },
          ],
          blockType: "HeroSlides",
        },
      ],
      layout: [
        {
          items: [
            {
              image: media("_DSC0358.jpg"),
              heading: plainText("Feel Newborn"),
              text: richText(
                paragraph(
                  text("A day full of exploring the city can be tiring. Our "),
                  bold("air-conditioned"),
                  text(" rooms with "),
                  bold("tasteful"),
                  text(
                    " details give you the perfect place to relax and unwind.",
                  ),
                ),
              ),
            },
            {
              image: media("_DSC0325.jpg"),
              heading: plainText("Bring Your Family"),
              text: richText(
                paragraph(
                  text("Traveling with your loved ones? We offer "),
                  bold("Twin Rooms"),
                  text(
                    " allowing an occupancy of up to four people. Perfect for your family get-away.",
                  ),
                ),
              ),
            },
            {
              image: media("_DSC0299.jpg"),
              heading: plainText("Cool Down by the Pool"),
              text: richText(
                paragraph(
                  text("Our "),
                  bold("courtyard pool"),
                  text(
                    " is the perfect place to cool down after a hot day under the Carribean sun.",
                  ),
                ),
              ),
            },
            {
              image: media("_DSC0299.jpg"),
              heading: plainText("A Beautiful Courtyard"),
              text: richText(
                paragraph(
                  text(
                    "Our courtyard is the perfect place to enjoy a cocktail or two. With the nice little ",
                  ),
                  bold("pool"),
                  text(
                    " and the lush greenery, you’ll feel like you’re in paradise.",
                  ),
                ),
              ),
            },
            {
              image: media("_DSC0820.jpg"),
              heading: plainText("Freshen Up"),
              text: richText(
                paragraph(
                  text("Experience our impeccably appointed bathrooms, "),
                  bold("thoughtfully equipped"),
                  text(
                    " to ensure you’re primed for a night out in the historic center or refreshed for a restful night’s sleep.",
                  ),
                ),
              ),
            },
            {
              image: media("_dsc0989.jpg"),
              heading: plainText("Enjoy the Morning"),
              text: richText(
                paragraph(
                  text("Start your day right with a tinto on your "),
                  bold("private terrace"),
                  text(" and listen to Santa Marta coming to life."),
                ),
              ),
            },
          ],
          blockType: "Features",
        },
      ],
    } as PageItem,
  },
};
