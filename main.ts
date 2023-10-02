import process     from "process"
import {bootstrap} from "./src";

console.log(process.env["DATABASE_URI"])

await bootstrap();
