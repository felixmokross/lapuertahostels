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
        src="tr:ar-16-9,w-800/experiences/tayrona/images_1684813711570.jpg?updatedAt=1714264025241"
        className="aspect-[16/9] w-96"
      />
      <Paragraph>This is a description.</Paragraph>
    </>
  );
}
