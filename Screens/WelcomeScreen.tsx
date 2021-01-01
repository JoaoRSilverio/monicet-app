import { Button, Text } from "@ui-kitten/components";
import { View } from "react-native";
import BaseScreen, { IBaseScreenProps } from "./BaseScreen";
import React from "react";
import { SCREENS } from "../App";

const WelcomeScreen: React.FC<IBaseScreenProps> = (props) => {
    return (
        <BaseScreen pageTitle={"Welcome"}>
            <Text category={"h4"} >{"Welcome to the Main Screen"}</Text>
            <View>
                <Button onPress={() => props.navigation.navigate(SCREENS.LOGIN)} >{"Login"}</Button>
                <Button onPress={() => props.navigation.navigate(SCREENS.REGISTRATION)}>{"Register"}</Button>
            </View>
        </BaseScreen>
    )
}

export default WelcomeScreen;