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
    private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI4ZGU4OWQ5OWRhNmI1YjQyNGM2Nzk2MDRhNWZmNTM2ZTFkMGFkYzJjNThhMDEyNjQyY2YxYjlkNDI5MGRhMTI4MGZlZWNhNDE0NTRmNTk0In0.eyJhdWQiOiIxIiwianRpIjoiYjhkZTg5ZDk5ZGE2YjViNDI0YzY3OTYwNGE1ZmY1MzZlMWQwYWRjMmM1OGEwMTI2NDJjZjFiOWQ0MjkwZGExMjgwZmVlY2E0MTQ1NGY1OTQiLCJpYXQiOjE1MTkyODgyMTQsIm5iZiI6MTUxOTI4ODIxNCwiZXhwIjoxNTE5Mzc0NjEzLCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.q1117s-ZJBW6UDXMEEl4GBVbB25FpXMDGlSIdj7MTaHzExhOEOzHcGJ-Nghxy6p2DuLxjpqdMj8sVE52zGE7jS3z995IHa8Kol18yyFKM5UFSnSF9EnidJC6WJC6q2nF2K72Wy3VsBYuabACR2TGXgL8WO4M7awYQfiRsc0eEd9OnQShEGNCawy4Oy6x2lWrKfYL_9nFY_FG2Vx5CtrKiE7D-QTK0ASwwBFYWdVfQBL2XrPqWUkmWDU-2HUWtjLfxqVeCw_bkHwM38F6Elrdu9lF2yeh8uscPYUBRLjbPXmAU6NGrp0IPZZapakQVarIqbFhX3k3aMRsdzeQcdv3OccAkDCnUkLXjxPM-vmkaiFShfJT5AX32qldmx-gmW6TBL4Uf2i1qN_opwqLVoMO0yZWXLex679uSdnqPqPunYFwWQIU4xFXagychnFNGDdIVk3SThRS4HPfDsWlCjQ-y3YkpY3Fy5CW1fdQTmdfqr8c8gw3XKc5C7jjo0pwqfWsQWN88WM0Zi8wDTTdvG4_t-2o6dm798qSwISAjVy6LnqOHlQEiOJLphfmYk8ABDl00lUdh6Mrdxh7HB_bS0XdMsnFAmmR98A0iVYJ7o0HvUWQe7He_V55r-Tot3Ins0HWFacWpo8A9A2SCg1ye7bGkxPcPXCj9EByt5KoBY2D3M8';

    constructor(private _loadingSpinnerService:TerraLoadingSpinnerService,
                private _http:Http)
    {
        super(_loadingSpinnerService, _http, '');

        this.setAuthorization();

        if(process.env.ENV !== 'production')
        {
            this.url = 'http://master.plentymarkets.com' + this.url;

            this.headers.set('Authorization', 'Bearer ' + this.token);
        }
    }

    public getConfigForWarehouse(id:string) : Observable<PluginDataInterface>
    {
        let url = this.url + '/' + id;

        return this.mapRequest(
            this.http.get(url,{
                headers: this.headers,
                body: ''
            })
        );
    }

    public saveConfigForWarehouse(id: string, content: PluginDataInterface) : Observable<any>
    {
        let url = this.url + '/' + id;

        return this.mapRequest(
            this.http.post(url, {
                header: this.headers,
                body: content
            })
        );
    }

}