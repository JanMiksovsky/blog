import { MapInnerKeysGraph } from "@graphorigami/origami";
import postSlug from "./postSlug.js";

export default function (variant) {
  return new MapInnerKeysGraph(variant, postSlug, { deep: true });
}
