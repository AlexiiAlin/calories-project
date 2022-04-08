import React, {useContext} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import Person from "@material-ui/icons/Person";
import {componentStyles} from "./navbar-dropdown";
import {UserContext, UserType} from "../../../../contexts/user-context";
import {useHistory} from "react-router-dom";
import {USER_TYPE_ROUTE} from "../../../../routes";
import {checkUserType} from "../../../../helpers/utils";

// core components

const useStyles = makeStyles(componentStyles);

export default function NavbarDropdown() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userContext] = useContext(UserContext);
    const isUser = checkUserType(userContext, UserType.USER);
    const profileRoute = userContext && userContext.user && USER_TYPE_ROUTE[userContext.user.userType];
    const history = useHistory();
    const logout = () => userContext.logout(history);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Typography
                variant="h6"
                component="h6"
                classes={{ root: classes.menuTitle }}
            >
                Welcome!
            </Typography>
            {
                isUser && (
                  <Box
                    display="flex!important"
                    alignItems="center!important"
                    component={MenuItem}
                    onClick={() => {history.push(profileRoute + '/profile')}}
                  >
                      <Box
                        component={Person}
                        width="1.25rem!important"
                        height="1.25rem!important"
                        marginRight="1rem"
                      />
                      <span>My profile</span>
                  </Box>
                )
            }
            <Divider component="div" classes={{ root: classes.dividerRoot }} />
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                // onClick={handleMenuClose}
                onClick={logout}
            >
                <Box
                    component={DirectionsRun}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>Logout</span>
            </Box>
        </Menu>
    );

    return (
        <>
            <Button
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                classes={{
                    label: classes.buttonLabel,
                    root: classes.buttonRoot,
                }}
            >
                <Avatar
                    alt="..."
                    classes={{
                        root: classes.avatarRoot,
                    }}
                />
            </Button>
            {renderMenu}
        </>
    );
}
