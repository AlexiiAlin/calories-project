import {IAction} from "../interfaces";
import {FoodEntriesState} from "./food-entries-state";
import {FOOD_ENTRIES_ACTION_TYPES} from "./food-entries-actions";

export const initialState: FoodEntriesState = {
  data: [],
  loading: false,
  created: false,
  edited: false,
  deleted: false,
  error: null
}

export const foodEntriesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case FOOD_ENTRIES_ACTION_TYPES.LOAD_START: {
      return {...state, loading: true};
    }
    case FOOD_ENTRIES_ACTION_TYPES.LOAD_SUCCESS: {
      return {...state, loading: false, data: action.payload};
    }
    case FOOD_ENTRIES_ACTION_TYPES.LOAD_FAILED: {
      return {...state, loading: false, error: action.error};
    }
    case FOOD_ENTRIES_ACTION_TYPES.CREATE_START: {
      return {...state, loading: true, created: false};
    }
    case FOOD_ENTRIES_ACTION_TYPES.CREATE_SUCCESS: {
      return {...state, loading: false, created: true};
    }
    case FOOD_ENTRIES_ACTION_TYPES.CREATE_FAIL: {
      return {...state, loading: false, created: false, error: action.error};
    }
    case FOOD_ENTRIES_ACTION_TYPES.EDIT_START: {
      return {...state, loading: true, edited: false};
    }
    case FOOD_ENTRIES_ACTION_TYPES.EDIT_SUCCESS: {
      return {...state, loading: false, edited: true};
    }
    case FOOD_ENTRIES_ACTION_TYPES.EDIT_FAIL: {
      return {...state, loading: false, edited: false, error: action.error};
    }
    case FOOD_ENTRIES_ACTION_TYPES.DELETE_START: {
      return {...state, loading: true, deleted: false};
    }
    case FOOD_ENTRIES_ACTION_TYPES.DELETE_SUCCESS: {
      return {...state, loading: false, deleted: true};
    }
    case FOOD_ENTRIES_ACTION_TYPES.DELETE_FAIL: {
      return {...state, loading: false, deleted: false, error: action.error};
    }
    case FOOD_ENTRIES_ACTION_TYPES.RESET_STATE: {
      return {...initialState};
    }
    default:
      return state;
  }
};
