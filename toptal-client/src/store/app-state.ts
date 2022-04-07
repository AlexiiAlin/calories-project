import {FoodEntriesState} from "./food-entries/food-entries-state";
import {UsersState} from "./users/users-state";

export interface AppState {
  foodEntries: FoodEntriesState;
  users: UsersState;
}
