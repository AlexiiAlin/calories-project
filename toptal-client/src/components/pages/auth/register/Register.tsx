import React, {useEffect} from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import {componentStyles} from "./register";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {UsersActions} from "../../../../store/users/users-actions";
import {AppState} from "../../../../store/app-state";
import {ROUTES_LAYOUT} from "../../../../routes";
import {useHistory} from "react-router-dom";

// core components

const useStyles = makeStyles(componentStyles as any);

type FormValues = {
  name: string;
  email: string;
  password: string;
  emailExists: any;
};

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => {
    dispatch(UsersActions.createUser({
      name: data.name,
      email: data.email,
      password: data.password
    }));
  });

  const {created, error} = useSelector((state: AppState) => state.users);

  useEffect(() => {
    if (created) {
      history.push(ROUTES_LAYOUT.AUTH + '/login');
      dispatch(UsersActions.resetState());
    }
  }, [dispatch, history, created]);

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

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid item xs={12} lg={5} md={7}>
      <form onSubmit={onSubmit}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette['gray'][600]}
              textAlign="center"
              marginBottom="1rem"
              marginTop=".5rem"
              fontSize="1rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Register to get started
              </Box>
            </Box>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                placeholder="Name"
                inputProps={{style: {marginLeft: 12}}}
                {...register("name", {required: "This field is required", maxLength: 100})}
                error={Boolean(errors && errors.name)}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
              {errors?.name && <p className="error-color">{errors.name.message}</p>}
            </FormControl>


            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="email"
                placeholder="Email"
                inputProps={{style: {marginLeft: 12}}}
                {...register("email", {
                  required: "This field is required",
                  pattern: {value: /(.+)@(.+){2,}\.(.+){2,}/, message: 'This is not a valid email'}
                })}
                error={Boolean(errors && errors.email)}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
              {errors?.email && <p className="error-color">{errors.email.message}</p>}
            </FormControl>

            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="password"
                placeholder="Password"
                inputProps={{style: {marginLeft: 12}}}
                {...register("password", {required: "This field is required"})}
                error={Boolean(errors && errors.password)}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
              {errors?.password && <p className="error-color">{errors.password.message}</p>}
            </FormControl>

            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button
                color="primary"
                variant="contained"
                type="submit"
              >
                Register
              </Button>
              {errors?.emailExists && <p className="error-color">{errors.emailExists.message}</p>}
            </Box>
          </CardContent>
        </Card>
      </form>
    </Grid>
  );
}

export default Register;
