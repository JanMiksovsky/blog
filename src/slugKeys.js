import { MapInnerKeysTree, Tree } from "@graphorigami/origami";

export default function (graphable) {
  function getSlug(value, outerKey) {
    // HACK: leave year keys unchanged
    if (outerKey.length === 4) {
      return outerKey;
    }
    return Tree.traversePath(value, "slug");
  }
  return new MapInnerKeysTree(graphable, getSlug, {
    deep: true,
  });
}
