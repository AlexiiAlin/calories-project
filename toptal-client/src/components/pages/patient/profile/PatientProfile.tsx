import React, {useContext} from 'react';
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import {UserContext} from "../../../../contexts/user-context";
import './PatientProfile.css';
import {useDispatch, useSelector} from "react-redux";
import {ROUTES_LAYOUT} from "../../../../routes";
import {useHistory} from "react-router-dom";
import initializeUserContextData from "../../../../hooks/user-hooks";
import {AppState} from "../../../../store/app-state";
import {UsersActions} from "../../../../store/users/users-actions";

const ProfileRow = ({label, value}) => {
  return (
    <div className="flex flex-row mb-4 justify-between">
      <div>
        <Typography variant="body1">
          <b>{label}:</b>
        </Typography>
      </div>
      <div>
        <Typography variant="body1">
          {value}
        </Typography>
      </div>
    </div>
  )
}

function PatientProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userContext] = useContext(UserContext);
  const {edited} = useSelector((state: AppState) => state.users);

  if (edited) {
    initializeUserContextData(true);
    dispatch(UsersActions.resetState());
  }

  if (userContext && userContext.user) {
    console.log('user: ', userContext.user);
  }

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex w-full">
        <div className="flex flex-col w-50 m-auto">
          {
            userContext && userContext.user && <Paper className="flex flex-col w-full px-8 pt-8 pb-4 paper-min-width">
                <div className="avatar-wrapper">
                  <Avatar className="avatar-content">A</Avatar>
                </div>
                <ProfileRow label={'Patient name'} value={userContext.user.name}/>
                <ProfileRow label={'Patient email'} value={userContext.user.email}/>

                {
                  <div className="flex flex-row mx-auto mb-4">
                    <Button
                      className="mx-auto"
                      onClick={() => {
                        history.push({
                          pathname: ROUTES_LAYOUT.PATIENT + '/edit-profile',
                          state: userContext.user
                        })
                      }}
                    >
                      Add/Edit info
                    </Button>
                  </div>
                }
              </Paper>
          }
        </div>
      </div>
    </div>
  )
}

export default PatientProfile;
