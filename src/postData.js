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
  const markdown = isDocument ? document["_body"] : toString(document);
  const rawTitle = isDocument && document.title ? document.title : undefined;
  const title = rawTitle ? stripHashTags(rawTitle) : undefined;
  const draft = isDocument && document.draft;

  const html = await mdHtml(markdown);

  const text = strip(markdown);
  const description = title ? extractFirstSentence(text) : undefined;
  const extractedTitle = !title ? extractTitle(text) : undefined;

  let socialTitle = rawTitle ?? extractedTitle;
  if (isDocument && document.tags) {
    socialTitle += " " + document.tags;
  }

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
  const isoDate = date.toISOString();
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

  // If the post has an image, use it as the preview. Alternatively, if the post
  // is from the recent markdown era, generate a preview image.
  let previewSlug;
  let previewUrl;
  let generatePreview = false;
  const rawImagePath = extractFirstImage(html);
  const imagePath = rawImagePath ? decodeURIComponent(rawImagePath) : null;
  if (imagePath) {
    generatePreview = true;
  } else {
    // No image; look for an embedded video.
    const videoId = extractFirstVideoId(html);
    if (videoId) {
      // Use preview image from YouTube.
      previewUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } else if (year >= 2023) {
      // Recent post
      generatePreview = true;
    }
  }

  if (generatePreview) {
    previewSlug = postSlug.replace(/\.html$/, ".png");
    previewUrl = `https://jan.miksovsky.com/previews/${year}/${previewSlug}`;
  }

  return Object.assign(
    {
      date,
      draft,
      isoDate,
      formattedDate,
      html,
      path,
      slug: postSlug,
      socialTitle,
      text,
      url,
      year,
    },
    description && { description },
    extractedTitle && { extractedTitle },
    imagePath && { imagePath },
    previewSlug && { previewSlug },
    previewUrl && { previewUrl },
    title && { title }
  );
}

function extractFirstImage(html) {
  const imageRegex =
    /<img\s+src="\/(?<src>images\/[^"]+(?:.avif|.png|.jpe?g|.webp))"/;
  const imageMatch = html.match(imageRegex);
  return imageMatch?.groups?.src;
}

function extractFirstVideoId(html) {
  const videoRegex = /src="https:\/\/www.youtube.com\/embed\/(?<id>[\w\d]+)"/;
  const videoMatch = html.match(videoRegex);
  return videoMatch?.groups?.id;
}

function extractFirstSentence(text) {
  const sentenceEnd = text.search(/[\.\?\!]/);
  return sentenceEnd >= 0 ? text.slice(0, sentenceEnd + 1) : null;
}

function extractTitle(text) {
  // Find the position of the first sentence-final punctuation mark in the first
  // 160 characters.
  const firstSentence = extractFirstSentence(text);
  if (firstSentence && firstSentence.length <= 160) {
    // Remove final punctuation.
    return firstSentence.slice(0, -1);
  }

  // Find the first interior punctuation mark in the first 160 characters.
  const interiorPunctuation = text.search(/[,;:–—]/);
  if (interiorPunctuation >= 0 && interiorPunctuation < 160) {
    // Don't include the punctuation in the title.
    return text.slice(0, interiorPunctuation);
  }

  // Find the first word boundary between characters 80 and 160.
  const wordBoundary = text.slice(80, 160).search(/\s/);
  if (wordBoundary >= 0) {
    return text.slice(0, wordBoundary + 80);
  }

  // Last choice: use the first 80 characters.
  return text.slice(0, 80);
}

// Remove HTML, markdown, and hashtags.
function strip(markdown) {
  return (
    stripHtml(markdown) // Strip HTML
      .replace(/```[^`]+```/g, "") // Remove code blocks
      .replace(/`([^`]+)`/g, "$1") // Remove inline code formatting
      .replace(/!\[[^\]]+\]\([^)]+\)/g, "") // Remove images
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
      .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
      .replace(/\*([^*]+)\*/g, "$1") // Remove italics
      // .replace(/#(\w+)/g, "$1") // Remove hashtags
      .trim()
  );
}

// Remove `#` from the string
function stripHashTags(text) {
  return text.replace(/#/g, "");
}

// Remove HTML tags
function stripHtml(text) {
  return text.replace(/<[^>]+>/g, "");
}
