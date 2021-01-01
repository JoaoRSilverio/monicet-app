import { Button, Text } from "@ui-kitten/components";
import { View } from "react-native";
import BaseScreen, { IBaseScreenProps } from "./BaseScreen";
import React from "react";

const RegistrationScreen: React.FC<IBaseScreenProps> = (props) => {
    return (
        <BaseScreen navigation={props.navigation} pageTitle={"Registration"}>
            <Text category={"h4"} >{"Welcome to the Registration Page"}</Text>
            <View>
                <Button>{"Register"}</Button>
            </View>
        </BaseScreen>
    )
}

export default RegistrationScreen;