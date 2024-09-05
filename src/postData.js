import { isPlainObject, isUnpackable, toString } from "@weborigami/async-tree";
import { mdHtml, slug } from "@weborigami/origami";

/**
 * Given the basic set of information in a post document, return a new document
 * with additional information.
 */
export default async function postData(document, filename, year) {
  // Some documents are plain text, others are document objects.
  if (isUnpackable(document)) {
    document = await document.unpack();
  }
  const isDocument = isPlainObject(document);
  const markdown = isDocument ? document["@text"] : toString(document);
  const title = isDocument && document.title ? document.title : undefined;

  const html = await mdHtml(markdown);

  const text = stripMarkdown(markdown);
  const extractedTitle = !title ? extractTitle(text) : undefined;

  const dateRegex = /^(?<month>\d\d)-(?<day>\d\d) (?<title>.+).md$/;
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

  const htmlFileName = filename.replace(/\.md$/, ".html");
  const postSlug = slug(htmlFileName);
  const path = `posts/${year}/${postSlug}`;
  const url = `https://jan.miksovsky.com/${path}`;

  // Find the src of the first image in the HTML.
  const imageRegex =
    /<img\s+src="\/(?<src>images\/[^"]+(?:.avif|.png|.jpe?g|.webp))"/;
  const imageMatch = text.match(imageRegex);
  const imagePath = imageMatch?.groups?.src;

  let previewSlug;
  let previewUrl;
  if (imagePath) {
    // Use first image as preview
    previewUrl = `https://jan.miksovsky.com/${imagePath}`;
  } else if (year >= 2023) {
    // Recent era markdown post; generate preview image
    previewSlug = postSlug.replace(/\.html$/, ".png");
    previewUrl = `https://jan.miksovsky.com/previews/${year}/${previewSlug}`;
  }

  return Object.assign(
    {
      date,
      formattedDate,
      html,
      path,
      slug: postSlug,
      text,
      url,
      year,
    },
    title && { title },
    extractedTitle && { extractedTitle },
    previewSlug && { previewSlug },
    previewUrl && { previewUrl }
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

// Remove Markdown formatting
function stripMarkdown(markdown) {
  return stripHtml(markdown) // Strip HTML
    .replace(/```[^`]+```/g, "") // Remove code blocks
    .replace(/`([^`]+)`/g, "$1") // Remove inline code formatting
    .replace(/!\[[^\]]+\]\([^)]+\)/g, "") // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
    .replace(/\*([^*]+)\*/g, "$1"); // Remove italics
}

// Remove HTML tags
function stripHtml(text) {
  return text.replace(/<[^>]+>/g, "");
}
