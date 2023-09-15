import { Graph } from "@graphorigami/origami";

export default function leaves(graph) {
  return {
    async *[Symbol.asyncIterator]() {
      for await (const key of graph) {
        if (Graph.isKeyExplorable(graph, key)) {
          const value = await graph.get(key);
          if (Graph.isExplorable(value)) {
            yield* leaves(value);
          } else {
            yield key;
          }
        }
      }
    },

    async get(key) {},
  };
}
