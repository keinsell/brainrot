import {bootstrap}                     from "./bootstrap.js"
import {prettyPrintServiceInformation} from "./utilities/candies/service-information.js"
import {printSystemInfo}               from "./utilities/candies/system-information.js"



printSystemInfo()
prettyPrintServiceInformation()

await bootstrap();

