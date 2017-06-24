import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {App} from "./app.component";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./app.routes";

import {AppState} from "./core/services/app-state.service";
import {DataService} from "./core/services/data.service";
import {HttpModule} from "@angular/http";
import {CustomPreloadingStrategy} from "./core/model/custom-preloading-strategy-routes.model";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        CoreModule,
        RouterModule.forRoot(ROUTES, {
            useHash: true,
            preloadingStrategy: CustomPreloadingStrategy
        })
    ],
    declarations: [App],
    bootstrap: [App],
    providers: [
        CustomPreloadingStrategy,
        AppState,
        DataService
    ]
})
export class AppModule {
}