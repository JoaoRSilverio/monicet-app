import React from "react"
import { Text } from "react-native-svg"
import BaseScreen, { IBaseScreenProps } from "./BaseScreen"

export const PreviousSortiesDetailScreen: React.FC<IBaseScreenProps> = (props) => {
    return (
        <BaseScreen pageTitle={"Sortie In Detail"} >
            <Text>{"alot of data from previous sortie"}</Text>
        </BaseScreen>
    )
}

export default PreviousSortiesDetailScreen;