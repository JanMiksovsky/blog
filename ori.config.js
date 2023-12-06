import { FileTree, merge } from "@weborigami/async-tree";
import { ImportModulesMixin } from "@weborigami/language";
import { builtins, CommandModulesTransform } from "@weborigami/origami";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const toolsPath = path.resolve(dirname, "tools");
const tools = new (CommandModulesTransform(ImportModulesMixin(FileTree)))(
  toolsPath
);

const config = merge(builtins, tools);
export default config;
