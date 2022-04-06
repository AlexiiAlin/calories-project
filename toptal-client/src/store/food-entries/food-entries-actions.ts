import {FoodEntry} from "./food-entries-state";

export const FOOD_ENTRIES_ACTION_TYPES = {
  LOAD_START: '[FOOD_ENTRIES]LOAD_START',
  LOAD_SUCCESS: '[FOOD_ENTRIES]LOAD_SUCCESS',
  EDIT_START: '[FOOD_ENTRIES]EDIT_START',
  EDIT_SUCCESS: '[FOOD_ENTRIES]EDIT_SUCCESS',
  EDIT_FAIL: '[FOOD_ENTRIES]EDIT_FAIL',
  RESET_STATE: '[FOOD_ENTRIES]RESET_STATE',
  DELETE_START: '[FOOD_ENTRIES]DELETE_START',
  DELETE_SUCCESS: '[FOOD_ENTRIES]DELETE_SUCCESS',
  DELETE_FAIL: '[FOOD_ENTRIES]DELETE_FAIL',
}

export class FoodEntriesActions {
  static loadFoodEntries(patientId?: string) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.LOAD_START,
      payload: patientId
    }
  }
  static loadFoodEntriesSuccess(foodEntries: FoodEntry[]) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.LOAD_SUCCESS,
      payload: foodEntries
    }
  }

  static editFoodEntry(patient: Partial<FoodEntry>) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.EDIT_START,
      payload: patient
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

  static deleteFoodEntry(patientId: string) {
    return {
      type: FOOD_ENTRIES_ACTION_TYPES.DELETE_START,
      payload: patientId
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
