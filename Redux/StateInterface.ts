
import { Position } from "geojson";
import { ISeaPosition, ISighting, ISortie } from "../Interfaces/monicet";

export interface IMonicetAppGlobalState {
    auth: IAuthState;
    localData: ILocalData;
    activeSortie: ISortie;
    appServiceState: IAppServiceState;
    pastSorties: ISortie[];
    encyclopedia: any;
    userSeaPosition: ISeaPosition;
    userPosition: Position;
}

export interface IAuthState { }
export interface ILocalData {
    savedSorties: ISortie[];
    sightings: ISighting[];
    unsyncedItems: number;
    messageLog: IAppMessage[];
}
export default interface IAppServiceState {
    messages: IAppMessage[];
    isGeoLoggerRunning: boolean;
    hasInternetConnection: boolean;
    hasWifi: boolean;
}

enum APP_WARNING_TYPE {
    INFO,
    WARN,
    SUCCESS,
    ERROR
}

export interface IAppMessage {
    uiTitle: string;
    uiDescription: string;
    action?: IMessageReaction;
    reason?: string;
    timestamp?: string;
    type: APP_WARNING_TYPE;
}

interface IMessageReaction {
    reaction: () => void;
    uiLabel: string;
}
