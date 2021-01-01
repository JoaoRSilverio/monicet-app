import { StackNavigationProp } from '@react-navigation/stack';
import {Text} from '@ui-kitten/components';
import React from "react";
import { View } from "react-native";

export interface IBaseScreenProps {
    navigation: StackNavigationProp<any>;
    children: any;
    pageTitle: string;
}

interface IBaseScreenBaseProps {
    children: any;
    pageTitle: string;
}

const BaseScreen: React.FC<IBaseScreenBaseProps> = (props) => {
    return (
        <View style={{ alignItems: "center", paddingTop: 16 }}>
            <Text category='h1'>{props.pageTitle}</Text>
            {props.children}
        </View>
    )
}

export default BaseScreen;