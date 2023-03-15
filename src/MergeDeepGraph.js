export default class MergeDeepGraph {
  constructor(...graphs) {
    this.graphs = graphs;
  }

  async get(key) {
    const explorableValues = [];
    for (const graph of this.graphs) {
      const value = await graph.get(key);

      const isExplorable =
        typeof value?.[Symbol.asyncIterator] === "function" &&
        typeof value?.get === "function";

      if (value !== undefined) {
        if (isExplorable) {
          explorableValues.push(value);
        } else {
          return value;
        }
      }
    }

    return explorableValues.length === 0
      ? undefined
      : explorableValues.length === 1
      ? explorableValues[0]
      : new this.constructor(...explorableValues);
  }

  async keys() {
    const keys = new Set();
    for (const graph of this.graphs) {
      for (const key of await graph.keys()) {
        keys.add(key);
      }
    }
    return keys;
  }
}
