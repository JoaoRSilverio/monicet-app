import { Button, Text } from "@ui-kitten/components";
import { View } from "react-native";
import BaseScreen, { IBaseScreenProps } from "./BaseScreen";

const WelcomeScreen: React.FC<IBaseScreenProps> = (props) => {
    return (
        <BaseScreen navigation={props.navigation} pageTitle={"Home"}>
            <Text category={"h4"} >{"Welcome to the Main Screen"}</Text>
            <View>
                <Button>{"Login"}</Button>
                <Button>{"Register"}</Button>
            </View>
        </BaseScreen>
    )
}