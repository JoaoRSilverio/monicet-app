import { StackNavigationProp } from '@react-navigation/stack';
import {Text} from '@ui-kitten/components';
import React from "react";
import { View } from "react-native";
import { connect } from 'react-redux';
import AppRequest from '../Components/AppRequest';
import IAppServiceState, { IMonicetAppGlobalState } from '../Redux/StateInterface';

export interface IBaseScreenProps {
    navigation: StackNavigationProp<any>;
    children: any;
    pageTitle: string;
}

interface IBaseScreenBaseProps {
    children: any;
    pageTitle: string;
    appService: IAppServiceState;

}

const BaseScreen: React.FC<IBaseScreenBaseProps> = (props) => {
    const { appService } = props;
    const { hasInternetConnection, isGeoLoggerRunning, requests, messages } = appService;
    return (
        <View style={{ alignItems: "center", paddingTop: 16 }}>
            <Text category='h1'>{props.pageTitle}</Text>
            {props.children}
            {requests && requests.map(
                (prequest, index) => <AppRequest key={`${index}${prequest.requestType}`} {...prequest} />
            )}
        </View>
    )
}

const mapStateToProps = (state: IMonicetAppGlobalState) => ({
    appService: state.appServiceState,
})


export default connect(mapStateToProps, null)(BaseScreen);