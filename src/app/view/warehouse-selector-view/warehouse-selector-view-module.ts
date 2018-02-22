import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslationModule} from "angular-l10n";
import {TerraComponentsModule} from "@plentymarkets/terra-components/app";
import {WarehouseSelectorViewComponent} from "./warehouse-selector-view.component";
import {WarehouseDetailViewModule} from "../warehouse-detail-view/warehouse-detail-view.module";
/**
 * Created by ninoplettenberg on 22.02.18.
 */

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        TranslationModule.forRoot(),
        TerraComponentsModule.forRoot(),
        WarehouseDetailViewModule.forRoot()
    ],
    declarations:[
        WarehouseSelectorViewComponent,
    ]
})
export class WarehouseSelectorViewModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule: WarehouseSelectorViewModule
        }
    }

    static getMainComponent():string
    {
        return 'WarehouseSelectorViewComponent';
    }
}