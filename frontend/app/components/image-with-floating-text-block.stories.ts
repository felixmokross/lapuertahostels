import type { Meta, StoryObj } from "@storybook/react";
import { ImageWithFloatingTextBlock } from "./image-with-floating-text-block";

const meta = {
  title: "Image with Floating Text Block",
  component: ImageWithFloatingTextBlock,
} satisfies Meta<typeof ImageWithFloatingTextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    image: {
      src: "https://ik.imagekit.io/lapuertahostels//oscar-ivan-esquivel-arteaga-DZVY-1I2peQ-unsplash.jpg?updatedAt=1703778785707",
      alt: "View of Santa Marta",
    },
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
  },
};
