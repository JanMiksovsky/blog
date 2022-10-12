import { extractFrontMatter } from "@graphorigami/origami";

export default async function parseFront(text) {
  const frontMatter = extractFrontMatter(text.toString());
  if (!frontMatter) {
    return undefined;
  }
  const { bodyText, frontData } = frontMatter;
  return {
    "@bodyText": bodyText,
    ...frontData,
  };
}
