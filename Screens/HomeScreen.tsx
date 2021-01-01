import { Button, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { SCREENS } from "../App";
import { connect } from "react-redux";
import BaseScreen, { IBaseScreenProps } from "./BaseScreen";
import { IMonicetAppGlobalState } from "../Redux/StateInterface";
import { ISortie } from "../Interfaces/monicet";
import { actionInitiateNewSortie, actionEndActiveSortie } from "../Actions/ActionCreators";
import { format, formatDistance } from "date-fns";
import SortieService from "../Services/SortieService";

interface IHomeScreenProps extends IBaseScreenProps {
    sortie?: ISortie;

}

const HomeScreen: React.FC<IHomeScreenProps> = (props) => {
    return (
        <BaseScreen pageTitle={"Home"}>
            <Text category={"h5"} >{"Inicie Uma Viagem ou adicione um avistamento"}</Text>
            <View>
                <Button onPress={() => startNewSortie()} >{" + Viagem"}</Button>
                <Button onPress={() => props.navigation.navigate(SCREENS.LOGIN)} >{" + Avistamento"}</Button>
            </View>
            {props.sortie &&

                <View>
                    <Text>{"Active Sortie"}</Text>
                    <Text>{"started " + formatDistance(props.sortie.start.epochTime, Date.now())}</Text>
                    <Text>{"visibility:" + props.sortie.visibility}</Text>

                    <Text>{"GPS LOG"}</Text>
                    {props.sortie.routeHistory.coordinates.map(value =>
                        <Text>{value}</Text>
                    )}
                </View>

            }
        </BaseScreen>
    )
}
const startNewSortie = () => {
    SortieService.startSortie();
}
const mapStatetoProps = (state: IMonicetAppGlobalState) => {
    return {
        sortie: state.activeSortie.sortie
    }
}

export default connect(mapStatetoProps, null)(HomeScreen);