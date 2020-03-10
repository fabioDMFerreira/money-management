import { GlobalFilters } from 'models/GlobalFilters';

import {
  SET_ACTIVE_TAB,
  UPDATE_GLOBAL_FILTER,
} from './financialTypes';

export interface ActionSetActiveTabInterface {
  type: typeof SET_ACTIVE_TAB;
  value: string;
}

export const setActiveTab = (value: string): ActionSetActiveTabInterface => ({
  type: SET_ACTIVE_TAB,
  value,
});

export interface ActionUpdateGlobalFilterInterface {
  type: typeof UPDATE_GLOBAL_FILTER;
  filterKey: keyof GlobalFilters;
  value: any;
}

export const updateGlobalFilter = (filterKey: keyof GlobalFilters, value: any): ActionUpdateGlobalFilterInterface => ({
  type: UPDATE_GLOBAL_FILTER,
  filterKey,
  value,
});

export type FinancialForecastActions =
  ActionSetActiveTabInterface |
  ActionUpdateGlobalFilterInterface;
