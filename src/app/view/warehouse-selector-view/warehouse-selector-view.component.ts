import {Translation, TranslationService} from "angular-l10n";
import {Component, Input, OnInit} from "@angular/core";
import {
    TerraSplitViewComponentInterface, TerraMultiSplitViewInterface, TerraButtonInterface,
    TerraAlertComponent, TerraLoadingSpinnerService
} from "@plentymarkets/terra-components";
import {WarehouseConfig} from "../../config/warehouse.config";
import {WarehouseInterface} from "../../core/rest/warehouse/data/warehouse.interface";
import {WarehouseService} from "../../core/rest/warehouse/warehouse.service";
import {WarehouseDetailViewModule} from "../warehouse-detail-view/warehouse-detail-view.module";
/**
 * Created by ninoplettenberg on 22.02.18.
 */

@Component({
    selector: 'warehouseList',
    template: require('./warehouse-selector-view.component.html'),
    styles: [require(('./warehouse-selector-view.component.scss'))]
})
export class WarehouseSelectorViewComponent extends Translation implements OnInit, TerraSplitViewComponentInterface
{
    splitViewInstance: TerraMultiSplitViewInterface;
    @Input() parameter: any;

    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor(private _warehouseConfig:WarehouseConfig,
                private _warehouseService:WarehouseService,
                public translation:TranslationService,
                private _loadingSpinnerService:TerraLoadingSpinnerService)
    {
        super(translation);
    }

    ngOnInit(): void
    {
       this.loadWarehouseList();
    }

    private loadWarehouseList()
    {
        this._warehouseConfig.warehouseList = [];
        this._loadingSpinnerService.start();
        this._warehouseService.getWarehouses().subscribe((response:Array<WarehouseInterface>) =>
        {
            for(let i = 0; i < response.length; i++)
            {
                let warehouse = response[i];

                this._warehouseConfig.warehouseList.push({
                    caption: warehouse.name,
                    icon: 'icon-stock',
                    value: warehouse.id,
                    clickFunction: () =>
                    {
                        this._warehouseConfig.addView({
                            module:            WarehouseDetailViewModule.forRoot(),
                            defaultWidth:      'col-xs-10',
                            name:              warehouse.name,
                            mainComponentName: WarehouseDetailViewModule.getMainComponent()
                        }, this.splitViewInstance);

                        this._warehouseConfig.showWarehouseDetails(warehouse.id, warehouse);
                    }
                });
                this._loadingSpinnerService.stop();
            }
        },
        (error:any) =>
        {
            let message = error;
            this.showAlert(message, 'danger');
            this._loadingSpinnerService.stop();
        });
    }

    private buttonClickHandler(button:TerraButtonInterface):void
    {
        button.clickFunction();
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
}