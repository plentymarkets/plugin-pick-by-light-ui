import {TerraLeafInterface, TerraMultiSplitViewConfig} from "@plentymarkets/terra-components";
import {Injectable} from "@angular/core";
import {WarehouseInterface} from "../core/rest/warehouse/data/warehouse.interface";

@Injectable()
export class WarehouseConfig extends TerraMultiSplitViewConfig
{
    private _currentWarehouse:any;
    private _currendWarehouseId: string;
    private _warehouseList: Array<TerraLeafInterface>;

    constructor()
    {
        super();
    }


    public get currentWarehouse(): any {
        return this._currentWarehouse;
    }

    public set currentWarehouse(value: any) {
        this._currentWarehouse = value;
    }

    public get currendWarehouseId(): string {
        return this._currendWarehouseId;
    }

    public set currendWarehouseId(value: string) {
        this._currendWarehouseId = value;
    }


    public get warehouseList(): Array<TerraLeafInterface> {
        return this._warehouseList;
    }

    public set warehouseList(value: Array<TerraLeafInterface>) {
        this._warehouseList = value;
    }

    public showWarehouseDetails(warehouseId:string, warehouse:any):void
    {
        this._currendWarehouseId = warehouseId;
        this._currentWarehouse = warehouse;
    }
}