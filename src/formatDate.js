export default function formatDate(dateText) {
  const date = new Date(Date.parse(`${dateText} PST`));
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "America/Los_Angeles",
    year: "numeric",
  });
}
