import { all } from "redux-saga/effects";
import {patientsSaga} from "./patients/patients-saga";
import {usersSaga} from "./users/users-saga";

export function* rootSaga() {
  try {
    yield all([
      patientsSaga(),
      usersSaga(),
    ]);
  } catch(e) {
    console.log('Something went wrong in the sagas...', e);
  }
}
