import {FoodEntry} from "./food-entries-state";

export const FOOD_ENTRIES_ACTION_TYPES = {
  LOAD_START: '[FOOD_ENTRIES]LOAD_START',
  LOAD_SUCCESS: '[FOOD_ENTRIES]LOAD_SUCCESS',
  CREATE_START: '[FOOD_ENTRIES]CREATE_START',
  CREATE_SUCCESS: '[FOOD_ENTRIES]CREATE_SUCCESS',
  CREATE_FAIL: '[FOOD_ENTRIES]CREATE_FAIL',
  EDIT_START: '[FOOD_ENTRIES]EDIT_START',
  EDIT_SUCCESS: '[FOOD_ENTRIES]EDIT_SUCCESS',
  EDIT_FAIL: '[FOOD_ENTRIES]EDIT_FAIL',
  RESET_STATE: '[FOOD_ENTRIES]RESET_STATE',
  DELETE_START: '[FOOD_ENTRIES]DELETE_START',
  DELETE_SUCCESS: '[FOOD_ENTRIES]DELETE_SUCCESS',
  DELETE_FAIL: '[FOOD_ENTRIES]DELETE_FAIL',
}

export class FoodEntriesActions {
  static loadFoodEntries(foodEntryId?: string) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.LOAD_START,
      payload: foodEntryId
    }
  }
  static loadFoodEntriesSuccess(foodEntries: FoodEntry[]) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.LOAD_SUCCESS,
      payload: foodEntries
    }
  }

  static createFoodEntry(foodEntry: Partial<FoodEntry>) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.CREATE_START,
      payload: foodEntry
    }
  }
  static createFoodEntrySuccess() {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.CREATE_SUCCESS,
    }
  }
  static createFoodEntryFail(error) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.CREATE_FAIL,
      error
    }
  }

  static editFoodEntry(foodEntry: Partial<FoodEntry>) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.EDIT_START,
      payload: foodEntry
    }
  }
  static editFoodEntrySuccess() {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.EDIT_SUCCESS,
    }
  }
  static editFoodEntryFail(error) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.EDIT_FAIL,
      error
    }
  }

  static resetState() {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.RESET_STATE
    }
  }

  static deleteFoodEntry(id: number) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.DELETE_START,
      payload: id
    }
  }
  static deleteFoodEntrySuccess() {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.DELETE_SUCCESS,
    }
  }
  static deleteFoodEntryFail(error) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.DELETE_FAIL,
      error
    }
  }
}
