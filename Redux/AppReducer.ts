import { Position } from "geojson";
import { actionClearAppRequests } from "../Actions/ActionCreators";
import ACTIONS from "../Actions/Actions";
import { ISeaPosition, ISortie } from "../Interfaces/monicet";
import IAppServiceState, {
    IMonicetAppGlobalState,
    ACTIVE_SORTIE_PHASE,
    IAuthState,
    IActiveSortieState, ILocalData
} from "./StateInterface";




const intialState: IMonicetAppGlobalState = {
    activeSortie: {
        isAtSeaStop: undefined,
        isAtSighting: undefined,
        phase: ACTIVE_SORTIE_PHASE.SETUP,
        sortie: undefined,
    },
    appServiceState: {
        hasInternetConnection: false,
        hasWifi: false,
        isGeoLoggerRunning: false,
        messages: [],
        requests: []
    },
    auth: {
        profile: {
            username: "",
            email: ""
        },
        tokens: {
            accessToken: "",
            refreshToken: ""
        },
    },
    encyclopedia: undefined,
    localData: {
        messageLog: [],
        savedSorties: [],
        sightings: [],
        unsyncedItems: 0
    },
    pastSorties: [],
    userPosition: undefined,
    userSeaPosition: undefined

}

interface IAction {
    type: string;
    payload: any
}

export default function appReducer(
    state: IMonicetAppGlobalState = intialState,
    action: IAction
): IMonicetAppGlobalState {
    console.log(`ACTION -> ${action.type}`);
    return {
        auth: authReducer(state.auth, action),
        activeSortie: activeSortieReducer(state.activeSortie, action),
        appServiceState: serviceStateReducer(state.appServiceState, action),
        encyclopedia: encyclopediaReducer(state.encyclopedia, action),
        localData: localDataReducer(state.localData, action),
        pastSorties: pastSortiesReducer(state.pastSorties, action),
        userPosition: userPositionReducer(state.userPosition, action),
        userSeaPosition: userSeaPositionReducer(state.userSeaPosition, action),


    }
}

function authReducer(state: IAuthState, action: IAction): IAuthState {
    switch (action.type) {
        case ACTIONS.CLEAR_TOKENS:
            return {
                profile: state.profile,
                tokens: {
                    accessToken: "",
                    refreshToken: ""
                }
            }
        case ACTIONS.SAVE_TOKENS:
            return {
                profile: state.profile,
                tokens: { ...action.payload }
            }
        case ACTIONS.SAVE_PROFILE:
            return {
                profile: { ...action.payload },
                tokens: state.tokens
            }
        default:
            return state;
    }
}
function activeSortieReducer(
    state: IActiveSortieState,
    action: IAction): IActiveSortieState {
    switch (action.type) {
        case ACTIONS.ACTIVE_SORTIE_UPDATE:
            return {
                ...state,
                sortie: action.payload
            }
        case ACTIONS.ACTIVE_SORTIE_START:
            return {
                sortie: action.payload,
                phase: ACTIVE_SORTIE_PHASE.SETUP,
                isAtSeaStop: undefined,
                isAtSighting: undefined
            }
        case ACTIONS.ACTIVE_SORTIE_RUN:
            return {
                ...state,
                phase: ACTIVE_SORTIE_PHASE.ONGOING
            }
        case ACTIONS.ACTIVE_SORTIE_END:
            return {
                phase: ACTIVE_SORTIE_PHASE.ENDED,
                isAtSeaStop: undefined,
                isAtSighting: undefined,
                sortie: undefined
            }
        case ACTIONS.SEA_STOP_START:
            return {
                ...state,
                isAtSeaStop: action.payload
            }
        case ACTIONS.SEA_STOP_END:
            return {
                ...state,
                isAtSeaStop: undefined
            }
        default:
            return state;
    }
}
function encyclopediaReducer(state: any, action: IAction) {
    switch (action.type) {
        default:
            return state;
    }

}
function serviceStateReducer(state: IAppServiceState, action: IAction): IAppServiceState {
    switch (action.type) {
        case ACTIONS.APP_UI_REQUESTS_CLEAR:
            return {
                ...state,
                requests: []
            }
        case ACTIONS.APP_UI_REQUESTS_UPDATE:
            return {
                ...state,
                requests: action.payload
            }
        default:
            return state;
    }
}
function localDataReducer(state: ILocalData, action: IAction): ILocalData {
    switch (action.type) {
        case ACTIONS.ACTIVE_SORTIE_STORE:
            return {
                ...state,
                savedSorties: [...state.savedSorties, action.payload]
            }
        case ACTIONS.APP_UI_MESSAGE_ADD_TO_LOG:
            return {
                ...state,
                messageLog: [state.messageLog, action.payload]
            }
        case ACTIONS.APP_UI_MESSAGE_CLEAR_LOG:
            return {
                ...state,
                messageLog: []
            }
        default:
            return state;
    }
}
function pastSortiesReducer(state: ISortie[], action: IAction): ISortie[] {
    switch (action.type) {
        default:
            return state;
    }
}
function userPositionReducer(state: Position | undefined, action: IAction) {
    switch (action.type) {
        default:
            return state;
    }
}
function userSeaPositionReducer(state: ISeaPosition | undefined, action: IAction) {
    switch (action.type) {
        default:
            return state;
    }
}

