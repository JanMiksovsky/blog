import { Tree } from "@graphorigami/async-tree";
import { Scope } from "@graphorigami/language";
import { MapInnerKeysTree } from "@graphorigami/origami";

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
    mappedTree = Scope.treeWithScope(mappedTree, this);
  }
  return mappedTree;
}
