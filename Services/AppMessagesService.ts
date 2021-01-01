import { MeasureElement } from "@ui-kitten/components/devsupport";
import {
    actionClearUiMsgList, actionClearUiMsgLog,
    actionLogUiMsg, actionUpdateUiMsgList
} from "../Actions/ActionCreators";
import { IAppMessage } from "../Redux/StateInterface";
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
}