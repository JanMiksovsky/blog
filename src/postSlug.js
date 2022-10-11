import { extractFrontMatter } from "@graphorigami/origami";

export default function postSlug(post) {
  const { frontData } = extractFrontMatter(post);
  const { title, date } = frontData;
  let slug = title.toLowerCase();
  // Remove some characters
  slug = slug.replace(/['’\.]/, "");
  // Replace runs other characters with a hyphen
  slug = slug.replace(/\W+/g, "-");
  // Remove trailing hyphen
  if (slug.endsWith("-")) {
    slug = slug.slice(0, -1);
  }
  return slug;
}
