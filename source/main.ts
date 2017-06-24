import {VERSION, enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";

const PROD = false;

if (PROD) {
    enableProdMode();
}

export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === "complete") {
    main();
} else {
    document.addEventListener("DOMContentLoaded", main);
}
