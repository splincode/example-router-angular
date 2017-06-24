import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {WorkspaceOutletComponent} from "./workspace-outlet/workspace-outlet.component";

const includeComponents = [
    WorkspaceOutletComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    exports: includeComponents,
    declarations: includeComponents,
})
export class CoreModule {
}