import {FoodEntriesState} from "./food-entries/food-entries-state";
import {UsersState} from "./users/users-state";
import {ReportingState} from "./reporting/reporting-state";

export interface AppState {
  foodEntries: FoodEntriesState;
  users: UsersState;
  reporting: ReportingState;
}
