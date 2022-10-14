export default async function foo() {
  const path = await this.get("@path");
  // const path = await this.get("@key");
  // const path = "foo";
  return path;
}
