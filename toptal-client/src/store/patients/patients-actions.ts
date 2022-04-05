import {UserInfo} from "../../contexts/user-context";

export const PATIENTS_ACTION_TYPES = {
  LOAD_START: '[PATIENTS]LOAD_START',
  LOAD_SUCCESS: '[PATIENTS]LOAD_SUCCESS',
  EDIT_START: '[PATIENTS]EDIT_START',
  EDIT_SUCCESS: '[PATIENTS]EDIT_SUCCESS',
  EDIT_FAIL: '[PATIENTS]EDIT_FAIL',
  RESET_STATE: '[PATIENTS]RESET_STATE',
  DELETE_START: '[PATIENTS]DELETE_START',
  DELETE_SUCCESS: '[PATIENTS]DELETE_SUCCESS',
  DELETE_FAIL: '[PATIENTS]DELETE_FAIL',
}

export class PatientsActions {
  static loadPatients(patientId?: string) {
    return {
      type: PATIENTS_ACTION_TYPES.LOAD_START,
      payload: patientId
    }
  }
  static loadPatientsSuccess(patients: UserInfo[]) {
    return {
      type: PATIENTS_ACTION_TYPES.LOAD_SUCCESS,
      payload: patients
    }
  }

  static editPatient(patient: Partial<UserInfo>) {
    return {
      type: PATIENTS_ACTION_TYPES.EDIT_START,
      payload: patient
    }
  }
  static editPatientSuccess() {
    return {
      type: PATIENTS_ACTION_TYPES.EDIT_SUCCESS,
    }
  }
  static editPatientFail(error) {
    return {
      type: PATIENTS_ACTION_TYPES.EDIT_FAIL,
      error
    }
  }

  static resetState() {
    return {
      type: PATIENTS_ACTION_TYPES.RESET_STATE
    }
  }

  static deletePatient(patientId: string) {
    return {
      type: PATIENTS_ACTION_TYPES.DELETE_START,
      payload: patientId
    }
  }
  static deletePatientSuccess() {
    return {
      type: PATIENTS_ACTION_TYPES.DELETE_SUCCESS,
    }
  }
  static deletePatientFail(error) {
    return {
      type: PATIENTS_ACTION_TYPES.DELETE_FAIL,
      error
    }
  }
}
