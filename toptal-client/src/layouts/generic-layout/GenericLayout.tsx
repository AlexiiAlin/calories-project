import React from "react";
import {useLocation, Route, Switch, Redirect} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// @material-ui/icons components
import Search from "@material-ui/icons/Search";

// core components
import {componentStyles} from "./generic-layout";
import {routes, RouteLayout} from "../../routes";
import NavbarDropdown from "../../components/shared/navbar/navbar-dropdown/NavbarDropdown";
import Sidebar from "../../components/shared/sidebar/Siderbar";
import initializeUserContextData from "../../hooks/user-hooks";
import Navbar from "../../components/shared/navbar/Navbar";

const useStyles = makeStyles(componentStyles);

export interface GenericLayoutProps {
  routeLayout: RouteLayout;
}

const GenericLayout = (props: GenericLayoutProps) => {
  initializeUserContextData();
  const classes = useStyles();
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === props.routeLayout) {
        return (
            <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
            />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
      <>
        <>
          <Sidebar
              routes={routes}
              logo={{
                innerLink: props.routeLayout + "/dashboard",
                imgAlt: "...",
                imgSrc: process.env.PUBLIC_URL + '/images/common/datamed-logo.png'
              }}
              dropdown={<NavbarDropdown />}
              input={
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-search-responsive">
                    Search
                  </InputLabel>
                  <OutlinedInput
                      id="outlined-adornment-search-responsive"
                      type="text"
                      endAdornment={
                        <InputAdornment position="end">
                          <Box
                              component={Search}
                              width="1.25rem!important"
                              height="1.25rem!important"
                          />
                        </InputAdornment>
                      }
                      labelWidth={70}
                  />
                </FormControl>
              }
          />
          <Box position="relative" className={classes.mainContent}>
            <Navbar brandText={getBrandText()} />
            <div style={{marginTop: 40, padding: 24, overflow: 'auto'}}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to={props.routeLayout + "/dashboard"} />
              </Switch>
            </div>
          </Box>
        </>
      </>
  );
};

export default GenericLayout;
