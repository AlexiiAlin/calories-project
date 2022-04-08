import { all } from "redux-saga/effects";
import {usersSaga} from "./users/users-saga";
import {foodEntriesSaga} from "./food-entries/food-entries-saga";
import {reportingSaga} from "./reporting/reporting-saga";

export function* rootSaga() {
  try {
    yield all([
      usersSaga(),
      foodEntriesSaga(),
      reportingSaga()
    ]);
  } catch(e) {
    console.log('Something went wrong in the sagas...', e);
  }
}
