import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
declare const log: any;

export class HttpBase {

    public location: string;
    private replayStack: Object = {};

    constructor(protected http: Http) {
        this.location = `${location.protocol}//${location.host}${location.pathname}`;
    }

    public httpRequest(type: string, url: string, params: Map<string, string[]> | any, cache: boolean) {
        let headers: Headers = this.setHeaders();
        let body: URLSearchParams = this.validateSearchParams(params, cache);
        let queryParams = this.paramsChange(type, body);
        let requestObject = this.http[type.toLocaleLowerCase()](url, queryParams, {headers: headers});

        log.debug(`${type.toUpperCase()}-request: ${this.location}${url}?${body.toString()}`)();

        return requestObject
            .catch(err => this.handleErrorBadRequest(err, requestObject))
            .map(this.extractDataJSON)
            .catch(this.handleError);
    }

    private setHeaders(): Headers {
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return headers;
    }

    private validateSearchParams(args = {}, cache: boolean = true): URLSearchParams {
        let searchParams = new URLSearchParams();

        for (let option in args) {
            if (args.hasOwnProperty(option)) {
                let paramIsNotRedundant = !(args[option] === null || args[option] === undefined);
                if (paramIsNotRedundant) {
                    searchParams.append(option, args[option]);
                }
            }
        }

        if (!cache) {
            searchParams.append("timeStamp", this.getTime());
        }

        return searchParams;
    }

    private paramsChange(type: string, params: URLSearchParams): any {
        let body: any = {};

        if (type === "get") {
            body = {search: params};
        } else if (type === "post") {
            body = params.toString();
        }

        return body;
    }

    private needReplayRequest(url) {
        let count = 0;

        if (!this.replayStack.hasOwnProperty(url)) {
            this.replayStack[url] = count = 1;
        } else {
            this.replayStack[url]++;
            count = this.replayStack[url];
        }

        return count <= 2;
    }

    private clearReplayRequest(url) {
        if (this.replayStack.hasOwnProperty(url)) {
            delete this.replayStack[url];
        }
    }

    private getTime(): string {
        return String((new Date()).valueOf().toString());
    }

    protected extractDataJSON(res: Response) {
        let body = {};
        let authIsCanceled = res.url.indexOf("/auth/") != -1;

        if (authIsCanceled) {
            window.location.replace(`${res.url.split('?')[0]}login.html`);
        } else if (res.status == 200) {
            body = res.json();
        }

        return body;
    }

    protected handleError(error: Response | any) {
        let errMsg: string = "ui_another";
        log.error()(error);
        if ((error || {}).hasOwnProperty("status")) {
            if (error["status"] === 502) {
                errMsg = "ui_bad_gateway";
            }
        }

        return Observable.throw(errMsg);
    }

    protected handleErrorBadRequest(error: Response, requestObject) {
        if (error.status === 502) {
            let allow = this.needReplayRequest(error.url);
            if (allow) {
                return requestObject;
            }
        } else {
            this.clearReplayRequest(error.url);
        }
    }

}