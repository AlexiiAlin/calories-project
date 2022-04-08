import {UsersState} from "./users-state";
import {IAction} from "../interfaces";
import {USERS_ACTION_TYPES} from "./users-actions";

export const initialState: UsersState = {
  data: [],
  loading: false,
  created: false,
  edited: false,
  deleted: false,
  error: null
}

export const usersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case USERS_ACTION_TYPES.LOAD_START: {
      return {...state, loading: true};
    }
    case USERS_ACTION_TYPES.LOAD_SUCCESS: {
      return {...state, loading: false, data: action.payload};
    }
    case USERS_ACTION_TYPES.LOAD_FAILED: {
      return {...state, loading: false, error: action.error};
    }
    case USERS_ACTION_TYPES.CREATE_START: {
      return {...state, loading: true, created: false};
    }
    case USERS_ACTION_TYPES.CREATE_SUCCESS: {
      return {...state, loading: false, created: true};
    }
    case USERS_ACTION_TYPES.CREATE_FAIL: {
      return {...state, loading: false, created: false, error: action.error};
    }
    case USERS_ACTION_TYPES.EDIT_START: {
      return {...state, loading: true, edited: false};
    }
    case USERS_ACTION_TYPES.EDIT_SUCCESS: {
      return {...state, loading: false, edited: true};
    }
    case USERS_ACTION_TYPES.EDIT_FAIL: {
      return {...state, loading: false, edited: false, error: action.error};
    }
    case USERS_ACTION_TYPES.DELETE_START: {
      return {...state, loading: true, deleted: false};
    }
    case USERS_ACTION_TYPES.DELETE_SUCCESS: {
      return {...state, loading: false, deleted: true};
    }
    case USERS_ACTION_TYPES.DELETE_FAIL: {
      return {...state, loading: false, deleted: false, error: action.error};
    }
    case USERS_ACTION_TYPES.RESET_STATE: {
      return {...initialState};
    }
    default:
      return state;
  }
};
