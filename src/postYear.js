export default async function postYear(dateText) {
  if (!dateText) {
    return undefined;
  }
  const date = new Date(`${dateText} PST`);
  const year = date.getFullYear();
  return year;
}
