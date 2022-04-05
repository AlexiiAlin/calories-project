import React, {useContext, useEffect} from 'react';
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import {UserContext} from "../../../../contexts/user-context";
import './PatientProfile.css';
import {useDispatch} from "react-redux";
import {PatientsActions} from "../../../../store/patients/patients-actions";
import {ROUTES_LAYOUT} from "../../../../routes";
import {useHistory} from "react-router-dom";

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
  const dispatch = useDispatch();
  const history = useHistory();
  const [userContext] = useContext(UserContext);

  useEffect(() => {
    if (userContext && userContext.user && userContext.user.id) {
      dispatch(PatientsActions.loadPatients(userContext.user.id));
    }
  }, [dispatch, userContext]);

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
