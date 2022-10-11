export default function groupByMonth(posts) {
  const result = {};
  for (const key of Object.keys(posts)) {
    const regex = /^(\d{4}-\d{2})/;
    const match = key.match(regex);
    if (match) {
      const month = match[1];
      if (!result[month]) {
        result[month] = {};
      }
      result[month][key] = posts[key];
    } else {
      console.error(`Could not parse date from ${key}`);
    }
  }
  return result;
}
