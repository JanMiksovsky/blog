// This gets called for the year keys too, but happily it returns the year
// unchanged.
export default function postSlug(value, filename) {
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
