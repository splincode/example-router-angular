import {Component, ViewEncapsulation, ChangeDetectionStrategy, Injector} from "@angular/core";
import {AbstractComponent} from "../model/abstract-component.model";
import {FireEventType} from "../services/app-state.service";
import "rxjs/add/operator/filter";

@Component({
    selector: "workspace-outlet",
    templateUrl: "workspace-outlet.component.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceOutletComponent extends AbstractComponent {

    constructor(context: Injector) {
        super(context);
    }

    ngOnInit() {
        this.router.resetConfig([
            {
                path: "personal-area", loadChildren: "app/goo.module",
            },
            {
                path: "product", loadChildren: "app/boo.module",
            }
        ]);
    }

}