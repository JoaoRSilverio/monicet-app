import RNLocation, { Location } from 'react-native-location';
import { BEAUFORT_SEA_STATE, ISortie, MONICET_VISIBILITY_STATE } from '../Interfaces/monicet';
import { getDistance } from "geolib";
import store from '../Store/store';
import { actionUpdateActiveSortie, actionUpdateAppRequests, actionUpdateUiMsgList } from '../Actions/ActionCreators';
import { ACTIVE_SORTIE_PHASE, APP_PERMISSIONS, APP_REQUEST_TYPE, APP_WARNING_TYPE, IAppMessage, IAppRequest } from '../Redux/StateInterface';
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

export default class TripGeoLoggerService {
   public static async startGPSLogging(
      onStopMoving: (lastLocation: Location) => void,
      onResumeMoving: (lastLocation: Location) => void): Promise<void> {

      let isMoving = true;
      RNLocation.configure({
         distanceFilter: 6,
         desiredAccuracy: { android: "lowPower", ios: "nearestTenMeters" },
         interval: 180 * 1000,
         allowsBackgroundLocationUpdates: true,
         activityType: "otherNavigation",
      })
      const { appServiceState, activeSortie } = store.getState();
      const hasPermissions = await RNLocation.checkPermission({
         ios: "always",
         android: {
            detail: "coarse",
         }
      })

      if (!hasPermissions) {
         const currentRequests = appServiceState.requests;
         const newRequest: IAppRequest = {
            request: APP_PERMISSIONS.LOCATION,
            requestType: APP_REQUEST_TYPE.PERMISSIONS
         }
         store.dispatch(actionUpdateAppRequests([...currentRequests, newRequest]));
         return;
      }

      const stopLogger = RNLocation.subscribeToLocationUpdates(
         (locations: Location[]) => {
            if (
               !activeSortie.sortie ||
               activeSortie.phase !== ACTIVE_SORTIE_PHASE.ONGOING) {

               stopLogger();
               const currentMsgs = appServiceState.messages;
               const errorMsg: IAppMessage = {
                  type: APP_WARNING_TYPE.INFO,
                  uiTitle: "stopping GPS Logging",
                  uiDescription: "no active sortie stopping GPS services"
               }
               store.dispatch(actionUpdateUiMsgList([...currentMsgs, errorMsg]));
               return;
            }


            locations.sort((a: Location, b: Location) => a.timestamp - b.timestamp);
            const { altitude, latitude, longitude, speed } = locations[0];
            // @ts-ignore
            const { coordinates } = activeSortie.sortie.routeHistory;
            const previousLoc = { latitude: coordinates[coordinates.length - 1][0], longitude: coordinates[coordinates.length - 1][1] }
            const latestPos = { latitude, longitude };
            if (getDistance(latestPos, previousLoc) > TRESHOLD_FOR_STOP_IN_METERS) {
               isMoving = false;
               onStopMoving(locations[0]);
            } else if (!isMoving) {
               isMoving = true;
               onResumeMoving(locations[0]);
            }

            const updatedSortie: ISortie = {
               ...activeSortie.sortie,
               averageKnots: speed,
               maxKnots: speed,
               routeHistory: {
                  ...activeSortie.sortie.routeHistory,
                  coordinates: [...mockSortie.routeHistory.coordinates, [latitude, longitude, altitude]]
               }
            }

            store.dispatch(actionUpdateActiveSortie(updatedSortie));
         }
      )

   };
   public static endGPSLogging(): void{};
}