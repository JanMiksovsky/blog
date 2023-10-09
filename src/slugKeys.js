import { Graph, MapInnerKeysGraph } from "@graphorigami/origami";

export default function (graphable) {
  function getSlug(value, outerKey) {
    // HACK: leave year keys unchanged
    if (outerKey.length === 4) {
      return outerKey;
    }
    return Graph.traversePath(value, "slug");
  }
  return new MapInnerKeysGraph(graphable, getSlug, {
    deep: true,
  });
}
