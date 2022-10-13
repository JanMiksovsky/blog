export default function formatDate(dateText) {
  const date = new Date(dateText);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
