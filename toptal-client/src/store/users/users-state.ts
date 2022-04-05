import {UserInfo} from "../../contexts/user-context";

export interface UsersState {
  data: UserInfo[];
  loading: boolean;
  created: boolean;
  edited: boolean;
  deleted: boolean;
  error: any;
}
