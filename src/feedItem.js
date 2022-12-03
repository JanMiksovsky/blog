import { ExplorableGraph } from "@graphorigami/origami";

export default async function feedItem(item) {
  const plain = await ExplorableGraph.plain(item);
  const { date, slug, title } = plain;
  const content_html = plain["@text"];

  // Date will not have time zone; shift to Pacific time.
  const date_published = new Date(`${date} GMT-7`);

  const year = date_published.getFullYear();
  const key = await this.get("@key");
  const url = `https://jan.miksovsky.com/posts/${year}/${key}`;

  return {
    content_html,
    date_published,
    id: url,
    url,
    title,
  };
}
