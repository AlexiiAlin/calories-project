import {PatientsState} from "./patients-state";
import {IAction} from "../interfaces";
import {PATIENTS_ACTION_TYPES} from "./patients-actions";

export const initialState: PatientsState = {
  data: [],
  loading: false,
  edited: false,
  deleted: false,
  error: null
}

export const patientsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case PATIENTS_ACTION_TYPES.LOAD_START: {
      return {...state, loading: true};
    }
    case PATIENTS_ACTION_TYPES.LOAD_SUCCESS: {
      return {...state, loading: false, data: action.payload};
    }
    case PATIENTS_ACTION_TYPES.EDIT_START: {
      return {...state, loading: true, edited: false};
    }
    case PATIENTS_ACTION_TYPES.EDIT_SUCCESS: {
      return {...state, loading: false, edited: true};
    }
    case PATIENTS_ACTION_TYPES.EDIT_FAIL: {
      return {...state, loading: false, edited: false, error: action.error};
    }
    case PATIENTS_ACTION_TYPES.DELETE_START: {
      return {...state, loading: true, deleted: false};
    }
    case PATIENTS_ACTION_TYPES.DELETE_SUCCESS: {
      return {...state, loading: false, deleted: true};
    }
    case PATIENTS_ACTION_TYPES.RESET_STATE: {
      return {...initialState};
    }
    default:
      return state;
  }
};
