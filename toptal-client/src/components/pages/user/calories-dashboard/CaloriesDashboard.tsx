import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../../../../contexts/user-context";
import {AppState} from "../../../../store/app-state";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  mapFoodEntriesToData, mapFoodEntriesToRangeSeries, mapFoodEntriesToSeries, mapFoodEntriesToXAxisCategories
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
    const foodEntriesByDay = foodEntries.map(foodEntry => {
      return {
        ...foodEntry,
        date: moment(foodEntry.date).format('DD MMM YYYY')
      }
    });

    return mapFoodEntriesToData(foodEntriesByDay);
  }, [foodEntries])


  useEffect(() => {
    if (foodEntries.length > 0) {
      const series = mapFoodEntriesToSeries(aggregatedFoodEntries);
      const categories = mapFoodEntriesToXAxisCategories(aggregatedFoodEntries);
      const userName = userState && userState.user && userState.user.name && `User name: ${userState.user.name}`;

      console.log('series: ', series);
      setOptions({
        ...highchartsOptions,
        series: [
          series, {
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

  console.log('re-render...');
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
