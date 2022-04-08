import React, {useEffect, useState} from 'react';
import {UserInfo, UserType} from "../../../../contexts/user-context";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../store/app-state";
import {
  CircularProgress,
  FormControl,
  Input, LinearProgress, MenuItem,
  Paper, Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow, Typography
} from "@material-ui/core";
import './Reporting.css';
import {UsersActions} from "../../../../store/users/users-actions";
import {ReportingActions} from "../../../../store/reporting/reporting-actions";
import {GeneralRow} from "../../../shared/general-row/GeneralRow";

export type ColumnId = 'id' | 'name' | 'email' | 'userType' | 'avgCalories';

export interface TableColumn {
  id: ColumnId;
  label: string;
  minWidth: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value) => string;
}

const USER_TYPE_LABEL = {
  [UserType.NONE]: 'None',
  [UserType.USER]: 'User',
  [UserType.ADMIN]: 'Admin',
};

const selectValues = {
  userType: Object.keys(USER_TYPE_LABEL).map(value => {
    return {
      value: parseInt(value),
      label: USER_TYPE_LABEL[value]
    }
  }),
};


const columns: Array<TableColumn> = [
  { id: 'id', label: 'Id', minWidth: 170, align: 'left' },
  { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'left' },
  { id: 'userType', label: 'User Type', minWidth: 170, align: 'left', format: (value) => USER_TYPE_LABEL[value] },
  { id: 'avgCalories', label: 'Avg calories (last 7 days)', minWidth: 220, align: 'left' },
];

const usersAreEqual = (user1, user2) => {
  return columns.filter(column => user1[column.id] === user2[column.id]).length === columns.length;
}

const getUserById = (users: Array<UserInfo>, userId: string) => {
  return users.filter(user => user.id === userId)[0];
}

function Reporting() {
  const {data: rows, loading} = useSelector((state: AppState) => state.users);
  const {data: report, loading: reportLoading} = useSelector((state: AppState) => state.reporting);
  const [user, setUser] = useState<UserInfo>(null);
  const [changedColumn, setChangedColumn] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UsersActions.loadUsers());
    dispatch(ReportingActions.loadReporting())
  }, [dispatch]);

  useEffect(() => {
    if (!isEditing) {
      setUser(null);
      setChangedColumn(null);
    }
  }, [rows, isEditing])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeCell = (columnId: ColumnId, row: UserInfo) => {
    setIsEditing(true);
    if (changedColumn && changedColumn !== columnId && !usersAreEqual(user, getUserById(rows, user.id))) {
      setUser(user);
      dispatch(UsersActions.editUser(user));
    }
    if (user && user.id === row.id) {
      setUser({...user, [columnId]: row[columnId]});
    } else {
      setUser(row);
    }
    setChangedColumn(columnId);
  }

  const handleKeyPress = (ev) => {
    if(ev.key === 'Enter') {
      dispatch(UsersActions.editUser(user));
      setIsEditing(false);
    }
  }

  const renderCell = (row: UserInfo, column: TableColumn) => {
    const value = row[column.id];

    switch (column.id) {
      case 'name':
      case 'email': {
        return (
          user && user.id === row.id && changedColumn === column.id
            ? <Input
                type={'text'}
                value={user[column.id]}
                onChange={((ev) => {
                  setUser({...user, [column.id]: ev.target.value});
                })}
                onKeyPress={handleKeyPress}
              />
            : <div
                className="cursor-pointer p-4 margin-negative"
                onClick={() => handleChangeCell(column.id, row)}
              >
                {column.format ? column.format(value) : value}
              </div>
        );
      }
      case 'userType': {
        return (
          user && user.id === row.id && changedColumn === column.id
            ? <FormControl variant="outlined" className="form-control">
                <Select
                  value={user[column.id]}
                  onChange={((ev) => {
                    const newUser = {...user,  [column.id]: ev.target.value};
                    setUser(newUser);
                    dispatch(UsersActions.editUser(newUser));
                  })}
                >
                  {
                    selectValues[column.id].map(userType => {
                      return (
                        <MenuItem key={userType.value} value={userType.value}>{userType.label}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            : <div
              className="cursor-pointer p-4 margin-negative"
              onClick={() => handleChangeCell(column.id, row)}
            >
              {column.format ? column.format(value) : value}
            </div>
        );
      }
      default: {
        return column.format ? column.format(value) : value
      }
    }
  }

  console.log('report: ', report);

  return (
    <div className="w-full mt-8">
      <div className="mb-4">
        <Typography variant="h2">
          Reporting
        </Typography>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <div className="table-row-content">
                            <div className="margin-auto-0">
                              {renderCell(row, column)}
                            </div>
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component={'div'}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <div className="mt-10 mb-2">
        <Typography variant="h3">
          Added entries
        </Typography>
      </div>
      {reportLoading && <CircularProgress/>}
      {
        !reportLoading && (
          <>
            <GeneralRow label={'Last 7 days'} value={report['7-days']}/>
            <GeneralRow label={'Week before 7 days'} value={report['14-days']}/>
          </>
        )
      }
    </div>
  );
}

export default Reporting;
