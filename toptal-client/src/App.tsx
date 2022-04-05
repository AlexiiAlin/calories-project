import React, {useState} from 'react';
import './index.css';
import theme from "./theme/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Auth from "./layouts/auth/Auth";
import { ThemeProvider } from "@material-ui/core/styles";
import {IUserContext, UserContext} from './contexts/user-context';
import {AuthService} from "./services/auth.service";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Provider } from 'react-redux';
import {store} from "./store";
import GenericLayout from "./layouts/generic-layout/GenericLayout";
import {ROUTES_LAYOUT} from "./routes";

export function App() {
  const [userContext, setUserContext] = useState({
    user: null,
    logout: (history) => {
      AuthService.logout()
        .then(_ => {
          setUserContext({
            ...userContext,
            user: null
          })
          console.log('Successfully logged out!');
          history.push(ROUTES_LAYOUT.AUTH + '/login')
        })
        .catch(_ => {
          console.log('Something went wrong on logout...')
        });
    }
  } as IUserContext);

  const routes = Object.keys(ROUTES_LAYOUT)
    .filter(routeLayoutKey => ROUTES_LAYOUT[routeLayoutKey] !== ROUTES_LAYOUT.AUTH)
    .map(routeLayoutKey => {
      const routeLayout = ROUTES_LAYOUT[routeLayoutKey];
      return (
        <Route key={routeLayout} path={routeLayout} render={(props) => <GenericLayout {...props} routeLayout={routeLayout} />} />
      )
    })

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CssBaseline />
            <BrowserRouter>
              <Switch>
                {routes}
                <Route path="/auth" render={(props) => <Auth {...props} />} />
                <Redirect from="/" to="/auth/login" />
              </Switch>
            </BrowserRouter>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Provider>
    </UserContext.Provider>
  );
}
