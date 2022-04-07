import React, {useEffect} from 'react';
import {Input, Typography} from "@material-ui/core";
import {SubmitButton} from "../../../shared/submit-button/SubmitButton";
import {useDispatch, useSelector} from "react-redux";
import {UserInfo} from "../../../../contexts/user-context";
import {RouteProps} from "../../../../helpers/interfaces";
import {useHistory} from "react-router-dom";
import {AppState} from "../../../../store/app-state";
import {ROUTES_LAYOUT} from "../../../../routes";
import {useForm} from "react-hook-form";
import {UsersActions} from "../../../../store/users/users-actions";

type FormValues = {
  name: string;
  email: string;
  password: string;
  emailExists: any;
};

const getDefaultValues = (userInfo: UserInfo): FormValues => {
  return userInfo && {
    name: userInfo.name || '',
    email: userInfo.email || '',
    password: '',
    emailExists: false
  };
}

function AddEditInfo(props: RouteProps) {
  const userInfo = props.location.state as UserInfo;
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<FormValues>({
    defaultValues: getDefaultValues(userInfo)
  });
  const onSubmit = handleSubmit((data) => {
    const editedPatient = {
      id: userInfo.id,
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(UsersActions.editUser(editedPatient));
  });

  const {edited, loading, error} = useSelector((state: AppState) => state.users);

  useEffect(() => {
    if (edited) {
      history.push(ROUTES_LAYOUT.PATIENT + '/profile');
    }
  }, [dispatch, history, edited]);

  useEffect(() => {
    if (error) {
      setError("emailExists", {
        type: "manual",
        message: "Email already exists!",
      });
      setTimeout(() => {
        clearErrors('emailExists');
        dispatch(UsersActions.resetState());
      }, 3000);
    }
  }, [dispatch, error, setError, clearErrors]);

  return (
    <div className="general-wrapper">
      <Typography variant="h2">
        Edit user info
      </Typography>

      <form className="flex flex-col mt-6" onSubmit={onSubmit}>

        <div className="mb-6">
          <div className="general-row">
            <div className="general-label">
              <Typography variant="body1">
                User name:
              </Typography>
            </div>
            <div className="general-value">
              <Input
                className='w-full'
                type={'text'}
                {...register("name", {required: "This field is required", maxLength: 100})}
              />
            </div>
          </div>
          <div className="general-row">
            {errors?.name && <p className="error-color w-fit">{errors.name.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <div className="general-row">
            <div className="general-label">
              <Typography variant="body1">
                User email:
              </Typography>
            </div>
            <div className="general-value">
              <Input
                className='w-full'
                type={'email'}
                {...register("email", {
                  required: "This field is required",
                  pattern: {value: /(.+)@(.+){2,}\.(.+){2,}/, message: 'This is not a valid email'}
                })}
              />
            </div>
          </div>
          <div className="general-row">
            {errors?.email && <p className="error-color w-fit">{errors.email.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <div className="general-row">
            <div className="general-label">
              <Typography variant="body1">
                User password:
              </Typography>
            </div>
            <div className="general-value">
              <Input
                className='w-full'
                type={'password'}
                {...register("password", {required: "This field is required"})}
              />
            </div>
          </div>
          <div className="general-row">
            {errors?.password && <p className="error-color w-fit">{errors.password.message}</p>}
          </div>
        </div>

        <SubmitButton loading={loading} type="submit">
          Edit
        </SubmitButton>

        <div className="general-row">
          {errors?.emailExists && <p className="error-color">{errors.emailExists.message}</p>}
        </div>

      </form>
    </div>
  )
}

export default AddEditInfo;
