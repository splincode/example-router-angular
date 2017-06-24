import {Injector, ChangeDetectorRef, NgZone, Input} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {AppState} from "../services/app-state.service";
import {DataService} from "../services/data.service";
declare const log: any;

export interface RouterParams {
    [key: string]: any
}

export class AbstractComponent {

    @Input() public urlRouter: string;
    @Input() public urlRouterParams: RouterParams;

    public componentName: string;
    protected appState: AppState;
    protected dataService: DataService;
    protected changeRef: ChangeDetectorRef;
    protected zone: NgZone;
    protected route: ActivatedRoute;
    protected router: Router;
    protected subscribeRouter: any;
    protected subscribeStream: boolean = true;

    constructor(context: Injector) {
        this.setContext(context);
        this.setNameComponent();
        this.subscribeRouterEvent();
    }

    @Input() set setUrlRouter(val: string) {
        this.urlRouter = val;
    }

    @Input() set setUrlRouterParams(params: RouterParams) {
        this.urlRouterParams = params;
        this.forceUpdateView();
    }

    public ngOnInit() {
        log.help(`ngOnInit: component ${this.componentName}`)();
    }

    public ngOnChanges(changes: any){
        log.help(`ngOnChanges: component ${this.componentName}`)(changes);
    }

    public ngOnDestroy(){
        this.subscribeRouter.unsubscribe();
        this.subscribeStream = false;
        log.help(`ngOnDestroy: component ${this.componentName}`)();
    }

    private setContext(context: Injector) {
        this.appState = context.get(AppState);
        this.changeRef = context.get(ChangeDetectorRef);
        this.zone = context.get(NgZone);
        this.route = context.get(ActivatedRoute);
        this.router = context.get(Router);
    }

    private setNameComponent() {
        let uid = this.generateComponentUniqueID();
        let className = this.constructor.toString().match(/\w+/g)[1];
        this.componentName = `${className}[id=${uid}]`;
    }

    private subscribeRouterEvent() {

        this.subscribeRouter = this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .subscribe((e: NavigationEnd) => {
                log.help(`ngOnChangeRouter: component ${this.componentName}`)();
                this.setUrlRouter = e.url;
                this.getRouterParams(this.route.root);
            });

    }

    private getRouterParams(currentRoute) {

        let childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach(route => {
            if (route.outlet === 'primary') {
                let routeSnapshot = route.snapshot;
                this.setUrlRouterParams = routeSnapshot.params;
                currentRoute = route;
            }
        });

    }

    private generateComponentUniqueID() {
        let uid = this.appState.get("initialSumComponent");
        this.appState.set("initialSumComponent", ++uid);
        return uid;
    }

    protected forceUpdateView(action?: Function) {
        if (action instanceof Function) {
            action();
        }

        this.changeRef.markForCheck();
        log.help(`ForceUpdateView: ${this.componentName}`)();
    }

}