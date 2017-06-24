import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {InternalStateType} from "../implements/app-state-service";
import {Subject} from "rxjs/Subject";
declare const log: any;

export const FireEventType = {
    WORKSPACE_LOADED: "workspace_loaded",
};

@Injectable()
export class AppState {

    // основной поток сообщений
    private stream = new Subject<string>();

    // More info: http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    public events = this.stream.asObservable();

    public state: InternalStateType;

    constructor(public dataService: DataService) {

        this.state = {
            appLayouts: null,

            /*require(process.env.MESSAGES)*/
            localization: {},

            initialSumComponent: 0,
            taskCount: 0,
            observableInterval: null
        };

    }

    public get(prop?: any) {
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : null;
    }

    public set(prop: string, value: any) {
        return this.state[prop] = value;
    }

    public announceFireEvent(state: string) {
        this.stream.next(state);
    }

}