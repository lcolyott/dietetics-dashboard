import { AppBar, Container, createStyles, CssBaseline, Hidden, IconButton, List, ListItem, ListItemText, makeStyles, Theme, Toolbar, withStyles } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";
import { UserRoles } from "../../data/authorization";
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
    const history = useHistory();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigate = (route: string) => {
        history.push(route);

        mobileOpen && setMobileOpen(false);
    };

    // TODO: Grab routes based on user role
    const AuthorizedUserRoutes = () => {
        let authorizedRoutes = [
            "/account",
            "/dashboard",
            "/placements",
            "/users",
            "/scheduling"
        ];

        return (
            <List>
                {authorizedRoutes.map((route, index) => {
                    return (
                        <ListItem button key={index} onClick={() => handleNavigate(route)}>
                            <ListItemText primary={route} />
                        </ListItem>
                    );
                })}
            </List >
        );
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
                <Toolbar />
                {props.children}
            </Container>
        </div >
    );
};

export default AppLayout;