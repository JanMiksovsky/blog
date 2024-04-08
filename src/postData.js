/**
 * Given the basic set of information in a post document, return a new document
 * with additional information.
 */
export default async function postData(document, filename, year) {
  // Some documents are plain text; upgrade them to document objects.
  if (!(typeof document === "object")) {
    document = { "@text": document };
  }

  const slug = postSlug(filename);

  const dateRegex = /^(?<month>\d\d)-(?<day>\d\d) (?<title>.+).html$/;
  const match = filename.match(dateRegex);
  if (!match) {
    console.error(
      `Filename doesn't start with a date in MM-DD format: ${filename}`
    );
  }
  const { month, day } = match.groups;

  const extractedTitle = document.title
    ? undefined
    : extractTitle(plainText(document["@text"]));

  const date = `${year}-${month}-${day}`;
  const formattedDate = formatDate(date);
  const path = `/posts/${year}/${slug}`;
  const augmented = Object.create(document);
  return Object.assign(
    augmented,
    {
      date,
      formattedDate,
      path,
      slug,
      year,
    },
    extractedTitle && { extractedTitle }
  );
}

function extractTitle(text) {
  // Find the position of the first sentence-final punctuation mark in the first
  // 80 characters.
  const sentenceEnd = text.search(/[\.\?\!]/);
  if (sentenceEnd >= 0 && sentenceEnd < 80) {
    let title = text.slice(0, sentenceEnd + 1);
    if (title.endsWith(".")) {
      // Remove trailing period.
      title = title.slice(0, -1);
    }
    return title;
  }

  // Find the first interior punctuation mark in the first 80 characters.
  const interiorPunctuation = text.search(/[,;:–—]/);
  if (interiorPunctuation >= 0 && interiorPunctuation < 80) {
    // Don't include the punctuation in the title.
    return text.slice(0, interiorPunctuation);
  }

  // Find the first word boundary between characters 40 and 80.
  const wordBoundary = text.slice(40, 80).search(/\s/);
  if (wordBoundary >= 0) {
    return text.slice(0, wordBoundary + 40);
  }

  // Last choice: use the first 40 characters.
  return text.slice(0, 40);
}

function formatDate(yyyyMmDd) {
  const date = new Date(Date.parse(`${yyyyMmDd} PST`));
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "America/Los_Angeles",
    year: "numeric",
  });
}

// Remove HTML tags
function plainText(text) {
  return text.replace(/<[^>]+>/g, "");
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
