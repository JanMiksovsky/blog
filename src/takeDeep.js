import { MapTree, Tree, treeWithScope } from "@graphorigami/origami";

export default async function takeDeep(treelike, count) {
  const tree = await Tree.from(treelike);
  const { map } = await traverse(tree, count);
  let result = new MapTree(map);
  if (this) {
    result = treeWithScope(result, this);
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
      value = traversed.map;
      count = traversed.count;
    } else {
      count--;
    }
    map.set(key, value);
  }
  return { map, count };
}
