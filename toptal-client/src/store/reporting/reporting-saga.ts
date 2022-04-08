import {all, takeEvery, call, put, delay} from "redux-saga/effects";
import axiosInstance from "../../helpers/axios-base";
import {REPORTING_ACTION_TYPES, ReportingActions} from "./reporting-actions";

export function* reportingSaga() {
  yield all([
    takeEvery(REPORTING_ACTION_TYPES.LOAD_START, loadReporting),
  ]);
}

function* loadReporting() {
  yield delay(1000);
  try {
    const result = yield call(axiosInstance.get, 'reporting/food-entries');
    yield put(ReportingActions.loadReportingSuccess(result.data));
  } catch(e) {
    yield put(ReportingActions.loadReportingFailed(e));
  }
}

