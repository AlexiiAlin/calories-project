import {IAction} from "../interfaces";
import {REPORTING_ACTION_TYPES} from "./reporting-actions";
import {ReportingState} from "./reporting-state";

export const initialState: ReportingState = {
  data: {
    "7-days": 0,
    "14-days": 0
  },
  loading: false,
  error: null
}

export const reportingReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case REPORTING_ACTION_TYPES.LOAD_START: {
      return {...state, loading: true};
    }
    case REPORTING_ACTION_TYPES.LOAD_SUCCESS: {
      return {...state, loading: false, data: action.payload};
    }
    case REPORTING_ACTION_TYPES.LOAD_FAILED: {
      return {...state, loading: false, error: action.error};
    }
    default:
      return state;
  }
};
