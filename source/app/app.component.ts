import {AbstractComponent} from "./core/model/abstract-component.model";
import {Component, Injector, ViewEncapsulation, ChangeDetectionStrategy} from "@angular/core";
import {FireEventType} from "./core/services/app-state.service";
declare const log: any;

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class App extends AbstractComponent {

    constructor(context: Injector) {
        super(context);
    }

}