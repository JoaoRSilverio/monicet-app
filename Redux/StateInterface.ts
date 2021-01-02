
import { Position } from "geojson";
import { ISeaPosition, ISeaStop, ISighting, ISortie } from "../Interfaces/monicet";

export interface IMonicetAppGlobalState {
    auth: IAuthState;
    localData: ILocalData;
    activeSortie: IActiveSortieState;
    appServiceState: IAppServiceState;
    pastSorties: ISortie[];
    encyclopedia: any;
    userSeaPosition?: ISeaPosition;
    userPosition?: Position;
}
export interface IProfile {
    email: string;
    username: string;
}

export interface ITokensAuth {
    accessToken: string;
    refreshToken: string;
}
export interface IAuthState {
    profile: IProfile;
    tokens: ITokensAuth;
}
export interface ILocalData {
    savedSorties: ISortie[];
    sightings: ISighting[];
    unsyncedItems: number;
    messageLog: IAppMessage[];
}

export interface IActiveSortieState {
    phase: ACTIVE_SORTIE_PHASE,
    sortie?: ISortie,
    isAtSeaStop?: ISeaStop,
    isAtSighting?: ISighting,
}
export default interface IAppServiceState {
    messages: IAppMessage[];
    requests: IAppRequest[];
    isGeoLoggerRunning: boolean;
    hasInternetConnection: boolean;
    hasWifi: boolean;

}

export enum APP_WARNING_TYPE {
    INFO,
    WARN,
    SUCCESS,
    ERROR
}

export enum ACTIVE_SORTIE_PHASE {
    SETUP,
    ONGOING,
    ENDED
}

export enum APP_REQUEST_TYPE {
    PERMISSIONS,
    OTHER
}

export enum APP_PERMISSIONS {
    CAMERA,
    LOCATION,
}

export interface IAppRequest {
    requestType: APP_REQUEST_TYPE;
    request: any | APP_PERMISSIONS;
    onAccepted?: () => void;
}

export interface IAppMessage {
    uiTitle: string;
    uiDescription: string;
    action?: IMessageReaction;
    reason?: string;
    timestamp?: string;
    type: APP_WARNING_TYPE;
}

export interface IMessageReaction {
    reaction: () => void;
    uiLabel: string;
}
