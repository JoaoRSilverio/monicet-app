import { PermissionsAndroid } from "react-native";
export default class PermissionService {

    public static async askGPSPermission(
        onAccepted: () => void,
        onRejected: () => void
    ): Promise<void> {
        const response = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "We need to access your location",
                message: "We use it to GPS tag pictures and provide a MYtrip visualization at the end of the trip",
                buttonNegative: "Refuse",
                buttonPositive: "Accept"
            }
        );
        response ? onAccepted() : onRejected();
    }

    public static async askCameraPermission(
        onAccepted: () => void,
        onRejected: () => void
    ) {

    }
}