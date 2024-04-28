import { MetaFunction } from "@remix-run/node";
import { Carousel } from "~/components/carousel";
import { Heading, HeadingHighlight } from "~/components/heading";

export const meta: MetaFunction = () => {
  return [
    { title: "LA PUERTA AZUL" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Route() {
  return (
    <>
      <Carousel
        items={[
          {
            src: "azul/piscina/10.jpg?updatedAt=1714162021839&tr=ar-4-3,w-1600",
            alt: "Atrium of La Puerta Azul",
            title: {
              text: (
                <>
                  Relax in a<br />
                  <HeadingHighlight>Stunning Atrium</HeadingHighlight>{" "}
                </>
              ),
              position: "bottom-right",
            },
            position: "bottom",
          },
          {
            src: "azul/piscina/_DSC0299.jpg?updatedAt=1714162023408&tr=ar-4-3,w-1600",
            alt: "Room view of La Puerta Azul",
            title: {
              text: (
                <>
                  Enjoy Our{" "}
                  <HeadingHighlight>Comfortable Rooms</HeadingHighlight>
                </>
              ),
              position: "bottom-left",
            },
          },
          {
            src: "azul/piscina/6.jpg?updatedAt=1714162022776",
            alt: "Room view of La Puerta Azul",
            title: {
              text: (
                <>
                  Enjoy Our{" "}
                  <HeadingHighlight>Comfortable Rooms</HeadingHighlight>
                </>
              ),
              position: "bottom-left",
            },
          },
          {
            src: "azul/delux%20king%20room%20with%20terrace/_dsc0989.jpg?updatedAt=1714162269331",
            alt: "Room view of La Puerta Azul",
            title: {
              text: (
                <>
                  Enjoy Our{" "}
                  <HeadingHighlight>Comfortable Rooms</HeadingHighlight>
                </>
              ),
              position: "bottom-left",
            },
          },
        ]}
      />
      <div className="mx-auto mt-24 max-w-4xl">
        <Heading as="h2" size="large">
          Welcome to Your Vacation Home
        </Heading>
      </div>
    </>
  );
}
