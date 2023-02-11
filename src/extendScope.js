import { setScope } from "@graphorigami/origami";

export default function extendScope(graph, ...scopeGraphs) {
  const scope = this;
  return setScope.call(scope, graph, ...scopeGraphs, scope);
}
