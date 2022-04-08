import React, {useContext, useEffect, useState} from 'react';
import {UserContext, UserType} from "../../../../contexts/user-context";
import {checkUserType} from "../../../../helpers/utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../store/app-state";
import moment from "moment";
import {
  LinearProgress,
  Paper, Snackbar,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TablePagination,
  TableRow, Typography,
} from "@material-ui/core";
import {Clear, Delete} from "@material-ui/icons";
import './ListFoodEntries.css';
import {useHistory} from "react-router-dom";
import {ROUTES_LAYOUT} from "../../../../routes";
import {FoodEntriesActions} from "../../../../store/food-entries/food-entries-actions";
import {DatePicker} from "@material-ui/pickers";
import {filterFoodEntries} from "../../../../helpers/mappers";
import {Alert} from "@material-ui/lab";

export type ColumnId = 'id' | 'foodName' | 'price' | 'calories' | 'date';
interface TableColumn {
  id: ColumnId;
  label: string;
  minWidth: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value) => string;
}
const columns: Array<TableColumn> = [
  { id: 'id', label: 'Id', minWidth: 170, align: 'left' },
  { id: 'foodName', label: 'Name', minWidth: 170, align: 'left' },
  { id: 'price', label: 'Price', minWidth: 170, align: 'left' },
  { id: 'calories', label: 'Calories', minWidth: 170, align: 'left' },
  { id: 'date', label: 'Date', minWidth: 170, align: 'left', format: (value) => moment(value).format('DD MMM YYYY, HH:mm')}
];

