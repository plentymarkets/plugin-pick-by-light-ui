/**
 * Created by ninoplettenberg on 22.02.18.
 */

export class WarehouseInterface
{
    private _id:string;
    private _name:string;


    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}