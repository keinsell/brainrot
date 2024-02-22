import { resolvePath } from "@typespec/compiler";
import { createTestLibrary, TypeSpecTestLibrary } from "@typespec/compiler/testing";
import { fileURLToPath } from "url";

export const 20240221TypespecTestLibrary: TypeSpecTestLibrary = createTestLibrary({
  name: "20240221-typespec",
  packageRoot: resolvePath(fileURLToPath(import.meta.url), "../../../../"),
});
