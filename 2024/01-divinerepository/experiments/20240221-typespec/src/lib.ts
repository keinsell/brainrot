import { createTypeSpecLibrary } from "@typespec/compiler";

export const $lib = createTypeSpecLibrary({
  name: "20240221-typespec",
  diagnostics: {},
});

export const { reportDiagnostic, createDiagnostic } = $lib;
