/**
 * Given the basic set of information in a post document, return a new document
 * with additional information.
 */
export default async function postData(document, filename, year) {
  const slug = postSlug(filename);

  const dateRegex = /^(?<month>\d\d)-(?<day>\d\d) (?<title>.+).html$/;
  const match = filename.match(dateRegex);
  if (!match) {
    console.error(
      `Filename doesn't start with a date in MM-DD format: ${filename}`
    );
  }
  const { month, day } = match.groups;

  const formattedDate = formatDate(year, month, day);
  const path = `/posts/${year}/${slug}`;
  const augmented = Object.create(document);
  return Object.assign(augmented, {
    formattedDate,
    path,
    slug,
    year,
  });
}

function formatDate(year, month, day) {
  const date = new Date(Date.parse(`${year}-${month}-${day} PST`));
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

function postDate(dateText) {
  if (!dateText) {
    return undefined;
  }
  const date = new Date(`${dateText} PST`);
  return date;
}
