import {all, takeEvery, call, put, delay} from "redux-saga/effects";
import axiosInstance from "../../helpers/axios-base";
import {IAction} from "../interfaces";
import {sanitiseObject} from "../../helpers/utils";
import {FOOD_ENTRIES_ACTION_TYPES, FoodEntriesActions} from "./food-entries-actions";

export function* foodEntriesSaga() {
  yield all([
    takeEvery(FOOD_ENTRIES_ACTION_TYPES.LOAD_START, loadFoodEntries),
    takeEvery(FOOD_ENTRIES_ACTION_TYPES.EDIT_START, editFoodEntry),
    takeEvery(FOOD_ENTRIES_ACTION_TYPES.DELETE_START, deleteFoodEntry)
  ]);
}

function* loadFoodEntries(action: IAction) {
  const loadOneFoodEntry = Boolean(action.payload);
  const url = loadOneFoodEntry ? `food-entries/${action.payload}` : 'food-entries';
  const result = yield call(axiosInstance.get, url);
  if (loadOneFoodEntry) {
    yield put(FoodEntriesActions.loadFoodEntriesSuccess([result.data]));
  } else {
    yield put(FoodEntriesActions.loadFoodEntriesSuccess(result.data));
  }
}

function* editFoodEntry(action: IAction) {
  try {
    yield delay(1000);
    yield call(axiosInstance.put, `food-entries/${action.payload.id}`, sanitiseObject(action.payload));
    yield put(FoodEntriesActions.editFoodEntrySuccess());
  } catch (e) {
    yield put(FoodEntriesActions.editFoodEntryFail(e));
  }
}


function* deleteFoodEntry(action: IAction) {
  try {
    yield delay(1000);
    yield call(axiosInstance.delete, `food-entries/${action.payload}`);
    yield put(FoodEntriesActions.deleteFoodEntrySuccess());
  } catch (e) {
    yield put(FoodEntriesActions.deleteFoodEntryFail(e));
  }
}
