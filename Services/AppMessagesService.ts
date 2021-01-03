import { MeasureElement } from "@ui-kitten/components/devsupport";
import {
    actionClearAppRequests,
    actionClearUiMsgList, actionClearUiMsgLog,
    actionLogUiMsg, actionUpdateAppRequests, actionUpdateUiMsgList
} from "../Actions/ActionCreators";
import { IAppMessage, IAppRequest } from "../Redux/StateInterface";
import store from "../Store/store";

export default class AppUIMessageServices {
    public static addMessage(message: IAppMessage) {
        const { appServiceState } = store.getState();
        store.dispatch(
            actionUpdateUiMsgList([
                ...appServiceState.messages,
                message
            ]));
        store.dispatch(actionLogUiMsg(message));
    }
    public static addRequest(request: IAppRequest) {
        const requests = store.getState().appServiceState.requests;
        store.dispatch(actionUpdateAppRequests([...requests, request]));
    }
    public static removeMessage(index: number) {
        const { appServiceState } = store.getState();
        const clonedList = appServiceState.messages.slice(index);
        clonedList.splice(index);
        store.dispatch(actionUpdateUiMsgList(clonedList));
    }
    public static clearMessages() {
        store.dispatch(actionClearUiMsgList());
    }
    public static clearMessageLog() {
        store.dispatch(actionClearUiMsgLog());
    }

    public static clearUiRequest(request: IAppRequest) {
        const { requests } = store.getState().appServiceState;
        const updatedList = requests.filter(rq => rq.request !== request.request);
        store.dispatch(actionUpdateAppRequests(updatedList));
    }

    public static clearUiRequests() {
        store.dispatch(actionClearAppRequests());
    }
}