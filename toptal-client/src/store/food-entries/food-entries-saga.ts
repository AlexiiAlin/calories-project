import {all, takeEvery, call, put, delay} from "redux-saga/effects";
import axiosInstance from "../../helpers/axios-base";
import {IAction} from "../interfaces";
import {sanitiseObject} from "../../helpers/utils";
import {FOOD_ENTRIES_ACTION_TYPES, FoodEntriesActions} from "./food-entries-actions";
import {DELAY_MS} from "../sagas";

export function* foodEntriesSaga() {
  yield all([
    takeEvery(FOOD_ENTRIES_ACTION_TYPES.LOAD_START, loadFoodEntries),
    takeEvery(FOOD_ENTRIES_ACTION_TYPES.CREATE_START, createFoodEntry),
    takeEvery(FOOD_ENTRIES_ACTION_TYPES.EDIT_START, editFoodEntry),
    takeEvery(FOOD_ENTRIES_ACTION_TYPES.DELETE_START, deleteFoodEntry)
  ]);
}

function* loadFoodEntries(action: IAction) {
  try {
    yield delay(DELAY_MS);
    const loadUsersFoodEntries = Boolean(action.payload);
    const url = loadUsersFoodEntries ? `food-entries/?userId=${action.payload}` : 'food-entries';
    const result = yield call(axiosInstance.get, url);
    yield put(FoodEntriesActions.loadFoodEntriesSuccess(result.data));
  } catch (e) {
    yield put(FoodEntriesActions.loadFoodEntriesFailed(e));
  }
}

function* createFoodEntry(action: IAction) {
  try {
    yield delay(DELAY_MS);
    yield call(axiosInstance.post, `food-entries`, sanitiseObject(action.payload));
    yield put(FoodEntriesActions.createFoodEntrySuccess());
  } catch (e) {
    yield put(FoodEntriesActions.createFoodEntryFail(e));
  }
}

function* editFoodEntry(action: IAction) {
  try {
    yield delay(DELAY_MS);
    yield call(axiosInstance.put, `food-entries/${action.payload.id}`, sanitiseObject(action.payload));
    yield put(FoodEntriesActions.editFoodEntrySuccess());
  } catch (e) {
    yield put(FoodEntriesActions.editFoodEntryFail(e));
  }
}


function* deleteFoodEntry(action: IAction) {
  try {
    yield delay(DELAY_MS);
    yield call(axiosInstance.delete, `food-entries/${action.payload}`);
    yield put(FoodEntriesActions.deleteFoodEntrySuccess());
  } catch (e) {
    yield put(FoodEntriesActions.deleteFoodEntryFail(e));
  }
}
