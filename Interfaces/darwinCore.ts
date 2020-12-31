
export interface IDBRecord{ // maps to every entry in an table
    rightsHolder?: string;
    accessRights?: string;
    language: string;
    type: RECORD_TYPE;
    datasetID: string;
    datasetName: string;
    collectionCode: string;
}


export interface IOcurrence { // map to Encounters
    taxon: any
    ocurrenceID?: string;
    occurrenceDate?: string;
    catalogNumber?: string;
    recordNumber?: string;
    recordedBy?: string; //separated by | 
    basisOfRecord?: BASIS_OF_RECORD;
    individualCount?: number;
    sex?: BIOLOGICAL_SEX;
    lifeStage?:MONICET_VOCAB_LIFE_STAGE
    reproductiveCondition?: string; // add controlled vocabulary
    behavior?: MONICET_BEHAVIOURS | string;
    associatedMedia?: string;
    associatedTaxa?: string[];
    otherCatalogNumbers?: string[];
    occurrenceRemarks: string;
}

export interface IDarwinCoreEvent {  // map to Sightings
    eventID: string;
    fieldNumber: string; //used to sync field notes to this event
    eventDate: string; // The date-time or interval during which an Event occurred
    startDayOfTheYear: number;
    year: number;
    month: number;
    day: number;
    verbatinEventDate: string;
    samplingProtocol: string;
    samplingEffort: string;
    fieldNotes: string;
    eventRemarks: string;
}

export interface IOrganism{ //maps to Individual
    organismID: string;
    organismName: string;
    associatedOcurrences: string;
    associatedOrganisms: string[];
    previousIdentifications: string[];
    organismRemarks: string;

}

export interface IIdentification { // maps to the ID phase of the Encounter
    identifiedBy: string;
    dateIdentified: string;
    identificationReferences: string;
    identificationRemarksProperty: string;
}

export interface ITaxon { // specie definition
    taxonID: string; //check in gbif.org/species
    scientificName: string;
    kingdom: string;
    class: string;
    vernacularName: string;
    taxonRemarks: string;
}


export enum RECORD_TYPE {
    STILL_IMAGE,
    MOVING_IMAGE,
    SOUND,
    EVENT,
    OCURRENCE,
}


export enum BASIS_OF_RECORD {
    HUMAN_OBSERVATION = "HumanObservation",
    MACHINE_OBSERVATION = "MachineObservation"
}

export enum MONICET_VOCAB_LIFE_STAGE {
    ADULT = "adult",
    AULOPHORA_LARVAE = "aulophora larvae",
    IMMATURE = "immature",
    INDETERMINATE = "indeterminate",
    JUVENILE = "juvenile",
    JUVENILE_OR_ADULT = "juvenile+adult",
    JUVENILE_OR_CALF = "juvenile+calf",
    CUB = "calf"

}

export enum MONICET_BEHAVIOURS {
    FEEDING = "feeding",
    RESTING = "resting",
    SOCIALIZING = "socializing",
    TRAVELLING = "travelling"
}
export enum BIOLOGICAL_SEX {
    FEMALE = "female",
    MALE = "male",
    HERMAPHRODITE = "hermaphrodite"
}