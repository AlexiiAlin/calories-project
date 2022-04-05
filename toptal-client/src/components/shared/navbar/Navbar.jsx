import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import {componentStyles} from "./navbar";
import NavbarDropdown from "./navbar-dropdown/NavbarDropdown";


const useStyles = makeStyles(componentStyles);

export default function Navbar({ brandText }) {
    const classes = useStyles();
    return (
        <>
            <AppBar
                color="transparent"
                elevation={0}
                classes={{ root: classes.appBarRoot }}
            >
                <Toolbar disableGutters>
                    <Container
                        maxWidth={false}
                        component={Box}
                        classes={{ root: classes.containerRoot }}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                            marginTop="0.5rem"
                        >
                            <div>
                                <Typography
                                    className={classes.brandTitle}
                                    variant="h4"
                                    component="a"
                                >
                                    {brandText}
                                </Typography>
                            </div>
                            <Box display="flex" alignItems="center" width="auto">
{/*                                <Box
                                    display="flex"
                                    alignItems="center"
                                    width="auto"
                                    marginRight="1rem"
                                    classes={{
                                        root: classes.searchBox,
                                    }}
                                >
                                </Box>*/}
                                <NavbarDropdown />
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    );
}
