import sharp from "sharp";

export default async function guessType(buffer) {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  return metadata.format;
}
