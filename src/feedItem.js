import { GraphHelpers } from "@graphorigami/origami";
import path from "path";

export default async function feedItem(item) {
  const plain = await GraphHelpers.plain(item);
  const { date, slug, title } = plain;
  const content_html = String(item);

  // Date will not have time zone; shift to Pacific time.
  const date_published = new Date(Date.parse(`${date} PST`));
  const year = date_published.getFullYear();

  const key = await this.get("@key");
  const basename = path.basename(key, ".yaml");
  const keyHtml = basename + ".html";

  const url = `https://jan.miksovsky.com/posts/${year}/${keyHtml}`;

  return {
    content_html,
    date_published,
    id: url,
    url,
    title,
  };
}
