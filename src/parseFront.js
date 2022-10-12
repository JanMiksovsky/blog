import { extractFrontMatter } from "@graphorigami/origami";

export default async function parseFront(text) {
  const { bodyText, frontData } = extractFrontMatter(text.toString());
  return {
    "@bodyText": bodyText,
    ...frontData,
  };
}
