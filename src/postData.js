import { slug } from "@weborigami/origami";

/**
 * Given the basic set of information in a post document, return a new document
 * with additional information.
 */
export default async function postData(document, filename, year) {
  // Some documents are plain text, others are document objects.
  const isDocument = typeof document === "object";
  const text = isDocument ? document["@text"] : document;
  const title = isDocument && document.title ? document.title : undefined;
  const extractedTitle = !title ? extractTitle(plainText(text)) : undefined;

  const dateRegex = /^(?<month>\d\d)-(?<day>\d\d) (?<title>.+).html$/;
  const match = filename.match(dateRegex);
  if (!match) {
    console.error(
      `Filename doesn't start with a date in MM-DD format: ${filename}`
    );
  }
  const { month, day } = match.groups;

  // Treat date as PST.
  const date = new Date(Date.parse(`${year}-${month}-${day} PST`));
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "America/Los_Angeles",
    year: "numeric",
  });

  const postSlug = slug(filename);
  const path = `/posts/${year}/${postSlug}`;

  return Object.assign(
    {
      date,
      formattedDate,
      path,
      slug: postSlug,
      year,
      "@text": text,
    },
    title && { title },
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

// Remove HTML tags
function plainText(text) {
  return text.replace(/<[^>]+>/g, "");
}
