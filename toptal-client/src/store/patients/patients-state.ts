import {UserInfo} from "../../contexts/user-context";

export interface PatientsState {
  data: UserInfo[];
  loading: boolean;
  edited: boolean;
  deleted: boolean;
  error: any;
}
