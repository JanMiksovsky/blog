export default class MergeDeepGraph {
  constructor(...graphs) {
    this.graphs = graphs;
  }

  async *[Symbol.asyncIterator]() {
    const keys = new Set();
    for (const graph of this.graphs) {
      for await (const key of graph) {
        if (!keys.has(key)) {
          keys.add(key);
          yield key;
        }
      }
    }
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
}
