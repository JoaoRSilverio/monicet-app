import { LineString, Point } from "geojson";
import { IDarwinCoreEvent, IOcurrence } from "./darwinCore";

export interface ISeaPosition {
    location: Point;
    distanceToCoastInM?: number;
    seaDepthAtPosition?: number;
    seaSlopeInRadians?: number;
}

export interface ITimePlace {
    location?: Point;
    epochTime: number;

}

export interface IEffort {
    start: ITimePlace;
    end?: ITimePlace;
}



export interface IMonicetSortieData {
    boat: string;
    skipper: string;
    guide?: string;
    biologist?: string;
}

export interface IAtmosfericData {
    visibility: MONICET_VISIBILITY_STATE,
    weather: BEAUFORT_SEA_STATE
}

export interface ISortie extends IEffort, IAtmosfericData, IMonicetSortieData {
    id?: string;
    routeHistory: LineString;
    seaRoute: ISeaPosition[];
    stops: ISeaStop[];
    sightings: ISighting[];
    sortieDurationInSec: number;
    averageKnots: number;
    maxKnots: number;
}
export interface ISeaStop extends IEffort {
    durationInSeconds: number;
    sightings: ISighting[];
}

export interface ISighting extends IEffort, IDarwinCoreEvent {
    id?: string;
    position: Point;
    species: string[];
    encounters: IEncounter[];
    mediaAssets: IMediaAsset[]
    nrBoatsPresent: number;
}

export interface IEncounter extends IOcurrence {
    markedIndividual: string;


}

export interface IMediaAsset {
    sortieId: string;
    stopId: string;
    sightingId: string;
    uriLocalPath: string;
    type: MEDIA_TYPE;
}

export enum MEDIA_TYPE {
    IMAGE,
    VIDEO,
    SOUND
}

export enum MONICET_VISIBILITY_STATE {
    VERY_BAD = 1,
    BAD,
    GOOD,
    VERY_GOOD,
    UNKNOWN
}

export enum BEAUFORT_SEA_STATE {
    CALM,
    RIPPLES_W_NO_CREST,
    SMALL_WAVELETS,
    LARGE_WAVELETS,
    SMALL_WAVES,
    MODERATE_WAVES,
    LONG_WAVES
}

export const MONICET_COMUM_SPECIES = {
    Sf: "Golfinho Pintado",
    Tt: "Roaz",
    Sb: "Caldeirao",
    Bb: "Baleia Sardinheira",
    Bm: "Baleia Azul",
    Bp: "Rorqual comum",
    Gm: "Baleia Piloto",
    Mn: "Baleia de bossa",
    Dd: "Golfinho comum",
    Be: "Baleia de Bryde",
    Sc: "Golfinho Riscado",
    Ba: "Baleia ana",
    Gg: "Golfinho de Riso",
    Pm: "Cachalote",
    Oo: "Orca",
    Cc: "Tartaruga careta",
    Pc: "Falsa Orca",
    Dc: "Tartaruga-de-couro",
    Zc: "Zifio",
    Cm: "Tartaruga-verde",
    Zp: "Baleia de bico",
    Mb: "Baleia de bico de Sowerby",
    Em: "Tartaruga-de-escamas",
    Mm: "Baleia de bico de True",
    Lk: "Tartaruga-de-Kemp",
    Ha: "Botnihoso",
    kb: "Cachalote Pigmeu"
}