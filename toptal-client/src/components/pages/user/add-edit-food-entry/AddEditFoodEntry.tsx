import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, CircularProgress, Typography} from "@material-ui/core";
import {RouteProps} from "../../../../helpers/interfaces";
import {AppState} from "../../../../store/app-state";
import {useHistory} from "react-router-dom";
import {ROUTES_LAYOUT} from "../../../../routes";
import {GeneralInputRow} from "../../../shared/general-input-row/GeneralInputRow";
import {FoodEntry} from "../../../../store/food-entries/food-entries-state";
import {FoodEntriesActions} from "../../../../store/food-entries/food-entries-actions";
import {GeneralDatePickerRow} from "../../../shared/general-datepicker-row/GeneralDatePickerRow";
import {UserContext, UserType} from "../../../../contexts/user-context";
import {checkUserType} from "../../../../helpers/utils";

interface AddEditFoodEntryProps extends RouteProps {
}

function AddEditFoodEntry(props: AddEditFoodEntryProps) {
  // Initialise
  const foodEntry = props.location.state as FoodEntry;
  const [userContext] = useContext(UserContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const isAdmin = checkUserType(userContext, UserType.ADMIN);

  const {created, edited, deleted, loading} = useSelector((state: AppState) => state.foodEntries);
  if (created || edited || deleted) {
    dispatch(FoodEntriesActions.resetState());
    history.push(ROUTES_LAYOUT.USER + '/dashboard');
  }

  // React State
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState(0);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date())

  // React state: autofill for edit scenario
  useEffect(() => {
    if (!foodEntry) return;
    setFoodName(foodEntry.foodName);
    setCalories(foodEntry.calories);
    setPrice(foodEntry.price);
    setDate(new Date(foodEntry.date));
  }, [foodEntry]);

  const deleteButton = (
    <div className="mr-4 ">
      <Button
        onClick={() => {
          dispatch(FoodEntriesActions.deleteFoodEntry(foodEntry.id));
        }}
        variant="contained"
        color="secondary"
      >
        Delete food entry
      </Button>
    </div>
  )

  const submitButton = (
    <Button
      onClick={() => {
        const modifiedFoodEntry: Partial<FoodEntry> = {
          foodName,
          price,
          calories,
          date: new Date(date).toISOString(),
        };
        if (userContext && userContext.user) {
          modifiedFoodEntry.userId = userContext.user.id;
        }

        if (foodEntry) {
          modifiedFoodEntry.id = foodEntry.id;
          dispatch(FoodEntriesActions.editFoodEntry(modifiedFoodEntry));
        } else {
          dispatch(FoodEntriesActions.createFoodEntry(modifiedFoodEntry));
        }
      }}
      color={'primary'}
      disabled={!(foodName && price && calories)}
    >
      {foodEntry ? 'Edit' : 'Add'} food entry
    </Button>
  )

  return (
    <div className="general-wrapper">
      <div className="mb-4">
        <Typography variant="h2">
          {foodEntry ? 'Edit' : 'Add'} food entry
        </Typography>
      </div>


      <GeneralInputRow
        label={'Food name'}
        state={[foodName, setFoodName]}
      />

      <GeneralInputRow
        label={'Price'}
        type={'number'}
        state={[price, setPrice]}
      />

      <GeneralInputRow
        label={'Calories'}
        type={'number'}
        state={[calories, setCalories]}
      />

      <GeneralDatePickerRow
        label={'Date time'}
        state={[date, setDate]}
        useTimePicker
      />

      <div className="general-row mt-4">
        { loading && <CircularProgress className="mr-4"/> }
        { isAdmin && foodEntry && deleteButton}
        {submitButton}
      </div>
    </div>
  );
}

export default AddEditFoodEntry;
