import {
  builtins,
  FilesGraph,
  ImplicitModulesTransform,
  MergeGraph,
} from "@graphorigami/origami";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const toolsPath = path.resolve(dirname, "tools");
const tools = new (ImplicitModulesTransform(FilesGraph))(toolsPath);

const config = new MergeGraph(builtins, tools);
export default config;
