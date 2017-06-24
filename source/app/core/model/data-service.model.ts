import {Http} from "@angular/http";
import {DataServiceRequestImpl} from "../implements/data-service-request";
import {HttpBase} from "./http.model";
declare const log: any;

export class DataServiceBase extends HttpBase {

    protected host: string = "api";

    constructor(protected http: Http) {
        super(http);
    }

    private dataRequest(option: DataServiceRequestImpl) {
        let {type = "get", url, params = {}, cache = true} = option;

        return this.httpRequest(type, url, params, cache).subscribe(
            data => this.handleSuccessDataRequest(data, type, option),
            error => this.handleErrorDataRequest(error, option)
        );
    }

    private handleSuccessDataRequest(data: any, type, option: DataServiceRequestImpl) {
        log.debug(`${type.toUpperCase()}-request: show response`)();
        log.debug(data)();

        if (option.hasOwnProperty("success")) {
            option.success(data);
        } else {
            throw new Error("not found success");
        }
    }

    private handleErrorDataRequest(err: any, option: DataServiceRequestImpl) {
        if (option.hasOwnProperty("failed")) {
            option.failed(err);
        } else {
            throw new Error(err);
        }
    }

    protected sendOption(option, args){
        this.dataRequest(Object.assign(option || {}, args));
    }

}