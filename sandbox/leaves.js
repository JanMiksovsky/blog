import { GraphHelpers } from "@graphorigami/origami";

export default function leaves(graph) {
  return {
    async *[Symbol.asyncIterator]() {
      for await (const key of graph) {
        if (GraphHelpers.isKeyExplorable(graph, key)) {
          const value = await graph.get(key);
          if (GraphHelpers.isExplorable(value)) {
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
