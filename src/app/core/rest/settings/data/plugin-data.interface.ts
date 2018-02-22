import {SettingsInterface} from "./settings.interface";
import {LedConfigInterface} from "./led-config.interface";
import {TerraPagerInterface} from "@plentymarkets/terra-components";
/**
 * Created by ninoplettenberg on 22.02.18.
 */

export interface PluginDataInterface
{
    warehouseId: string;
    settings: SettingsInterface;
    config: Array<LedConfigInterface>;
}