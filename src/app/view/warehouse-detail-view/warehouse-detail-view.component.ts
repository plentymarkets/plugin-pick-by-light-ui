import {Translation, TranslationService} from "angular-l10n";
import {Component, OnInit} from "@angular/core";
import {WarehouseConfig} from "../../config/warehouse.config";
import {
    TerraSelectBoxValueInterface, TerraPagerInterface, TerraAlertComponent,
    TerraSimpleTableHeaderCellInterface, TerraSimpleTableCellInterface, TerraSimpleTableRowInterface
} from "@plentymarkets/terra-components";
import {SettingsService} from "../../core/rest/settings/settings.service";
import {SettingsInterface} from "../../core/rest/settings/data/settings.interface";
import {PluginDataInterface} from "../../core/rest/settings/data/plugin-data.interface";
import {LedConfigInterface} from "../../core/rest/settings/data/led-config.interface";
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

    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    private _headerList:Array<TerraSimpleTableHeaderCellInterface>;
    private _rowList:Array<TerraSimpleTableRowInterface<LedConfigInterface>>;

    constructor(public translation:TranslationService,
                private _warehouseConfig:WarehouseConfig,
                private _settingsService:SettingsService)
    {
        super(translation);
    }

    ngOnInit()
    {
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

        this._headerList = [];

        this._headerList = [
            {
                caption: 'ID',
                width: "100"
            },
            {
                caption: 'Lagerort Name',
                width: "100"
            },
            {
                caption: 'LED ID',
                width: "100"
            }
        ];

        this._rowList = [
            this.createRowForEntry({
                id: 0,
                name: "test",
                led: "A1"
            }),
            this.createRowForEntry({
                id: 0,
                name: "test",
                led: "A1"
            })
        ];


    }

    private createRowForEntry(config:LedConfigInterface) : TerraSimpleTableRowInterface<LedConfigInterface>
    {
        let cellList:Array<TerraSimpleTableCellInterface> = [];

        cellList.push(this.createCellForAtribute(config.id));
        cellList.push(this.createCellForAtribute(config.name));

        return {
            cellList: cellList
        }
    }

    private createCellForAtribute(data:any):TerraSimpleTableCellInterface
    {
        return {
            caption: data
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
            .saveConfigForWarehouse(this._warehouseConfig.currendWarehouseId, this.collectDataToSave())
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
            config: []
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
    }
}