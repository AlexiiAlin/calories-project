import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../../../../contexts/user-context";
import {AppState} from "../../../../store/app-state";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  dateFormat,
  mapFoodEntriesToData,
  mapFoodEntriesToRangeSeries,
  mapFoodEntriesToSeries,
  mapFoodEntriesToXAxisCategories,
  sortByDatesFn
} from "../../../../helpers/mappers";
import moment from "moment";
import {highchartsOptions} from "./calories-dashboard.config";
import {FoodEntriesActions} from "../../../../store/food-entries/food-entries-actions";

function CaloriesDashboard(props) {
  const [userState] = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userState && userState.user && userState.user.id) {
      dispatch(FoodEntriesActions.loadFoodEntries(userState.user.id));
    }
  }, [dispatch, userState]);

  const {data: foodEntries} = useSelector((state: AppState) => state.foodEntries);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [options, setOptions] = useState(highchartsOptions);

  const aggregatedFoodEntries = useMemo(() => {
    const foodEntriesByDay = foodEntries
      .map(foodEntry => {
        return {
          ...foodEntry,
          date: moment(foodEntry.date).format(dateFormat)
        }
      })
      .sort((fe1, fe2) => sortByDatesFn(fe1.date, fe2.date));
    console.log('foodEntries by day: ', foodEntriesByDay);
    return mapFoodEntriesToData(foodEntriesByDay);
  }, [foodEntries]);


  useEffect(() => {
    if (foodEntries.length > 0) {
      console.log('Agregated FE: ', aggregatedFoodEntries);
      const caloriesSeries = mapFoodEntriesToSeries(aggregatedFoodEntries);
      const categories = mapFoodEntriesToXAxisCategories(aggregatedFoodEntries);
      const userName = userState && userState.user && userState.user.name && `User name: ${userState.user.name}`;

      setOptions({
        ...highchartsOptions,
        series: [
          caloriesSeries, {
            name: 'Daily limit',
            data: mapFoodEntriesToRangeSeries(
              aggregatedFoodEntries,
              userState && userState.user
                ? userState.user.caloriesLimit
                : 2100
            ),
            type: 'area',
            color: Highcharts.getOptions().colors[3],
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
              enabled: false
            }
          }
        ],
        title: {
          text: `Daily calories`
        },
        subtitle: {
          text: userName
        },
        xAxis: {
          categories,
        },
      });
    }
  }, [foodEntries, aggregatedFoodEntries, userState]);

  return (
    <div className="general-wrapper mt-8">
      <div className="w-full">
        {
          foodEntries && (
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              ref={chartComponentRef}
              {...props}
            />
          )
        }
      </div>
    </div>
  );
}

export default CaloriesDashboard;
