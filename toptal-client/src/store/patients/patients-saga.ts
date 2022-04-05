import {all, takeEvery, call, put, delay} from "redux-saga/effects";
import {PATIENTS_ACTION_TYPES, PatientsActions} from "./patients-actions";
import axiosInstance from "../../helpers/axios-base";
import {IAction} from "../interfaces";
import {sanitiseObject} from "../../helpers/utils";

export function* patientsSaga() {
  yield all([
    takeEvery(PATIENTS_ACTION_TYPES.LOAD_START, loadPatients),
    takeEvery(PATIENTS_ACTION_TYPES.EDIT_START, editPatient),
    takeEvery(PATIENTS_ACTION_TYPES.DELETE_START, deletePatient)
  ]);
}

function* loadPatients(action: IAction) {
  const loadOnePatient = Boolean(action.payload);
  const url = loadOnePatient ? `patients/${action.payload}` : 'patients';
  const result = yield call(axiosInstance.get, url);
  if (loadOnePatient) {
    yield put(PatientsActions.loadPatientsSuccess([result.data]));
  } else {
    yield put(PatientsActions.loadPatientsSuccess(result.data));
  }
}

function* editPatient(action: IAction) {
  try {
    yield delay(1000);
    yield call(axiosInstance.put, `patients/${action.payload.id}`, sanitiseObject(action.payload));
    yield put(PatientsActions.editPatientSuccess());
  } catch (e) {
    yield put(PatientsActions.editPatientFail(e));
  }
}


function* deletePatient(action: IAction) {
  try {
    yield delay(1000);
    yield call(axiosInstance.delete, `patients/${action.payload}`);
    yield put(PatientsActions.deletePatientSuccess());
  } catch (e) {
    yield put(PatientsActions.deletePatientFail(e));
  }
}
