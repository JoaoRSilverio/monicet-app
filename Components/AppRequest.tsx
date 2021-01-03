import { Button, Card, Modal, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { APP_PERMISSIONS, APP_REQUEST_TYPE, APP_WARNING_TYPE, IAppRequest } from "../Redux/StateInterface";
import AppUIMessageServices from "../Services/AppMessagesService";
import PermissionService from "../Services/PermissionsService";
import TripGeoLoggerService from "../Services/TripGeoLoggerService";

export const AppRequest: React.FC<IAppRequest> = (props) => {
    switch (props.requestType) {
        case APP_REQUEST_TYPE.OTHER:
        case APP_REQUEST_TYPE.PERMISSIONS:
            return <PermissionDialog
                {...props}
                permission={props.request as APP_PERMISSIONS} />;
        default:
            return null;
    }

}

interface IPermissionDialogProps {
    permission: APP_PERMISSIONS;
    onAccepted?: () => void;
}
const PermissionDialog: React.FC<IPermissionDialogProps> = (props) => {
    let title = "";
    let description = "";
    let permissionServiceCall: (onAccepted: any, onRejected: any) => void = () => { };
    switch (props.permission) {
        case APP_PERMISSIONS.CAMERA:
            title = "We need Camera Permissions";
            description = "In order to allow to take photos and add them to sighting";
            permissionServiceCall = PermissionService.askCameraPermission;
            break;
        case APP_PERMISSIONS.LOCATION:
            title = "We need Location Permissions";
            description = "In order to Place the Sightings corretly we need your GPS Location";
            permissionServiceCall = PermissionService.askGPSPermission;
        case APP_PERMISSIONS.READ_FILES:
            title = "We need to read files";
            description = "yeah";
            permissionServiceCall = PermissionService.askFileReadPermission;

        case APP_PERMISSIONS.WRITE_FILES:
            title = "we need to write files";
            description = "yeah";
            permissionServiceCall = PermissionService.askFileWritePermission;

        default:
    }
    function onPermissionRejected() {
        AppUIMessageServices.addMessage({
            type: APP_WARNING_TYPE.WARN,
            uiTitle: "permission denied",
            uiDescription: "You denied the permission"
        })
    }
    function onOkPress() {
        AppUIMessageServices.clearUiRequest(
            {
                request: props.permission,
                requestType: APP_REQUEST_TYPE.PERMISSIONS,
            });
        props.onAccepted && permissionServiceCall(props.onAccepted, onPermissionRejected)
    }
    return (
        <BaseDialog title={title} description={description} onOk={onOkPress} />
    )
}

interface IBaseDialogProps {
    title: string;
    description: string;
    onOk: () => void;
}
const BaseDialog: React.FC<IBaseDialogProps> = (props) => {
    return (
        <Modal
            visible
            backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onBackdropPress={props.onOk}
        >
            <Card>
                <Text>{props.title}</Text>
                <Text>{props.description}</Text>
                <Button onPress={props.onOk} >{"OK"}</Button>
            </Card>
        </Modal>
    )
}

export default AppRequest;