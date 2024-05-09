import { Carousel } from "~/components/carousel";
import { FeaturesSection } from "~/components/features-section";
import { HeadingHighlight } from "~/components/heading";
import { ParagraphHighlight } from "~/components/paragraph";

export function Page() {
  return (
    <>
      <Carousel
        items={[
          {
            src: "azul/piscina/10.jpg?updatedAt=1714162021839",
            alt: "Atrium of La Puerta Azul",
            position: "bottom",
            title: {
              text: (
                <>
                  Welcome to Your{" "}
                  <HeadingHighlight>Vacation Home</HeadingHighlight>
                </>
              ),
              position: "center",
              imageOverlay: "intense",
            },
          },
          {
            src: "azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
            alt: "Room view of La Puerta Azul",
          },
          {
            src: "azul/piscina/6.jpg?updatedAt=1714162022776",
            alt: "Room view of La Puerta Azul",
          },
          {
            src: "azul/delux%20king%20room%20with%20terrace/_dsc0989.jpg?updatedAt=1714162269331",
            alt: "Room view of La Puerta Azul",
          },
        ]}
        transformation={{
          aspectRatio: { width: 4, height: 3 },
          width: 1600,
        }}
      />
      <div className="mx-auto mt-12 max-w-6xl px-8 md:mt-24 lg:px-0">
        <FeaturesSection
          items={[
            {
              image: {
                src: "azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
                alt: "Example image",
              },
              title: "Feel Newborn",
              paragraphContent: (
                <>
                  A day full of exploring the city can be tiring. Our{" "}
                  <ParagraphHighlight>air-conditioned</ParagraphHighlight> rooms
                  with <ParagraphHighlight>tasteful</ParagraphHighlight> details
                  give you the perfect place to relax and unwind.
                </>
              ),
            },
            {
              image: {
                src: "azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
                alt: "Example image",
              },
              title: "Cool Down in the Pool",
              paragraphContent: (
                <>
                  Our <ParagraphHighlight>courtyard pool</ParagraphHighlight> is
                  the perfect place to cool down after a hot day under the
                  Carribean sun.
                </>
              ),
            },
            {
              image: {
                src: "azul/delux%20twin%20with%20terrace/_DSC0325.jpg?updatedAt=1714162301928",
                alt: "Example image",
              },
              title: "Bring Your Family",
              paragraphContent: (
                <>
                  Traveling with your loved ones? We offer{" "}
                  <ParagraphHighlight>Twin Rooms</ParagraphHighlight> allowing
                  an occupancy of up to four people. Perfect for your family
                  get-away.
                </>
              ),
            },
            {
              image: {
                src: "azul/piscina/10.jpg?updatedAt=1714162021839",
                alt: "Example image",
              },
              title: "A Beautiful Courtyard",
              paragraphContent: (
                <>
                  Our courtyard is the perfect place to enjoy a cocktail or two.
                  With the nice little{" "}
                  <ParagraphHighlight>pool</ParagraphHighlight> and the lush{" "}
                  <ParagraphHighlight>greenery</ParagraphHighlight>,
                  you&rsquo;ll feel like you&rsquo;re in paradise.
                </>
              ),
            },
            {
              image: {
                src: "azul/standard%20twin/_DSC0820.jpg?updatedAt=1714162321093",
                alt: "Example image",
              },
              title: "Freshen Up",
              paragraphContent: (
                <>
                  Experience our impeccably appointed bathrooms, thoughtfully
                  equipped to ensure you&rsquo;re primed for a night out in the
                  historic center or refreshed for a restful night&rsquo;s
                  sleep.
                </>
              ),
            },
            {
              image: {
                src: "azul/delux%20king%20room%20with%20terrace/_dsc0989.jpg?updatedAt=1714162269331",
                alt: "Example image",
              },
              title: "Enjoy the Morning",
              paragraphContent: (
                <>
                  Start your day right with a tinto on your{" "}
                  <ParagraphHighlight>private terrace</ParagraphHighlight> and
                  listen to Santa Marta coming to life.
                </>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
