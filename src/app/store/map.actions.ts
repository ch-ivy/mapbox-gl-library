import { createAction, props } from '@ngrx/store';
import { LngLatLike, LngLatBounds } from 'mapbox-gl';
import { MarkerActions, MarkerModel } from '../services/models';

export const loadMapChanged = createAction(
  '[Map] map has changed',
  props<{ center: LngLatLike; zoom: number; markers: MarkerModel[] }>()
);

export const updateMarkerPoints = createAction(
  '[Map] Markers are updated',
  props<{ marker: MarkerModel }>()
);

export const LoadMarkers = createAction(
  '[Map.user] Marker click',
  props<{ state: MarkerActions; image?: string; index?: number }>()
);
