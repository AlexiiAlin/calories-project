import React, {useContext} from 'react';
import {AuthService} from "../../../../services/auth.service";

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
import Lock from "@material-ui/icons/Lock";
import {componentStyles} from "./login";
import {UserContext, UserType} from "../../../../contexts/user-context";
import {useHistory} from "react-router-dom";
import {ROUTES_LAYOUT} from "../../../../routes";
import {useForm} from "react-hook-form";

// core components

const useStyles = makeStyles(componentStyles as any);

type FormValues = {
  email: string;
  password: string;
  badCredentials: any;
};

function Login() {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<FormValues>();

  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [userContext, setUserContext] = useContext(UserContext);

  const onSubmit = handleSubmit((data) => {
    const {email, password} = data;
    AuthService.login(email, password)
      .then((response) => {
        setUserContext({
          ...userContext,
          user: response.data.data
        });
        switch (response.data.data.userType) {
          case UserType.PATIENT: {
            history.push(ROUTES_LAYOUT.PATIENT + '/dashboard');
            break;
          }
          case UserType.ADMIN: {
            history.push(ROUTES_LAYOUT.ADMIN + '/dashboard')
            break;
          }
          default: {
            break;
          }
        }
      })
      .catch(_ => {
        setError("badCredentials", {
          type: "manual",
          message: "Bad credentials!",
        });
        setTimeout(() => {
          clearErrors('badCredentials');
        }, 2000);
      });
  });


  const card = <Card classes={{ root: classes.cardRoot }}>
    <CardContent classes={{ root: classes.cardContent }}>
      <Box
        color={theme.palette['gray'][600]}
        textAlign="center"
        marginBottom="1rem"
        marginTop=".5rem"
        fontSize="1rem"
      >
        <Box fontSize="80%" fontWeight="400" component="small">
          Sign in with credentials
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
              <Lock />
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
          Login
        </Button>

        {errors?.badCredentials && <p className="error-color">{errors.badCredentials.message}</p>}
      </Box>
    </CardContent>
  </Card>

  return (
    <>
      <Grid item xs={12} lg={5} md={7}>
        <form onSubmit={onSubmit}>
          {card}
        </form>
      </Grid>
    </>
  );
}

export default Login;
