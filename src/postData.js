import { TextDocument } from "@graphorigami/origami";

/**
 * Given the basic set of information in a post document, return a new document
 * with additional information.
 */
export default async function postData(document, filename) {
  const data = await document.unpack();

  const slug = postSlug(filename);
  const year = postYear(data.date);
  const path = `/posts/${year}/${slug}`;

  const expanded = Object.assign(
    {
      formattedDate: formatDate(data.date),
      path,
      slug,
      year,
    },
    data
  );
  return new TextDocument(String(document), expanded, document.parent);
}

function formatDate(dateText) {
  const date = new Date(Date.parse(`${dateText} PST`));
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "America/Los_Angeles",
    year: "numeric",
  });
}

// This gets called for the year keys too, but happily it returns the year
// unchanged.
function postSlug(filename) {
  if (filename === "index.md" || filename === "index.html") {
    // No slug for index page
    return undefined;
  }
  let slug = filename.toLowerCase();
  // Remove some characters
  slug = slug.replace(/['’]/, "");
  // Replace runs of other characters with a hyphen
  slug = slug.replace(/[^\w\.]+/g, "-");
  // Remove trailing hyphen
  if (slug.endsWith("-")) {
    slug = slug.slice(0, -1);
  }
  return slug;
}

function postYear(dateText) {
  if (!dateText) {
    return undefined;
  }
  const date = new Date(`${dateText} PST`);
  return date.getFullYear();
}
