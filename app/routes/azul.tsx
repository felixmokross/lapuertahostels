import { Carousel } from "~/components/carousel";
import { Heading, HeadingHighlight } from "~/components/heading";

export default function Route() {
  return (
    <>
      <Carousel
        items={[
          {
            src: "358685842_17937739007690648_2983057103105632929_n.jpg?updatedAt=1703702151179&tr=ar-4-3,w-1600",
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
            src: "370249812_17944730015690648_6797462358499013504_n.jpg?updatedAt=1703702170880&tr=ar-4-3,w-1600",
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
