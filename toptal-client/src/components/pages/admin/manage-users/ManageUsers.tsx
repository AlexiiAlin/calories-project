import React, {useEffect, useState} from 'react';
import {UserInfo, UserType} from "../../../../contexts/user-context";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../store/app-state";
import {
  FormControl,
  Input, LinearProgress, MenuItem,
  Paper, Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import './ManageUsers.css';
import {UsersActions} from "../../../../store/users/users-actions";

export type ColumnId = 'id' | 'name' | 'email' | 'userType';

interface TableColumn {
  id: ColumnId;
  label: string;
  minWidth: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value) => string;
}

const USER_TYPE_LABEL = {
  [UserType.NONE]: 'None',
  [UserType.PATIENT]: 'Patient',
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
];

const usersAreEqual = (user1, user2) => {
  return columns.filter(column => user1[column.id] === user2[column.id]).length === columns.length;
}

const getUserById = (users: Array<UserInfo>, userId: string) => {
  return users.filter(user => user.id === userId)[0];
}

function ManageUsers() {
  const {data: rows, loading} = useSelector((state: AppState) => state.users);
  const [user, setUser] = useState<UserInfo>(null);
  const [changedColumn, setChangedColumn] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UsersActions.loadUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!isEditing) {
      setUser(null);
      setChangedColumn(null);
    }
  }, [rows])

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
          rowsPerPageOptions={[10, 25, 100]}
          component={'div'}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default ManageUsers;
