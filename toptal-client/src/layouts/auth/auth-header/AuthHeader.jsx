import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {componentStyles} from "./auth-header";

// core components

const useStyles = makeStyles(componentStyles);

const AuthHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
      <>
        <Box
            className={classes.header}
            position="relative"
            paddingTop="8rem"
            paddingBottom="8rem"
        >
          <Container maxWidth="xl">
            <Box marginBottom="6rem" textAlign="center">
              <Box
                  component={Grid}
                  container
                  justifyContent="center"
                  color={theme.palette.white.main}
              >
                <Grid item lg={5} md={6} xs={12}>
                  <h1>Welcome!</h1>
                  <Box
                      component="p"
                      color={theme.palette.gray[400]}
                      lineHeight="1.7"
                      fontSize="1rem"
                  >
                    You can start by logging in or registering if you do not have an account.
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Container>
          <Box
              position="absolute"
              zIndex="100"
              height="70px"
              top="auto"
              bottom="0"
              pointerEvents="none"
              left="0"
              right="0"
              width="100%"
              overflow="hidden"
              transform="translateZ(0)"
          >
            <Box
                bottom="0"
                position="absolute"
                pointerEvents="none"
                component="svg"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
            >
              <Box
                  component="polygon"
                  fill={theme.palette.dark.main}
                  points="2560 0 2560 100 0 100"
              />
            </Box>
          </Box>
        </Box>
      </>
  );
};

export default AuthHeader;
