import {UserInfo} from "../../contexts/user-context";

export const USERS_ACTION_TYPES = {
  LOAD_START: '[USERS]LOAD_START',
  LOAD_SUCCESS: '[USERS]LOAD_SUCCESS',
  LOAD_FAILED: '[USERS]LOAD_FAILED',
  CREATE_START: '[USERS]CREATE_START',
  CREATE_SUCCESS: '[USERS]CREATE_SUCCESS',
  CREATE_FAIL: '[USERS]CREATE_FAIL',
  EDIT_START: '[USERS]EDIT_START',
  EDIT_SUCCESS: '[USERS]EDIT_SUCCESS',
  EDIT_FAIL: '[USERS]EDIT_FAIL',
  RESET_STATE: '[USERS]RESET_STATE',
  DELETE_START: '[USERS]DELETE_START',
  DELETE_SUCCESS: '[USERS]DELETE_SUCCESS',
  DELETE_FAIL: '[USERS]DELETE_FAIL',
}

export class UsersActions {
  static loadUsers() {
    return {
      type: USERS_ACTION_TYPES.LOAD_START,
    }
  }
  static loadUsersSuccess(doctorsSchedules: UserInfo[]) {
    return {
      type: USERS_ACTION_TYPES.LOAD_SUCCESS,
      payload: doctorsSchedules
    }
  }
  static loadUsersFailed(error) {
    return {
      type: USERS_ACTION_TYPES.LOAD_FAILED,
      error
    }
  }

  static createUser(user: Partial<UserInfo>) {
    return {
      type: USERS_ACTION_TYPES.CREATE_START,
      payload: user
    }
  }
  static createUserSuccess() {
    return {
      type: USERS_ACTION_TYPES.CREATE_SUCCESS,
    }
  }
  static createUserFail(error) {
    return {
      type: USERS_ACTION_TYPES.CREATE_FAIL,
      error
    }
  }

  static editUser(user: Partial<UserInfo | {omitPassword: boolean}>) {
    return {
      type: USERS_ACTION_TYPES.EDIT_START,
      payload: user
    }
  }
  static editUserSuccess() {
    return {
      type: USERS_ACTION_TYPES.EDIT_SUCCESS,
    }
  }
  static editUserFail(error) {
    return {
      type: USERS_ACTION_TYPES.EDIT_FAIL,
      error
    }
  }

  static resetState() {
    return {
      type: USERS_ACTION_TYPES.RESET_STATE
    }
  }

  static deleteUser(userId: number) {
    return {
      type: USERS_ACTION_TYPES.DELETE_START,
      payload: userId
    }
  }
  static deleteUserSuccess() {
    return {
      type: USERS_ACTION_TYPES.DELETE_SUCCESS,
    }
  }
  static deleteUserFail(error) {
    return {
      type: USERS_ACTION_TYPES.DELETE_FAIL,
      error
    }
  }
}
