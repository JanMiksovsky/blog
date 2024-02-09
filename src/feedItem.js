export default async function feedItem(document) {
  const { date, path } = document;
  // const content_html = String(document);
  const content_html = document["@text"];

  // Date will not have time zone; shift to Pacific time.
  const date_published = new Date(Date.parse(`${date} PST`));
  const url = `https://jan.miksovsky.com${path}`;

  const title = document.title || document.extractedTitle;

  return {
    content_html,
    date_published,
    id: url,
    url,
    title,
  };
}
