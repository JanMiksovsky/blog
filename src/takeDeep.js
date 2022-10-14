import { ExplorableGraph } from "@graphorigami/origami";

export default async function takeDeep(variant, count) {
  const graph = await ExplorableGraph.from(variant);
  const { result } = await traverse(graph, count);
  return result;
}

async function traverse(graph, count) {
  const keys = [];
  const values = [];
  for await (const key of graph) {
    if (count === 0) {
      break;
    }
    let value = await graph.get(key);
    if (ExplorableGraph.isExplorable(value)) {
      const traversed = await traverse(value, count);
      value = traversed.result;
      count = traversed.count;
    } else {
      count--;
    }
    keys.push(key);
    values.push(value);
  }
  const result = new EntriesGraph(keys, values);
  return { result, count };
}
