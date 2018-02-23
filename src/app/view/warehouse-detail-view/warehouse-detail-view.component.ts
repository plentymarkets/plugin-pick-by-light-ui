import {Translation, TranslationService} from "angular-l10n";
import {Component, OnInit} from "@angular/core";
import {WarehouseConfig} from "../../config/warehouse.config";
import {
    TerraSelectBoxValueInterface, TerraPagerInterface, TerraAlertComponent,
    TerraSimpleTableHeaderCellInterface, TerraSimpleTableCellInterface, TerraSimpleTableRowInterface, TerraLoadingSpinnerService
} from "@plentymarkets/terra-components";
import {SettingsService} from "../../core/rest/settings/settings.service";
import {SettingsInterface} from "../../core/rest/settings/data/settings.interface";
import {PluginDataInterface} from "../../core/rest/settings/data/plugin-data.interface";
import {LedConfigInterface} from "../../core/rest/settings/data/led-config.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
/**
 * Created by ninoplettenberg on 22.02.18.
 */


@Component({
    selector: 'warehouseDetails',
    template: require('./warehouse-detail-view.component.html'),
    styles: [require('./warehouse-detail-view.component.scss')]
})
export class WarehouseDetailViewComponent extends Translation implements OnInit
{
    static LED_ALWAYS_ON = 'AlwaysOn';
    static LED_OFF = 'Off';
    static LED_SLOW = 'Slow';
    static LED_MEDIUM = 'Medium';
    static LED_FAST = 'Fast';
    
    private _ledCurrentSpeedValues:Array<TerraSelectBoxValueInterface>;
    private _ledNextSpeedValues:Array<TerraSelectBoxValueInterface>;


    private _selectedCurrentLedSpeed:any;
    private _selectedNextLedSpeed:any;
    private _deviceId:any;
    private _soapUrl:any;
    private _ledConfig:Array<LedConfigInterface>;

    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    private deviceForm:FormGroup;

    constructor(public translation:TranslationService,
                private _warehouseConfig:WarehouseConfig,
                private _settingsService:SettingsService,
                private _loadingSpinnerService:TerraLoadingSpinnerService)
    {
        super(translation);
    }

    ngOnInit()
    {
        this.loadPickByLightSettingsForWarehouse(this._warehouseConfig.currendWarehouseId);

        this._ledCurrentSpeedValues = [
            {
                caption: this.translation.translate("ledSpeedStatic"),
                value: WarehouseDetailViewComponent.LED_ALWAYS_ON
            },
            {
                caption: this.translation.translate("ledSpeedSlow"),
                value: WarehouseDetailViewComponent.LED_SLOW
            },
            {
                caption: this.translation.translate("ledSpeedMedium"),
                value: WarehouseDetailViewComponent.LED_MEDIUM
            },
            {
                caption:this.translation.translate("ledSpeedFast"),
                value: WarehouseDetailViewComponent.LED_FAST
            },
        ];

        this._ledNextSpeedValues = [
            {
                caption: this.translation.translate("ledSpeedSlow"),
                value: WarehouseDetailViewComponent.LED_SLOW
            },
            {
                caption: this.translation.translate("ledSpeedStatic"),
                value: WarehouseDetailViewComponent.LED_ALWAYS_ON
            },
            {
                caption: this.translation.translate("ledSpeedMedium"),
                value: WarehouseDetailViewComponent.LED_MEDIUM
            },
            {
                caption:this.translation.translate("ledSpeedFast"),
                value: WarehouseDetailViewComponent.LED_FAST
            },
            {
                caption:this.translation.translate("ledSpeedOff"),
                value: WarehouseDetailViewComponent.LED_OFF
            }
        ];
    }

    private loadPickByLightSettingsForWarehouse(warehouseId:string)
    {
        this._loadingSpinnerService.start();
        this._settingsService.getConfigForWarehouse(warehouseId).subscribe((response:PluginDataInterface) => {
            this.setValuesToView(response);
            this._loadingSpinnerService.stop();
        }, (error:any) =>
        {
            let message = error;
            this.showAlert(message, 'danger');
            this._loadingSpinnerService.stop();
        });
    }

    private setValuesToView(data:PluginDataInterface)
    {
        this._soapUrl = data.settings.soapURL;
        this._deviceId = data.settings.deviceId;

        this._selectedCurrentLedSpeed = data.settings.currentLEDspeed;
        this._selectedNextLedSpeed = data.settings.nextLEDspeed;

        this._ledConfig = [];

        for (let storageLocation of data.config)
        {
            this._ledConfig.push(storageLocation);
        }
    }

    /**
     * Not needed now
     * @param event
     */
    public doPaging(event:TerraPagerInterface)
    {

    }

    public saveSettings()
    {
        this._settingsService
            .saveConfigForWarehouse(this.collectDataToSave())
            .subscribe(() =>
            {
                this.showAlert(this.translation.translate("saved"),'success');
            },
            (error:any) =>
            {
                let message = this.translation.translate("notSaved") + '<br>' + error;
                this.showAlert(message, 'danger');
            })
    }

    private collectDataToSave() : PluginDataInterface
    {
        return {
            warehouseId : this._warehouseConfig.currendWarehouseId,
            settings : this.collectDeviceData(),
            config: this._ledConfig
        };
    }

    private collectDeviceData() : SettingsInterface
    {
        return {
            deviceId : this._deviceId,
            soapURL : this._soapUrl,
            currentLEDspeed : this._selectedCurrentLedSpeed,
            nextLEDspeed : this._selectedNextLedSpeed
        };
    }

    private showAlert(msg:string, type:string) : void
    {
        this._alert.addAlert({
            msg: msg,
            type: type,
            dismissOnTimeout: 5000,
            identifier: 'info'
        });
        this.emptyAlertArray();
    }

    public emptyAlertArray()
    {
        setTimeout(() => this._alert.closeAlertByIdentifier('info'), 5000);
    }

    get soapURL()
    {
        return this.deviceForm.get('soapURL');
    }

    get deviceId()
    {
        return this.deviceForm.get('deviceId');
    }

    get currentWarehouseButtonCaption()
    {
        return "ID: " + this._warehouseConfig.currendWarehouseId;
    }
}