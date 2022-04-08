import {Report} from "./reporting-state";

export const REPORTING_ACTION_TYPES = {
  LOAD_START: '[REPORTING]LOAD_START',
  LOAD_SUCCESS: '[REPORTING]LOAD_SUCCESS',
  LOAD_FAILED: '[REPORTING]LOAD_FAILED',
}

export class ReportingActions {
  static loadReporting() {
    return {
      type: REPORTING_ACTION_TYPES.LOAD_START
    }
  }
  static loadReportingSuccess(report: Report) {
    return {
      type: REPORTING_ACTION_TYPES.LOAD_SUCCESS,
      payload: report
    }
  }
  static loadReportingFailed(error: any) {
    return {
      type: REPORTING_ACTION_TYPES.LOAD_FAILED,
      error
    }
  }
}
