import {
    APP_INITIALIZER,
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PluginTerraBasicComponent } from './plugin-terra-basic.component';
import { StartComponent } from './start/start.component';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import { HttpModule } from '@angular/http';
import { TranslationModule } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { LocalizationConfig } from './core/localization/terra-localization.config';
import {WarehouseSelectorViewModule} from "./view/warehouse-selector-view/warehouse-selector-view-module";
import {WarehouseConfig} from "./config/warehouse.config";
import {WarehouseService} from "./core/rest/warehouse/warehouse.service";
import {WarehouseDetailViewModule} from "./view/warehouse-detail-view/warehouse-detail-view.module";
import {SettingsService} from "./core/rest/settings/settings.service";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        TranslationModule.forRoot(),
        TerraComponentsModule.forRoot(),
        WarehouseSelectorViewModule.forRoot(),
        WarehouseDetailViewModule.forRoot()
    ],
    declarations: [
        PluginTerraBasicComponent,
        StartComponent
    ],
    providers:    [
        LocalizationConfig,
        {
            provide:    APP_INITIALIZER,
            useFactory: initLocalization,
            deps:       [LocalizationConfig],
            multi:      true
        },
        WarehouseConfig,
        WarehouseService,
        SettingsService
    ],
    bootstrap:    [
        PluginTerraBasicComponent
    ]
})
export class PluginTerraBasicModule
{
}

export function initLocalization(localizationConfig:LocalizationConfig):Function
{
    return () => localizationConfig.load();
}
