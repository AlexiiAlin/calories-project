import { all } from "redux-saga/effects";
import {usersSaga} from "./users/users-saga";
import {foodEntriesSaga} from "./food-entries/food-entries-saga";

export function* rootSaga() {
  try {
    yield all([
      usersSaga(),
      foodEntriesSaga(),
    ]);
  } catch(e) {
    console.log('Something went wrong in the sagas...', e);
  }
}
