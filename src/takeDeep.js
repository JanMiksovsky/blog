import { ExplorableGraph, isPlainObject } from "@graphorigami/origami";

export default async function takeDeep(variant, count) {
  const plain = await ExplorableGraph.plain(variant);
  const { result } = traverse(plain, count);
  return ExplorableGraph.from(result);
}

function traverse(obj, count) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (count === 0) {
      break;
    } else if (isPlainObject(value)) {
      const traversed = traverse(value, count);
      result[key] = traversed.result;
      count = traversed.count;
    } else {
      result[key] = value;
      count--;
    }
  }
  return { result, count };
}
