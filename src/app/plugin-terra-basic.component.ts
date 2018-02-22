import {Component, OnInit} from '@angular/core';
import {
    Translation,
    TranslationService
} from 'angular-l10n';
import {WarehouseConfig} from "./config/warehouse.config";
import {WarehouseSelectorViewModule} from "./view/warehouse-selector-view/warehouse-selector-view-module";

@Component({
    selector: 'plugin-terra-basic-app',
    template: require('./plugin-terra-basic.component.html'),
    styles:   [require('./plugin-terra-basic.component.scss')],
})
export class PluginTerraBasicComponent extends Translation implements OnInit
{
    public constructor(private _warehouseConfig:WarehouseConfig,
                       public translation:TranslationService)
    {
        super(translation);

    }

    ngOnInit()
    {
        this._warehouseConfig.addView({
            module: WarehouseSelectorViewModule.forRoot(),
            defaultWidth: 'col-xs-2',
            name: this.translation.translate('warehouses'),
            mainComponentName: WarehouseSelectorViewModule.getMainComponent(),
            isBackgroundColorGrey: true
        });
    }
}
