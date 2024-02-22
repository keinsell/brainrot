import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Http;
using TypeSpec.Rest;

/**
 * This is a sample server Petstore server.
 */
@service({
  title: "Pet Store Service",
  version: "2021-03-25",
})
@server("https://example.com", "Single server endpoint")
namespace PetStore;

@route("/cart")
namespace Cart {}