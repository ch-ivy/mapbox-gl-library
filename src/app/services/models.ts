import * as mapboxgl from 'mapbox-gl';

export interface DBModel {
  agentInfo: AgentInfoModel;
  records: RecordModel[];
  showContactInfo: boolean;
  role: string;
  title: string;
  body: string;
}

interface AgentInfoModel {
  accountID: string;
  firstname: string;
  lastname: string;
  company: string;
  splashMessage: string;
  customHeader: string;
}

export interface RecordModel {
  listID: number;
  order: number;
  propertyID: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  pets: boolean;
  washerDry: string;
  photo: string;
  favorite: boolean;
  highestSentCommissions: number;
  onsiteManager: string | number;
  management: string | number;
  proximity: 0;
  section8: boolean;
  seniorHousing: boolean;
  studentHousting: boolean;
  floorplans: FloorplanModel[];
  highValueAmenities: string[];
  paidUtilities: string[];
  geocode: GeocodeModel;
}

interface FloorplanModel {
  bedrooms: number;
  type: string;
  price: number;
}

export interface GeocodeModel {
  Longitude: number;
  Latitude: number;
  Percision: string;
  IsValid: boolean;
}

export interface MarkerModel {
  center: mapboxgl.MapboxOptions['center'];
  img_link: string;
}

export type MarkerActions = null | 'replace' | 'zoom' | 'popup' | 'addMarker';
