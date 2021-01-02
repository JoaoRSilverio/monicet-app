import GeoLocation, { GeoPosition } from "react-native-geolocation-service";
import { BEAUFORT_SEA_STATE, ISortie, MONICET_VISIBILITY_STATE } from '../Interfaces/monicet';
import { getDistance } from "geolib";
import store from '../Store/store';
import { actionUpdateActiveSortie, actionUpdateAppRequests, actionUpdateUiMsgList } from '../Actions/ActionCreators';
import { ACTIVE_SORTIE_PHASE, APP_PERMISSIONS, APP_REQUEST_TYPE, APP_WARNING_TYPE, IAppMessage, IAppRequest } from '../Redux/StateInterface';
import { PermissionsAndroid } from "react-native";
import AppUIMessageServices from "./AppMessagesService";
const mockSortie: ISortie = {
   averageKnots: 20,
   boat: "fastBoat",
   start: {
      epochTime: 1101010101010,
      location: {
         coordinates: [213123123, 123123],
         type: "Point"
      }
   },
   maxKnots: 35,
   sightings: [],
   skipper: "skipperMan",
   sortieDurationInSec: 12312,
   stops: [],
   weather: BEAUFORT_SEA_STATE.LARGE_WAVELETS,
   visibility: MONICET_VISIBILITY_STATE.VERY_GOOD,
   guide: "guidePerson",
   routeHistory: {
      type: "LineString",
      coordinates: [[121321, 12131, 222], [1313, 12131, 222]],
   },
   seaRoute: [{
      location: {
         coordinates: [213123123, 123123],
         type: "Point"
      },
      distanceToCoastInM: 100,
      seaDepthAtPosition: 1233,
      seaSlopeInRadians: 123
   }],


}

const TRESHOLD_FOR_STOP_IN_METERS = 10
const GPS_INTERVAL = {
   TESTING: 10 * 1000,
   MEDIUM: 180 * 1000
}
export default class TripGeoLoggerService {
   public static async startGPSLogging(
      onStopMoving: (lastLocation: GeoPosition) => void,
      onResumeMoving: (lastLocation: GeoPosition) => void): Promise<void> {
      let isMoving = true;
     /*  RNLocation.configure({
         distanceFilter: 0,
         desiredAccuracy: { android: "balancedPowerAccuracy", ios: "nearestTenMeters" },
         androidProvider: "auto",
         fastestInterval: 10000,
         maxWaitTime: 30000,
         interval: GPS_INTERVAL.TESTING,
         allowsBackgroundLocationUpdates: true,
         pausesLocationUpdatesAutomatically: false,
         showsBackgroundLocationIndicator: true,
         activityType: "otherNavigation",
      }) */
      const { appServiceState } = store.getState();
      const hasPermissions = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (!hasPermissions) {
         const currentRequests = appServiceState.requests;
         const newRequest: IAppRequest = {
            request: APP_PERMISSIONS.LOCATION,
            requestType: APP_REQUEST_TYPE.PERMISSIONS,
            onAccepted: () => TripGeoLoggerService.startGPSLogging(onStopMoving, onResumeMoving)
         }
         store.dispatch(actionUpdateAppRequests([...currentRequests, newRequest]));
         return;
      }

      const stopLogger = GeoLocation.watchPosition(
         (location: GeoPosition) => {
            const activeSortie = store.getState().activeSortie;
            console.log("TripGeo, received location update", location);
            if (
               !activeSortie.sortie ||
               activeSortie.phase !== ACTIVE_SORTIE_PHASE.ONGOING) {
               console.log("logger stopped");

               const currentMsgs = appServiceState.messages;
               const errorMsg: IAppMessage = {
                  type: APP_WARNING_TYPE.INFO,
                  uiTitle: "stopping GPS Logging",
                  uiDescription: "no active sortie stopping GPS services"
               }
               store.dispatch(actionUpdateUiMsgList([...currentMsgs, errorMsg]));
               GeoLocation.clearWatch(stopLogger);
               return;
            }
            console.log("TripGeo, Checking if it is stopped");

            const { coords } = location;
            const { latitude, longitude, altitude, speed } = coords;
            // @ts-ignore
            const { coordinates } = activeSortie.sortie.routeHistory;
            // disabled
            if (coordinates.length > 0) {
               const previousLoc = { latitude: coordinates[coordinates.length - 1][0], longitude: coordinates[coordinates.length - 1][1] }
               const latestPos = { latitude, longitude };
               if (getDistance(latestPos, previousLoc) < TRESHOLD_FOR_STOP_IN_METERS) {
                  isMoving = false;
                  onStopMoving(location);
               } else if (!isMoving) {
                  isMoving = true;
                  onResumeMoving(location);
               }
            }

            console.log("TripGeo, updating Location in routeHistory", latitude, longitude);
               const updatedSortie: ISortie = {
                  ...activeSortie.sortie,
                  averageKnots: speed ? speed : 0,
                  maxKnots: speed ? speed : 0,
                  routeHistory: {
                     ...activeSortie.sortie.routeHistory,
                     coordinates: [...activeSortie.sortie.routeHistory.coordinates, [latitude, longitude, altitude]]
                  }
               }
            
            store.dispatch(actionUpdateActiveSortie(updatedSortie));
         }
         ,
         error => { AppUIMessageServices.addMessage({ uiTitle: error.message, uiDescription: "failed", type: APP_WARNING_TYPE.ERROR }) }
         , {
            accuracy: {
               android: "high",
               ios: "bestForNavigation"
            },
            enableHighAccuracy: true,
            distanceFilter: 0,
            fastestInterval: 10000,
            forceRequestLocation: false,
            useSignificantChanges: true,
            showLocationDialog: false,
            showsBackgroundLocationIndicator: true,


         })

   };
   public static endGPSLogging(): void{};
}