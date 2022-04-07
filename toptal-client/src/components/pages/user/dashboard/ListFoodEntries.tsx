import React, {useContext, useEffect, useState} from 'react';
import {UserContext, UserType} from "../../../../contexts/user-context";
import {checkUserType} from "../../../../helpers/utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../store/app-state";
import moment from "moment";
import {
  LinearProgress,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TablePagination,
  TableRow,
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import './UserDashboard.css';
import {useHistory} from "react-router-dom";
import {ROUTES_LAYOUT} from "../../../../routes";
import {FoodEntriesActions} from "../../../../store/food-entries/food-entries-actions";

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
  const [userContext] = useContext(UserContext);
  const isUser = checkUserType(userContext, UserType.USER);
  const isAdmin = checkUserType(userContext, UserType.ADMIN);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isUser && userContext.user.id) {
      dispatch(FoodEntriesActions.loadFoodEntries(userContext.user.id));
    } else {
      dispatch(FoodEntriesActions.loadFoodEntries());
    }
  }, [dispatch, isUser, userContext]);

  const {data: foodEntries, loading, deleted} = useSelector((state: AppState) => state.foodEntries);

  useEffect(() => {
    if (deleted) {
      dispatch(FoodEntriesActions.loadFoodEntries());
    }
  }, [dispatch, deleted]);

  const handleDelete = (foodEntryId: number) => {
    dispatch(FoodEntriesActions.deleteFoodEntry(foodEntryId));
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  return (
    <div className="w-full mt-8">
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
    </div>
  );
}

export default ListFoodEntries;
