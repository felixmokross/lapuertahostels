import { Heading } from "~/components/heading";
import { Image } from "~/components/image";
import { Paragraph } from "~/components/paragraph";

export function Page() {
  return (
    <>
      <Heading as="h1" size="extra-large">
        Tayrona National Park
      </Heading>
      <Image
        src="https://ik.imagekit.io/lapuertahostels/experiences/tayrona/images_1684813711570.jpg?updatedAt=1714264025241"
        alt="Tayrona"
        className="aspect-[16/9] w-96"
        transformation={{
          aspectRatio: { width: 16, height: 9 },
          width: 800,
        }}
      />
      <Paragraph>This is a description.</Paragraph>
    </>
  );
}
