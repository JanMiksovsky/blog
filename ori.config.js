import { FileTree, merge } from "@graphorigami/async-tree";
import { ImportModulesMixin } from "@graphorigami/language";
import { builtins, CommandModulesTransform } from "@graphorigami/origami";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const toolsPath = path.resolve(dirname, "tools");
const tools = new (CommandModulesTransform(ImportModulesMixin(FileTree)))(
  toolsPath
);

const config = merge(builtins, tools);
export default config;
