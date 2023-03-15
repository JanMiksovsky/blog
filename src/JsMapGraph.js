export default class JsMapGraph {
  constructor(map) {
    this.map = map;
  }

  async get(key) {
    let value = this.map.get(key);
    if (value instanceof Map) {
      value = new this.constructor(value);
    }
    return value;
  }

  async keys() {
    return this.map.keys();
  }
}
