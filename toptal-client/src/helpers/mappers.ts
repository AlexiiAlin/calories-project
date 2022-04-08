import {FoodEntry} from "../store/food-entries/food-entries-state";
import moment from "moment";

export const dateFormat = 'DD MMM YYYY';

export const computePerDayObject = (sortedFoodEntries) => {
  if (sortedFoodEntries.length < 2) {
    return {};
  }
  const start = moment(sortedFoodEntries[0].date);
  const end = moment(sortedFoodEntries[sortedFoodEntries.length - 1].date);
  const perDayObj = {};
  const daysBetween = end.diff(start, 'days') + 1;
  for (let i = 0; i < daysBetween; i++) {
    const endDate = moment(end);
    const day = endDate.subtract(i, 'd').format(dateFormat);
    perDayObj[day] = 0;
  }
  return perDayObj;
}

export const mapFoodEntriesToData = (foodEntries: FoodEntry[]) => {
  const perDayObject = computePerDayObject(foodEntries);
  return foodEntries
    .reduce((acc, foodEntry) => {
      if (!acc[foodEntry.date]) {
        acc[foodEntry.date] = foodEntry.calories;
      } else {
        acc[foodEntry.date] += foodEntry.calories;
      }
      return acc;
    }, perDayObject);
}

export const mapFoodEntriesToSeries = (data): any => {
  return {
    name: 'Calories',
    data: Object.keys(data).map(key => data[key])
  }
}

export const mapFoodEntriesToXAxisCategories = (data) => {
  return Object.keys(data).map(key => {
    return moment(key).format(dateFormat);
  });
}

export const mapFoodEntriesToRangeSeries = (data, maxValue) => {
  return Object.keys(data).map(_ => {
    return maxValue;
  });
}
