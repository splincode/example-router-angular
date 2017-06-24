import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {DataServiceRequestImpl} from "../implements/data-service-request";
import {DataServiceBase} from "../model/data-service.model";

@Injectable()
export class DataService extends DataServiceBase {

    constructor(protected http: Http) {
        super(http);
    }

    public getLayout(option: DataServiceRequestImpl) {
        this.sendOption(option, {
            url: "layout.json",
            cache: false
        });
    }

    public getCurrentListWorkSpace(option: DataServiceRequestImpl){
        this.sendOption(option, {
            url: "workspace-list.json",
            cache: false
        });
    }

    public logout(option: DataServiceRequestImpl) {
        this.sendOption(option, {
            url: "auth/logout"
        });
    }

}