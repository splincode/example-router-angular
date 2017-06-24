// import javascript
import "reflect-metadata";
import "ts-helpers";
import "zone.js/dist/zone";
const PROD = false;

if (!PROD) {
    Error.stackTraceLimit = Infinity;
    require("zone.js/dist/long-stack-trace-zone");
}