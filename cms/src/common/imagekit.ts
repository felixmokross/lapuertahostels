import Imagekit from "imagekit";

export function getImageKit() {
  return new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.PAYLOAD_PUBLIC_IMAGEKIT_BASE_URL,
  });
}
