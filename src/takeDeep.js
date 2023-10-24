import { InheritScopeMixin, Tree } from "@graphorigami/origami";
import JsMapTree from "./JsMapTree.js";

export default async function takeDeep(treelike, count) {
  const tree = await Tree.from(treelike);
  const { map } = await traverse(tree, count);
  const result = new (InheritScopeMixin(JsMapTree))(map);
  result.parent = this;
  return result;
}

async function traverse(tree, count) {
  const map = new Map();
  for (const key of await tree.keys()) {
    if (count === 0) {
      break;
    }
    let value = await tree.get(key);
    if (Tree.isAsyncDictionary(value)) {
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
