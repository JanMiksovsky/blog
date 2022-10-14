import { MapKeysValuesGraph } from "@graphorigami/origami";
import postSlug from "./postSlug.js";

class PostSlugs extends MapKeysValuesGraph {
  constructor(variant, mapFn = null, options = { deep: true }) {
    super(variant, mapFn, options);
  }

  async innerKeyForOuterKey(outerKey) {
    for await (const key of this.graph) {
      if (postSlug(key) === outerKey) {
        return key;
      }
    }
    return outerKey;
  }

  async outerKeyForInnerKey(innerKey) {
    return postSlug(innerKey);
  }
}

export default function (variant) {
  return new PostSlugs(variant);
}
