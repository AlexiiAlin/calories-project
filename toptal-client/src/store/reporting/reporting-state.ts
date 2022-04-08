export interface Report {
  '7-days': number;
  '14-days': number;
}

export interface ReportingState {
  data: Report;
  loading: boolean;
  error: any;
}
