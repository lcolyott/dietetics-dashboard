import React from "react";
import { createStyles, List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer, SwipeableDrawerProps, Theme, Toolbar, withStyles } from "@material-ui/core";
import classes from "*.module.css";
import AuthContext from "../../context/auth";
import { AuthorizedRoutes, routes } from "../../../data/authorization";
import NavContext from "../../context/nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Sidebar = withStyles((theme: Theme) => createStyles({
    root: {

    },
    paper: {
        width: "15rem",
    }
}))(({ classes, ...rest }: SwipeableDrawerProps) => {
    const auth = React.useContext(AuthContext);
    const nav = React.useContext(NavContext);

    const UserRoutes = () => {
        if (auth && auth.user) {
            let userRoutes: AuthorizedRoutes = routes[auth?.user?.Role.toLowerCase() as "student" | "preceptor" | "admin"];

            return (
                <React.Fragment>
                    {Object.values(userRoutes).slice(1).filter(r => r.navigable || r.navigable === undefined).sort((a, b) => ((a.label ?? "") > (b.label ?? "")) ? 1 : -1).map((route, index) => {
                        return (
                            <ListItem button key={index} onClick={() => nav.navigate?.(route)}>
                                {route.icon &&
                                    <ListItemIcon>
                                        <route.icon />
                                    </ListItemIcon>
                                }
                                <ListItemText primary={route.label ?? route.path} />
                            </ListItem>
                        );
                    })}
                </React.Fragment>
            );
        }

        return <React.Fragment />;
    };

    return (
        <SwipeableDrawer classes={{ ...classes }} {...rest}>
            {rest.children}
            <List style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <UserRoutes />
                <ListItem button onClick={auth?.signOut} style={{ marginTop: "auto" }}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faSignOutAlt} size={"2x"} />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                </ListItem>
            </List>
        </SwipeableDrawer>
    );
});

export default Sidebar;
