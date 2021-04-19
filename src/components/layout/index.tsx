import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AppBar, Container, createStyles, CssBaseline, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar, Typography, withStyles } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthorizedRoute, AuthorizedRoutes, routes, UserRoles } from "../../data/authorization";
import AuthContext from "../context/auth";
import NavContext from "../context/nav";
import Sidebar from "../navigation/sidebar";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        width: "100vw",
        height: "100vh",

        backgroundColor: theme.palette.background.default,
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: "15rem",
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        overflow: "scroll",

        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    }
}));

const StyledAppBar = withStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.secondary.main,
        borderBottom: "1px solid " + theme.palette.divider,
        boxShadow: "none",

        zIndex: theme.zIndex.drawer + 1,
    }
}))(AppBar);

const AppLayout: React.FunctionComponent<any> = (props) => {
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

    const classes = useStyles();
    const auth = useContext(AuthContext);
    const nav = useContext(NavContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigate = (route: AuthorizedRoute) => {
        nav?.navigate?.(route);

        mobileOpen && setMobileOpen(false);
    };

    // TODO: Grab routes based on user role
    const AuthorizedUserRoutes = () => {
        if (auth && auth.user) {
            let userRoutes: AuthorizedRoutes = routes[auth?.user?.Role.toLowerCase() as "student" | "preceptor" | "admin"];

            return (
                <List>
                    {Object.values(userRoutes).slice(1).filter(r => r.navigable || r.navigable === undefined).map((route, index) => {
                        return (
                            <ListItem button key={index} onClick={() => handleNavigate(route)}>
                                {route.icon &&
                                    <ListItemIcon>
                                        <route.icon />
                                    </ListItemIcon>
                                }
                                <ListItemText primary={route.label ?? route.path} />
                            </ListItem>
                        );
                    })}
                    <ListItem button onClick={() => auth.signOut()}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faSignOutAlt} size={"2x"} />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} />
                    </ListItem>
                </List >
            );
        }

        return <React.Fragment />;
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <StyledAppBar position={"fixed"} color={"secondary"}>
                <Toolbar>
                    <Hidden smUp implementation="css">
                        <IconButton color={"inherit"} edge={"start"} onClick={handleDrawerToggle}>
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <Typography variant={"h6"} color={"primary"}>
                        {nav?.navHeader}
                    </Typography>
                </Toolbar>
            </StyledAppBar>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Sidebar
                        variant={"temporary"}
                        open={mobileOpen}
                        onOpen={() => { }}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <AuthorizedUserRoutes />
                    </Sidebar>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Sidebar
                        variant={"permanent"}
                        open
                        onOpen={() => { }}
                        onClose={() => { }}
                    >
                        <Toolbar />
                        <AuthorizedUserRoutes />
                    </Sidebar>
                </Hidden>
            </nav>
            <Container className={classes.content}>
                <Toolbar />
                {props.children}
            </Container>
        </div >
    );
};

export default AppLayout;