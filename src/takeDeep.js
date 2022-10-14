import { ExplorableGraph } from "@graphorigami/origami";
import JsMapGraph from "./JsMapGraph.js";

export default async function takeDeep(variant, count) {
  const graph = await ExplorableGraph.from(variant);
  const { map } = await traverse(graph, count);
  return new JsMapGraph(map);
}

async function traverse(graph, count) {
  const map = new Map();
  for await (const key of graph) {
    if (count === 0) {
      break;
    }
    let value = await graph.get(key);
    if (ExplorableGraph.isExplorable(value)) {
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
