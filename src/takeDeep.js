import { MapTree, Tree } from "@weborigami/async-tree";
import { Scope } from "@weborigami/language";

export default async function takeDeep(treelike, count) {
  const tree = await Tree.from(treelike);
  let { tree: result } = await traverse(tree, count);
  if (this) {
    result = Scope.treeWithScope(result, this);
  }
  return result;
}

async function traverse(tree, count) {
  const map = new Map();
  for (const key of await tree.keys()) {
    if (count === 0) {
      break;
    }
    let value = await tree.get(key);
    if (Tree.isAsyncTree(value)) {
      const traversed = await traverse(value, count);
      value = traversed.tree;
      count = traversed.count;
    } else {
      count--;
    }
    map.set(key, value);
  }
  return {
    tree: new MapTree(map),
    count,
  };
}
