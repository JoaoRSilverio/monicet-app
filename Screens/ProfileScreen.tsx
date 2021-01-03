import { Text } from "@ui-kitten/components";
import React from "react"
import { View } from "react-native";
import BaseScreen, { IBaseScreenProps } from "./BaseScreen"



interface IProfileProps extends IBaseScreenProps { }

export const ProfileScreen: React.FC<IProfileProps> = (props) => {
    return (
        <BaseScreen pageTitle={"title"}  >
            <View>
                <Text>{"User Info"}</Text>
            </View>
        </BaseScreen>
    )

}
export default ProfileScreen;