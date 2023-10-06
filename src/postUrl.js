import { Graph } from "@graphorigami/core";

export default async function postUrl() {
  const dateText = await Graph.traversePath(this, "_/date");
  const key = await this.get("@key");

  const date = new Date(`${dateText} PST`);
  const year = date.getFullYear();

  const url = `/posts/${year}/${key}`;
  return url;
}
