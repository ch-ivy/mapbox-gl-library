import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MarkerModel } from '../services/models';
import { MapState } from './map.reducer';

export const getMapState = createFeatureSelector<MapState>('map');

export const getCurrentCenter = createSelector(
  getMapState,
  (state: MapState) => state.center
);

export const getCurrentZoom = createSelector(
  getMapState,
  (state: MapState) => state.zoom
);

export const getCurrentMarkers = createSelector(
  getMapState,
  (state: MapState) => state.markers
);

export const getSelectedMarker = createSelector(
  getMapState,
  (state: MapState) => state.selected_marker
);
