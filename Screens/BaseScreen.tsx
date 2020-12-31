import {Text} from '@ui-kitten/components';
import React from "react";
import { View } from "react-native";

export interface IBaseScreenProps {
    navigation: any;
    children: any;
    pageTitle: string;
}

const BaseScreen: React.FC<IBaseScreenProps> = (props) => {
    return (
        <View>
            <Text category='h1'>{props.pageTitle}</Text>
            {props.children}
        </View>
    )
}

export default BaseScreen;