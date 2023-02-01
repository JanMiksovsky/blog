import { ExplorableGraph } from "@graphorigami/origami";

export default function leaves(graph) {
  return {
    async *[Symbol.asyncIterator]() {
      for await (const key of graph) {
        if (ExplorableGraph.isKeyExplorable(graph, key)) {
          const value = await graph.get(key);
          if (ExplorableGraph.isExplorable(value)) {
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
