import { MapInnerKeysTree, Tree, treeWithScope } from "@graphorigami/origami";

export default function (graphable) {
  function getSlug(value, outerKey) {
    // HACK: leave year keys unchanged
    if (outerKey.length === 4) {
      return outerKey;
    }
    return Tree.traversePath(value, "slug");
  }

  let mappedTree = new MapInnerKeysTree(graphable, getSlug, {
    deep: true,
  });
  if (this) {
    mappedTree = treeWithScope(mappedTree, this);
  }
  return mappedTree;
}
