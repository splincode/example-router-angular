import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-goo',
    template: `
  <h1>Hello Goo</h1>
  <router-outlet></router-outlet>`
})
export class GooComponent {
    constructor(activatedRoute: ActivatedRoute) {
        // Router.resetConfig() cannot be used here
        // because child route config in lazy module cannot be seen by using Router.
        activatedRoute.routeConfig.children = [
            {
                //path: "boo", component: BooComponent
            }
        ];
    }
}

@NgModule({
    imports:      [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: GooComponent }
        ])
    ],
    declarations: [ GooComponent ],
    //entryComponents: [ ]
})
export default class GooModule { }