import { LineString, Point } from "geojson";
import { ISeaPosition } from "../Interfaces/monicet";

export default class SeaInfoService {
    public static updateSeaInfoForCurrentSortie(): void {
        
     };
    public static async getSeaInfoForRoute(route: LineString): Promise<ISeaPosition[]> { 

    };
    public static async getSeaInfoForPoint(point: Point): Promise<ISeaPosition> {

     };
}