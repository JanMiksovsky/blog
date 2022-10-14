import { ExplorableGraph } from "@graphorigami/origami";

export default async function takeDeep(variant, count) {
  const graph = await ExplorableGraph.from(variant);
  const { result } = await traverse(graph, count);
  return ExplorableGraph.from(result);
}

async function traverse(graph, count) {
  const result = {};
  for await (const key of graph) {
    if (count === 0) {
      break;
    }
    const value = await graph.get(key);
    if (ExplorableGraph.isExplorable(value)) {
      const traversed = await traverse(value, count);
      result[key] = traversed.result;
      count = traversed.count;
    } else {
      result[key] = value;
      count--;
    }
  }
  return { result, count };
}
