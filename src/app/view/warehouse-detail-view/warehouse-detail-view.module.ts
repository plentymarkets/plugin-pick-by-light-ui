import {ModuleWithProviders, NgModule} from "@angular/core";
import {TerraComponentsModule} from "@plentymarkets/terra-components/app";
import {TranslationModule} from "angular-l10n";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {WarehouseDetailViewComponent} from "./warehouse-detail-view.component";
/**
 * Created by ninoplettenberg on 22.02.18.
 */

@NgModule({
    imports:      [
        CommonModule,
        FormsModule,
        TranslationModule.forRoot(),
        TerraComponentsModule.forRoot()
    ],
    declarations: [
        WarehouseDetailViewComponent
    ]
})
export class WarehouseDetailViewModule
{

    static forRoot():ModuleWithProviders
    {
        return {
            ngModule: WarehouseDetailViewModule
        };
    }

    static getMainComponent():string
    {
        return 'WarehouseDetailViewComponent';
    }
}