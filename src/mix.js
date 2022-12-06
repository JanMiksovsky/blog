import { MetaTransform, ObjectGraph } from "@graphorigami/origami";

export default function mix(...graphs) {
  const result = new (MetaTransform(ObjectGraph))({});
  result.parent = this;
  result.peerAdditions = graphs;
  return result;
}
