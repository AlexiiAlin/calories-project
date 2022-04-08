import {FoodEntry} from "../store/food-entries/food-entries-state";
import moment from "moment";

export const dateFormat = 'YYYY-MM-DD';

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

export const mapFoodEntriesToSeries = (data: Object): any => {
  return {
    name: 'Calories',
    data: sortedPerDayArr(data).map(key => data[key])
  }
}

export const mapFoodEntriesToXAxisCategories = (data: Object) => {
  return sortedPerDayArr(data).map(key => {
    return moment(key).format('DD MMM YYYY');
  });
}

export const mapFoodEntriesToRangeSeries = (data: Object, maxValue) => {
  return Object.keys(data).map(_ => {
    return maxValue;
  });
}

const sortedPerDayArr = (data: Object) => {
  return Object.keys(data).sort(sortByDatesFn);
}

export const sortByDatesFn = (date1, date2) => {
  const diff = moment(date1).diff(moment(date2));
  if (diff > 0) {
    return 1;
  } else if (diff < 0) {
    return -1;
  }
  return 0;
}
