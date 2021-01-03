import React from "react"
import { Text } from "react-native-svg"
import BaseScreen, { IBaseScreenProps } from "./BaseScreen"

export const PreviousSortiesScreen: React.FC<IBaseScreenProps> = (props) => {
    return (
        <BaseScreen pageTitle={"previous sorties"} >
            <Text>{"see your previous sorties in a list"}</Text>
        </BaseScreen>
    )
}

export default PreviousSortiesScreen;