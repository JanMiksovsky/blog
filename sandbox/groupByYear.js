export default function groupByMonth(posts) {
  const result = {};
  for (const key of Object.keys(posts)) {
    const regex = /^(\d{4})-(.+)$/;
    const match = key.match(regex);
    if (match) {
      const year = match[1];
      const rest = match[2];
      if (!result[year]) {
        result[year] = {};
      }
      result[year][rest] = posts[key];
    } else {
      console.error(`Could not parse date from ${key}`);
    }
  }
  return result;
}
