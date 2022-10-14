export default class JsMapGraph {
  constructor(map) {
    this.map = map;
  }

  async *[Symbol.asyncIterator]() {
    yield* this.map.keys();
  }

  async get(key) {
    let value = this.map.get(key);
    if (value instanceof Map) {
      value = new this.constructor(value);
    }
    return value;
  }
}
