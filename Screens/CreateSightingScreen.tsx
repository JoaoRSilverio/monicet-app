import { RNCamera, } from "react-native-camera";
import { View, Image, PermissionsAndroid } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { PERMISSION_NAMES } from "../Setup/Constants";
import AppUIMessageServices from "../Services/AppMessagesService";
import { APP_PERMISSIONS, APP_REQUEST_TYPE } from "../Redux/StateInterface";
import CameraRoll from "@react-native-community/cameraroll";
import { ScrollView } from "react-native-gesture-handler";




export const SightingScreen: React.FC<any> = () => {
    const [isCamera, setCamera] = useState(true);
    const [imgPreviews, setImagePreviews] = useState<string[]>([]);

    async function takePicture(camera: any) {
        const isAllowedW = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS[PERMISSION_NAMES.WRITE_EXTERNAL_STORAGE]);
        if (!isAllowedW) AppUIMessageServices.addRequest({
            requestType: APP_REQUEST_TYPE.PERMISSIONS,
            request: APP_PERMISSIONS.WRITE_FILES,
            onAccepted: () => takePicture(camera),
        });

        const isAllowedR = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS[PERMISSION_NAMES.READ_EXTERNAL_STORAGE]);
        if (!isAllowedR) AppUIMessageServices.addRequest({
            requestType: APP_REQUEST_TYPE.PERMISSIONS,
            request: APP_PERMISSIONS.READ_FILES,
            onAccepted: () => takePicture(camera),
        });
        console.log(`write permission ${isAllowedW} read permission ${isAllowedR}`);
        const options = { quality: 0.5, base64: true };
        const { uri } = await camera.takePictureAsync(options);
        const newuri = await CameraRoll.save(uri, { type: "photo" });
        const results = await CameraRoll.getPhotos(
            { first: imgPreviews.length }
        );
        const freshImage = results.edges[0].node.image.uri;
        console.log("image->", freshImage);
        setImagePreviews([...imgPreviews, freshImage])

        setCamera(!isCamera);

    }
    function renderSightingPanel() {
        return (<ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <Text>{"Sighting flow"}</Text>
            <Text>{"some info about the picture you took and stuff"}</Text>
            {imgPreviews.map(
                (img, i) => <Image style={{
                    width: 300,
                    height: 600,
                    resizeMode: 'contain'
                }} key={i} source={{ uri: img }} />
            )}
            <Button style={{ marginBottom: 16, width: 125 }} onPress={() => setCamera(true)} >{"TAKE A PICTURE"}</Button>
        </ScrollView>)
    }
    function renderCamera() {
        return (
            <RNCamera
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end",
                    borderColor: "green",
                    borderWidth: 1,
                    borderStyle: "solid",
                    alignItems: "center"
                }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: "Permission to use camera",
                    message: "we need your permission to use camera",
                    buttonPositive: "Ok",
                    buttonNegative: "Cancel",
                }}

                androidRecordAudioPermissionOptions={{
                    title: "Permission to use audio recording",
                    message: "we need your permission to use the audio",
                    buttonPositive: "Ok",
                    buttonNegative: "Cancel",
                }}
            >
                {({ camera, status, recordAudioPermissionStatus }) => {
                    if (status !== 'READY') return <View><Text>{"loading"}</Text></View>
                    return (

                        <Button style={{ marginBottom: 16, width: 125 }} onPress={() => takePicture(camera)} >{"SNAP"}</Button>
                    )
                }}
            </RNCamera>
        )
    }
    return (
        <View style={{}}>
            {isCamera ? renderCamera() : renderSightingPanel()}
        </View>
    )
}



export default SightingScreen;