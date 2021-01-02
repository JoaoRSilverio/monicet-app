export enum ACTIONS {
    // AUTH
    SAVE_PROFILE = "saveProfile",
    SAVE_TOKENS = "saveTokens",
    CLEAR_TOKENS = "clearTokens",
    // ACTIVE SORTIE
    ACTIVE_SORTIE_UPDATE = "updateActiveSortie",
    ACTIVE_SORTIE_START = "startActiveSortie",
    ACTIVE_SORTIE_END = "clearActiveSortie",
    ACTIVE_SORTIE_STORE = "storeActiveSortie",
    ACTIVE_SORTIE_RUN = "runActiveSortie",
    ACTIVE_SORTIE_UPDATE_SEA_INFO = "updateSeaInfo",
    ACTIVE_SORTIE_UPDATE_ROUTE = "updateSortieRoute",
    // SIGHTING
    SIGHTING_START = "startSighting",
    SIGHTING_END = "endSighting",
    // 
    SEA_STOP_START = "startSeaStop",
    SEA_STOP_END = "endSeaStop",
    // OFFLINE
    SYNC_OFFLINE_DATA = "syncData",

    // USER INTERACTION NEEDED
    APP_UI_REQUESTS_UPDATE = "updateUiRequests",
    APP_UI_REQUESTS_CLEAR = "clearUiRequests",
    // USER MESSAGES
    APP_UI_MESSAGE_LIST_UPDATE = "updateMsgList",
    APP_UI_MESSAGE_LIST_CLEAR = "clearMsgList",
    APP_UI_MESSAGE_ADD_TO_LOG = "msgAddToLog",
    APP_UI_MESSAGE_CLEAR_LOG = " clearMsgLog"

}

enum ACTIVE_SORTIE {
   
}

export default ACTIONS;