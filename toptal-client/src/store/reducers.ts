import {combineReducers} from "redux";
import {patientsReducer as patients} from "./patients/patients-reducer";
import {usersReducer as users} from "./users/users-reducer";

export default combineReducers({
  patients,
  users,
});
