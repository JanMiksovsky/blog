export default async function postYear(dateText) {
  const date = new Date(`${dateText} PST`);
  const year = date.getFullYear();
  return year;
}
