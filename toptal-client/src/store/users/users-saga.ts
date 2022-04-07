import {all, takeEvery, call, put, delay} from "redux-saga/effects";
import axiosInstance from "../../helpers/axios-base";
import {USERS_ACTION_TYPES, UsersActions} from "./users-actions";
import {IAction} from "../interfaces";
import {sanitiseObject} from "../../helpers/utils";

export function* usersSaga() {
  yield all([
    takeEvery(USERS_ACTION_TYPES.LOAD_START, loadUsers),
    takeEvery(USERS_ACTION_TYPES.CREATE_START, createUser),
    takeEvery(USERS_ACTION_TYPES.EDIT_START, editUser),
    takeEvery(USERS_ACTION_TYPES.DELETE_START, deleteUser)
  ]);
}

function* loadUsers() {
  const result = yield call(axiosInstance.get, 'users');
  yield delay(1000);
  yield put(UsersActions.loadUsersSuccess(result.data));
}

function* createUser(action: IAction) {
  try {
    yield call(axiosInstance.post, 'users', action.payload);
    yield put(UsersActions.createUserSuccess());
  } catch (e) {
    yield put(UsersActions.createUserFail(e));
  }
}

function* editUser(action: IAction) {
  try {
    yield delay(1000);
    yield call(axiosInstance.put, `users/${action.payload.id}`, sanitiseObject(action.payload));
    yield put(UsersActions.editUserSuccess());
    yield put(UsersActions.loadUsers());
  } catch (e) {
    yield put(UsersActions.editUserFail(e));
  }
}


function* deleteUser(action: IAction) {
  try {
    yield call(axiosInstance.delete, `users/${action.payload}`);
    yield put(UsersActions.deleteUserSuccess());
  } catch (e) {
    yield put(UsersActions.deleteUserFail(e));
  }
}
