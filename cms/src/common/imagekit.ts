import Imagekit from "imagekit";

export const imagekit = new Imagekit({
  publicKey: process.env.PAYLOAD_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_BASE_URL,
});
