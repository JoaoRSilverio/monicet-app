import RNLocation, { Location } from "react-native-location";
import { actionRunSortie, actionEndActiveSortie, actionEndASeaStop, actionInitiateASeaStop, actionInitiateNewSortie, actionSaveSortieLocally, actionUpdateActiveSortie } from "../Actions/ActionCreators";
import { BEAUFORT_SEA_STATE, ISeaStop, ISortie, MONICET_VISIBILITY_STATE } from "../Interfaces/monicet";
import { APP_WARNING_TYPE } from "../Redux/StateInterface";
import store from "../Store/store";
import AppUIMessageServices from "./AppMessagesService";
import TripGeoLoggerService from "./TripGeoLoggerService";

async function createNewSortie(): Promise<ISortie> {
    //  const location = await RNLocation.getLatestLocation();

    return {
        skipper: "SkipperMan",
        averageKnots: 0,
        boat: "defaultBoat",
        maxKnots: 0,
        routeHistory: {
            type: "LineString",
            coordinates: []
        },
        seaRoute: [],
        sightings: [],
        sortieDurationInSec: 0,
        stops: [],
        visibility: MONICET_VISIBILITY_STATE.UNKNOWN,
        start: {
            epochTime: Date.now(),
            location: {
                type: "Point",
                coordinates: []
            }
        },
        weather: BEAUFORT_SEA_STATE.CALM

    }
}

export default class SortieService {
    public static async startSortie(): Promise<void> {

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
        const newSortie = await createNewSortie();
        store.dispatch(actionInitiateNewSortie(newSortie));
        store.dispatch(actionRunSortie());
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