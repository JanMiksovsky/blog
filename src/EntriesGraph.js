class EntriesGraph {
  constructor(keys, values) {
    this.keys = keys;
    this.values = values;
  }

  async *[Symbol.asyncIterator]() {
    yield* this.keys;
  }

  async get(key) {
    const index = this.keys.indexOf(key);
    return index >= 0 ? this.values[index] : undefined;
  }
}
