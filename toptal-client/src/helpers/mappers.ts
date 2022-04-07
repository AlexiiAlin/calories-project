import {FoodEntry} from "../store/food-entries/food-entries-state";
import moment from "moment";

export const mapFoodEntriesToData = (foodEntries: FoodEntry[]) => {
  return foodEntries
    .sort((fe1, fe2) => {
      const diff = moment(fe1.date).diff(moment(fe2.date));
      if (diff > 0) {
        return 1;
      } else if (diff < 0) {
        return -1;
      }
      return 0;
    })
    .reduce((acc, foodEntry) => {
      if (!acc[foodEntry.date]) {
        acc[foodEntry.date] = foodEntry.calories;
      } else {
        acc[foodEntry.date] += foodEntry.calories;
      }
      return acc;
    }, {});
}

export const mapFoodEntriesToSeries = (data): any => {
  return {
    name: 'Calories',
    data: Object.keys(data).map(key => data[key])
  }
}

export const mapFoodEntriesToXAxisCategories = (data) => {
  return Object.keys(data).map(key => {
    return moment(key).format('DD MMM YYYY');
  });
}

export const mapFoodEntriesToRangeSeries = (data, maxValue) => {
  return Object.keys(data).map(_ => {
    return maxValue;
  });
}
