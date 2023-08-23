import {
  DictionaryHelpers,
  GraphHelpers,
  InheritScopeTransform,
} from "@graphorigami/origami";
import JsMapGraph from "./JsMapGraph.js";

export default async function takeDeep(variant, count) {
  const graph = await GraphHelpers.from(variant);
  const { map } = await traverse(graph, count);
  const result = new (InheritScopeTransform(JsMapGraph))(map);
  result.parent = this;
  return result;
}

async function traverse(graph, count) {
  const map = new Map();
  for (const key of await graph.keys()) {
    if (count === 0) {
      break;
    }
    let value = await graph.get(key);
    if (DictionaryHelpers.isAsyncDictionary(value)) {
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
