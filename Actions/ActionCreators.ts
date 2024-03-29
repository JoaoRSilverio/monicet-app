import { LineString } from "geojson";
import { ISeaStop, ISortie } from "../Interfaces/monicet";
import { APP_PERMISSIONS, IAppMessage, IAppRequest, IAuthState, IProfile, ITokensAuth } from "../Redux/StateInterface";
import ACTIONS from "./Actions";

interface IAction<T> {
    type: string;
    payload: T
}
// AUTH
export function actionSaveTokens(
    accessToken: string, refreshToken: string): IAction<ITokensAuth> {
    return {
        type: ACTIONS.SAVE_TOKENS,
        payload: { accessToken, refreshToken }
    }
}

export function actionSaveProfile(
    email: string, username: string): IAction<IProfile> {
    return {
        type: ACTIONS.SAVE_PROFILE,
        payload: { email, username }
    }
}
// AUTH

// SORTIE
export function actionInitiateNewSortie(sortie: ISortie): IAction<ISortie> {
    return {
        type: ACTIONS.ACTIVE_SORTIE_START,
        payload: sortie
    }
}

export function actionRunSortie(): IAction<undefined> {
    return {
        payload: undefined,
        type: ACTIONS.ACTIVE_SORTIE_RUN
    }
}
export function actionUpdateActiveSortie(sortie: ISortie): IAction<ISortie> {
    return {
        type: ACTIONS.ACTIVE_SORTIE_UPDATE,
        payload: sortie
    }
}
export function actionEndActiveSortie(): IAction<undefined> {
    return {
        type: ACTIONS.ACTIVE_SORTIE_END,
        payload: undefined
    }
}
export function actionSaveSortieLocally(sortie: ISortie): IAction<ISortie> {
    return {
        type: ACTIONS.ACTIVE_SORTIE_STORE,
        payload: sortie
    }
}
// SORTIE

// APP REQUESTS AND MESSAGES
export function actionUpdateAppRequests(requests: IAppRequest[]): IAction<IAppRequest[]> {
    return {
        type: ACTIONS.APP_UI_REQUESTS_UPDATE,
        payload: requests
    }
}

export function actionClearAppRequests(): IAction<undefined> {
    return {
        type: ACTIONS.APP_UI_REQUESTS_CLEAR,
        payload: undefined
    }
}

export function actionUpdateUiMsgList(messages: IAppMessage[]): IAction<IAppMessage[]> {
    return {
        type: ACTIONS.APP_UI_MESSAGE_LIST_UPDATE,
        payload: messages
    }
}

export function actionClearUiMsgList(): IAction<undefined> {
    return {
        payload: undefined,
        type: ACTIONS.APP_UI_REQUESTS_CLEAR
    }
}
export function actionClearUiMsgLog(): IAction<undefined> {
    return {
        type: ACTIONS.APP_UI_MESSAGE_CLEAR_LOG,
        payload: undefined
    }
}
export function actionLogUiMsg(message: IAppMessage): IAction<IAppMessage> {
    return {
        type: ACTIONS.APP_UI_MESSAGE_ADD_TO_LOG,
        payload: message
    }
}
// APP REQUESTS AND MESSAGES

// SEA STOPS
export function actionInitiateASeaStop(seaStop: ISeaStop): IAction<ISeaStop> {
    return {
        type: ACTIONS.SEA_STOP_START,
        payload: seaStop
    }
}

export function actionEndASeaStop(): IAction<undefined> {
    return {
        type: ACTIONS.SEA_STOP_END,
        payload: undefined
    }
}
// SEA STOPS

