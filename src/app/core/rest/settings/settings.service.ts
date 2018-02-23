import {TerraBaseService, TerraLoadingSpinnerService} from "@plentymarkets/terra-components";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {PluginDataInterface} from "./data/plugin-data.interface";
/**
 * Created by ninoplettenberg on 22.02.18.
 */

@Injectable()
export class SettingsService extends TerraBaseService
{
    private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU5ZGU1NzNmODRhMjU3NjUyYTJiMzUxNzc1ZTE3OTIxMGZjYzZiODRkNzk5ZTBiNTc3NTA3NjUxOWY1ZTQ4ZDQzNWJjNDhjNTgxNjViNDNkIn0.eyJhdWQiOiIxIiwianRpIjoiZTlkZTU3M2Y4NGEyNTc2NTJhMmIzNTE3NzVlMTc5MjEwZmNjNmI4NGQ3OTllMGI1Nzc1MDc2NTE5ZjVlNDhkNDM1YmM0OGM1ODE2NWI0M2QiLCJpYXQiOjE1MTkzNzUwMDQsIm5iZiI6MTUxOTM3NTAwNCwiZXhwIjoxNTE5NDYxNDA0LCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.XMzVRQOTPEgcwez7I24Bm6Xp18lmb7K6ZHWdzSoR5X0mMH7DADxW_5es_1eBsQA1nOeT4Xl3GrNBxzD9NTPVXzzXLQrPXovZs--XU4p3LyMJFhW_FCmbi_JSEndq7clWQP2g7GgBCn5xSG_fJhJzFE08rxNtz-W8Xd-XztVY3rzZsTClOtQ6cYCWX8dvQGGgHX5HsJSrBRSemrafAbOEZhOEWLQ5SqyVIZbCjstJx9GOu4o5zRguCyackM6ZLDUoYmuUysjZsR7253dC0ORffNRK6Q0jWyBG5cPt2OjofOgWdfOKNICUn96oQVspbBpZMublkP3q8zAtfk0yI2mi50M63_Ppk0CA24kTggDbOnywPSf0E7jiiAHUvSIJ61wse6Dw_YJ8OnH5bilgW2NoK7_ayPpQxOez3P_GKu8FYGnZPDG0vWwRm-mZQvuY6-lvtQJ6--Tnn6mis8kDVVoqnA0MghzBADbsYPgD9PT8gliYhnITisvV57Tz2fn3zW1BfRPGrEoNoHBbZfPpW9VroN-PQuebR0MwwsjQUgYDMmXVt3Cv4Uy-p3jYlehfZQBYIRJgdz7X_q7-lwy5YXkVBB34Gybpyao8h2ifzARdbYl9lSsjRp4UTke1Ri-WwljkBUf1NOjxvo-AhvKFAJ7wKrdvlrVn1lBqGiZEuCEmh3E';

    constructor(private _loadingSpinnerService:TerraLoadingSpinnerService,
                private _http:Http)
    {
        super(_loadingSpinnerService, _http, '/rest/fulfillment/pickByLight/settings');

        this.setAuthorization();

        if(process.env.ENV !== 'production')
        {
            this.url = 'http://master.plentymarkets.com' + this.url;

            this.headers.set('Authorization', 'Bearer ' + this.token);
        }
    }

    public getConfigForWarehouse(id:string) : Observable<PluginDataInterface>
    {
        let url = this.url + '?warehouseId=' + id;

        return this.mapRequest(
            this.http.get(url,{
                headers: this.headers,
                body: ''
            })
        );
    }

    public saveConfigForWarehouse(content: PluginDataInterface) : Observable<any>
    {
        let url = this.url;

        return this.mapRequest(
            this.http.post(url, {
                warehouseId: Number(content.warehouseId),
                settings: content.settings,
                config: content.config
            },
            {
                headers: this.headers
            })
        );
    }

}