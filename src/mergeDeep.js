import MergeDeepGraph from "./MergeDeepGraph.js";

export default function mergeDeep(...graphs) {
  return new MergeDeepGraph(...graphs);
}