function ListFoodEntries() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userContext] = useContext(UserContext);
  const isUser = checkUserType(userContext, UserType.USER);
  const isAdmin = checkUserType(userContext, UserType.ADMIN);
  const {data, loading, deleted} = useSelector((state: AppState) => state.foodEntries);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [foodEntries, setFoodEntries] = useState([]);
  const [snackBarOpened, setSnackBarOpened] = useState(false);
  const [snackBarMessages, setSnackBarMessages] = useState([]);

  useEffect(() => {
    if (isUser && userContext.user.id) {
      dispatch(FoodEntriesActions.loadFoodEntries(userContext.user.id));
    } else if (isAdmin) {
      dispatch(FoodEntriesActions.loadFoodEntries());
    }
  }, [dispatch, isUser, isAdmin, userContext]);

  useEffect(() => {
    if (deleted) {
      dispatch(FoodEntriesActions.loadFoodEntries());
    }
  }, [dispatch, deleted]);

  useEffect(() => {
    setFoodEntries(data);
    if (isUser) {
      const newSnackbarMessages = [];

      const today = moment().startOf('day');
      const todayFoodEntries = data.filter(foodEntry => {
        return moment(foodEntry.date).startOf('day').diff(today) === 0;
      });
      const totalCaloriesForToday = todayFoodEntries.reduce((acc, el) => {
        acc += el.calories;
        return acc;
      }, 0);
      if (totalCaloriesForToday > userContext.user.caloriesLimit) {
        newSnackbarMessages.push(
          `You've reached your daily calories limit (${totalCaloriesForToday} calories instead of ${userContext.user.caloriesLimit})`
        );
      }

      const startOfMonth = moment().startOf('month').startOf('day');
      const monthFoodEntries = data.filter(foodEntry => {
        return moment(foodEntry.date).startOf('month').startOf('day').diff(startOfMonth) === 0;
      });

      const totalPriceForMonth = monthFoodEntries.reduce((acc, el) => {
        acc += el.price;
        return acc;
      }, 0);
      if (totalPriceForMonth > userContext.user.monthlyLimit) {
        newSnackbarMessages.push(
          `You've reached your monthly price limit (${totalPriceForMonth}$ instead of ${userContext.user.monthlyLimit}$)`
        );
      }

      if (newSnackbarMessages.length !== 0) {
        setSnackBarMessages(newSnackbarMessages);
        setSnackBarOpened(true)
      }
    }
  }, [data, userContext, isUser]);

  const handleDelete = (foodEntryId: number) => {
    dispatch(FoodEntriesActions.deleteFoodEntry(foodEntryId));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (foodEntry) => {
    if (isAdmin) {
      history.push({
        pathname: ROUTES_LAYOUT.ADMIN + '/edit-food-entry',
        state: foodEntry
      });
    }
  }

  const handleSetStartDate = (date) => {
    setStartDate(date);
    setPage(0);
    const filteredFoodEntries = filterFoodEntries(data, date, endDate);
    setFoodEntries(filteredFoodEntries);
  }

  const handleSetEndDate = (date) => {
    setEndDate(date);
    setPage(0);
    const filteredFoodEntries = filterFoodEntries(data, startDate, date);
    setFoodEntries(filteredFoodEntries);
  }

  return (
    <div className="w-full mt-8">
      <div className="w-full my-4 flex flex-row justify-between">
        <div className="flex items-center">
          <div className="mr-4 h-fit">
            <Typography variant="body2">
              Start date
            </Typography>
          </div>
          <DatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            value={startDate}
            onChange={handleSetStartDate}
          />
          {
            startDate && (
              <div
                className="p-2 cursor-pointer"
                onClick={() => {
                  handleSetStartDate(null);
                }}>
                <Clear/>
              </div>
            )
          }
        </div>
        <div className="flex items-center">
          <div className="mr-4 h-fit">
            <Typography variant="body2">
              End date
            </Typography>
          </div>
          <DatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            value={endDate}
            onChange={handleSetEndDate}
          />
          {
            endDate && (
              <div
                className="p-2 cursor-pointer"
                onClick={() => {
                  handleSetEndDate(null);
                }}>
                <Clear/>
              </div>
            )
          }
        </div>
      </div>

      {<LinearProgress style={{opacity: loading ? 1 : 0, marginBottom: 0}}/>}
      <Paper className={"w-full"}>
        <TableContainer className={"manage-users-table-container"}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {
                  isAdmin && (
                    <TableCell
                      align={'left'}
                      style={{ minWidth: 120 }}
                    >
                      Actions
                    </TableCell>
                  )
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                foodEntries && foodEntries.length > 0 &&
                  foodEntries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={isAdmin && column.id === 'foodName' ? 'cursor-pointer' : ''}
                              onClick={() => {
                                if (column.id !== 'foodName') return;
                                handleRowClick(row);
                              }}>
                              <div className="table-row-content">
                                <div className="margin-auto-0">
                                  {column.format ? column.format(row[column.id]) : row[column.id]}
                                </div>
                              </div>
                            </TableCell>
                          );
                        })}
                        {
                          isAdmin && (
                            <TableCell align={'center'}>
                              <div className="table-row-content">
                                <div className="margin-auto-0 cursor-pointer p-2" onClick={() => {handleDelete(row.id)}}>
                                  <Delete/>
                                </div>
                              </div>
                            </TableCell>
                          )
                        }
                      </TableRow>
                    );
                  })
              }
            </TableBody>
          </Table>

          {
            (!foodEntries || foodEntries.length === 0) && !loading && (
              <div style={{minHeight: 400, display: 'flex', width: '100%'}}>
                <div style={{margin: 'auto'}}>
                  <i>No food entries available...</i>
                </div>
              </div>
            )
          }
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component={'div'}
          count={foodEntries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <Snackbar
        open={snackBarOpened}
        onClose={() => {
          setSnackBarOpened(false);
          setSnackBarMessages([]);
        }}
        autoHideDuration={10000}
      >
        <div className="flex flex-col">
          {
            snackBarMessages.map((snackBarMessage, idx) => {
              return (
                <Alert
                  key={idx}
                  className="mb-6"
                  onClose={() => setSnackBarOpened(false)}
                  severity={'warning'}
                >
                  {snackBarMessage}
                </Alert>
              )
            })
          }
        </div>
      </Snackbar>

    </div>
  );
}

export default ListFoodEntries;
