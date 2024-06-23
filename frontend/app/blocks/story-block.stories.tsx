import type { Meta, StoryObj } from "@storybook/react";
import { StoryBlock } from "./story-block";
import { allModes } from ".storybook/modes";

const meta = {
  title: "blocks/Story Block",
  component: StoryBlock,
  parameters: {
    chromatic: {
      modes: {
        "brand-aqua": allModes["brand-aqua"],
        "brand-azul": allModes["brand-azul"],
      },
    },
  },
} satisfies Meta<typeof StoryBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "Story",
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
    image: {
      url: "https://ik.imagekit.io/lapuertahostels//351429301_1381427532589680_2319248312954498147_n.jpg?updatedAt=1703702171449",
      alt: "Two persons chatting with each other and sitting in a relaxed manner at a table",
      aspectRatio: undefined!,
    },
  },
};

export const ImageRight: Story = {
  args: {
    ...Default.args,
    image: {
      ...Default.args.image,
      position: "right",
    },
  },
};

export const Grayscale: Story = {
  args: {
    ...Default.args,
    image: {
      ...Default.args.image,
      grayscale: true,
    },
  },
};
