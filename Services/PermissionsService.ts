import RNLocation from "react-native-location"
export default class PermissionService {

    public static async askGPSPermission(
        onAccepted: () => void,
        onRejected: () => void
    ): Promise<void> {
        const response = await RNLocation.requestPermission({
            ios: "always",
            android: {
                detail: "coarse",
                rationale: {
                    title: "We need to access your location",
                    message: "We use it to GPS tag pictures and provide a MYtrip visualization at the end of the trip",
                    buttonNegative: "Refuse",
                    buttonPositive: "Accept"
                }
            }
        });
        response ? onAccepted() : onRejected();
    }

    public static async askCameraPermission(
        onAccepted: () => void,
        onRejected: () => void
    ) {

    }
}