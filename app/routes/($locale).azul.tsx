import { Carousel } from "~/components/carousel";

export default function Route() {
  return (
    <Carousel
      items={[
        {
          src: "358685842_17937739007690648_2983057103105632929_n.jpg?updatedAt=1703702151179&tr=ar-4-3,w-1600",
          alt: "Atrium of La Puerta Azul",
          title: { text: "La Puerta Azul", position: "bottom-right" },
          position: "bottom",
        },
      ]}
    />
  );
}
