import {Routes} from "@angular/router";
import {WorkspaceOutletComponent} from "./core/workspace-outlet/workspace-outlet.component";

export const ROUTES: Routes = [

    {
        path: '**',
        component: WorkspaceOutletComponent
    },

];
