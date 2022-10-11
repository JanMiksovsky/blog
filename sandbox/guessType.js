import sharp from "sharp";

export default async function guessType(buffer) {
  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    return metadata.format;
  } catch (e) {
    return "unknown";
  }
}
