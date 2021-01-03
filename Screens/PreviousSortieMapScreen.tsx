import React from "react"
import { Text } from "react-native-svg"
import BaseScreen, { IBaseScreenProps } from "./BaseScreen"

export const PreviousSortiesMapScreen: React.FC<IBaseScreenProps> = (props) => {
    return (
        <BaseScreen pageTitle={"Sortie In a Map"} >
            <Text>{"the sortie displayed in a map"}</Text>
        </BaseScreen>
    )
}

export default PreviousSortiesMapScreen;