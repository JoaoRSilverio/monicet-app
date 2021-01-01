import { Location } from "react-native-location";
import { actionEndActiveSortie, actionEndASeaStop, actionInitiateASeaStop, actionSaveSortieLocally, actionUpdateActiveSortie } from "../Actions/ActionCreators";
import { ISeaStop } from "../Interfaces/monicet";
import { APP_WARNING_TYPE } from "../Redux/StateInterface";
import store from "../Store/store";
import AppUIMessageServices from "./AppMessagesService";
import TripGeoLoggerService from "./TripGeoLoggerService";

export default class SortieService {
    public static startSortie(): void {

        // check if a sortie is active
        // if is active STORE_ACTIVE_SORTIE e reset phase
        // start logging the GPS 
        // gps updates the acitve sortie every X seconds
        // if internet is available gets seaDepth
        function onMovementStop(loc: Location) {
            const { activeSortie } = store.getState();
            if (!activeSortie.isAtSeaStop) {
                const seaStop: ISeaStop = {
                    durationInSeconds: 0,
                    sightings: [],
                    start: {
                        epochTime: Date.now(),
                        location: {
                            type: "Point",
                            coordinates: [loc.latitude, loc.longitude, loc.altitude]
                        }
                    }
                }
                store.dispatch(actionInitiateASeaStop(seaStop));
            }

        }
        function onResumeMoving(loc: Location) {
            const { activeSortie } = store.getState();
            //@ts-ignore
            const durationInSeconds = (Date.now() - activeSortie.isAtSeaStop?.start.epochTime) * 1000;
            //@ts-ignore
            const seaStop: ISeaStop = {
                ...activeSortie.isAtSeaStop,
                durationInSeconds,
                end: {
                    epochTime: Date.now(),
                    location: {
                        type: "Point",
                        coordinates: [loc.latitude, loc.longitude, loc.altitude]
                    }
                }
            }
            if (activeSortie.sortie) {
                store.dispatch(actionUpdateActiveSortie({
                    ...activeSortie.sortie,
                    stops: [...activeSortie.sortie?.stops, seaStop]
                }))
            }
            store.dispatch(actionEndASeaStop());

        }
        const { activeSortie } = store.getState();
        if (activeSortie.sortie) {
            AppUIMessageServices.addMessage({
                type: APP_WARNING_TYPE.ERROR,
                uiTitle: "Could not start Sortie",
                uiDescription: "Please end active sortie before starting new one"
            });
            return;
        }

        TripGeoLoggerService.startGPSLogging(onMovementStop, onResumeMoving);
        //
        // create a new sortie 
    }
    public static endSortie(): void {
        const { activeSortie } = store.getState();
        if (activeSortie.sortie) {
            store.dispatch(actionSaveSortieLocally(activeSortie.sortie));
            store.dispatch(actionEndActiveSortie());
        }
    }
    public static startSeaStopManually(): void {
        const { activeSortie } = store.getState();
        const coordinates = activeSortie.sortie?.routeHistory.coordinates[activeSortie.sortie?.routeHistory.coordinates.length - 1];
        if (!activeSortie.isAtSeaStop && coordinates) {
            const seaStop: ISeaStop = {
                durationInSeconds: 0,
                sightings: [],
                start: {
                    epochTime: Date.now(),
                    location: {
                        type: "Point",
                        coordinates
                    }
                }
            }
            store.dispatch(actionInitiateASeaStop(seaStop));
        }

    }
    public static endSeaStopManually(): void {
        const { activeSortie } = store.getState();
        const coordinates = activeSortie.sortie?.routeHistory.coordinates[activeSortie.sortie?.routeHistory.coordinates.length - 1];
        //@ts-ignore
        const durationInSeconds = (Date.now() - activeSortie.isAtSeaStop?.start.epochTime) * 1000;
        if (coordinates) {
            //@ts-ignore
            const seaStop: ISeaStop = {
                ...activeSortie.isAtSeaStop,
                durationInSeconds,
                end: {
                    epochTime: Date.now(),
                    location: {
                        type: "Point",
                        coordinates
                    }
                }
            }
            if (activeSortie.sortie) {
                store.dispatch(actionUpdateActiveSortie({
                    ...activeSortie.sortie,
                    stops: [...activeSortie.sortie?.stops, seaStop]
                }))
            }
            store.dispatch(actionEndASeaStop());
        }
    }

}