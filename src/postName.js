import { extractFrontMatter } from "@graphorigami/origami";

export default function postName(post) {
  const { frontData } = extractFrontMatter(post);
  let { title, date } = frontData;

  // Remove some characters
  title = title.replace(/[:\?\!|...]/g, "");

  const parts = date.split(" ");
  if (parts.length > 1) {
    date = parts[0];
  }

  const name = `${date} ${title}.html`;
  return name;
}
