import {combineReducers} from "redux";
import {usersReducer as users} from "./users/users-reducer";
import {foodEntriesReducer as foodEntries} from "./food-entries/food-entries-reducer";
import {reportingReducer as reporting} from "./reporting/reporting-reducer";

export default combineReducers({
  users,
  foodEntries,
  reporting
});
