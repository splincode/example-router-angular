declare const log, window: any;

import {VERSION, enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";

const PROD = process.env["TYPE"] === "production";
log.info("Angular version: ")(VERSION.full);

if (PROD) {
    enableProdMode();
}

export function main() {
    let app = document.getElementById("ng-app");
    let time = performance.timing;

    window.onload = () => {
        app.className = app.className.concat(" loaded initial-state page-loader-none");
        setTimeout(() => {
            let appTime = time.loadEventEnd - time.responseEnd;
            let ceilTime = +Math.round(appTime / 1000).toFixed(2);
            log.info(`Application loading time: ${appTime}ms \u2243 ${ceilTime}s`)();
        }, 250);
    };

    return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === "complete") {
    main();
} else {
    document.addEventListener("DOMContentLoaded", main);
}