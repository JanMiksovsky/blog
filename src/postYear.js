export default async function postYear() {
  const dateText = await this.get("date");
  const date = new Date(`${dateText} PST`);
  const year = date.getFullYear();
  return year;
}
