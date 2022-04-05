import {PatientsState} from "./patients/patients-state";
import {UsersState} from "./users/users-state";

export interface AppState {
  patients: PatientsState;
  users: UsersState;
}
