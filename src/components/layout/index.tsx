import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AppBar, Container, createStyles, CssBaseline, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar, Typography, withStyles } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
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
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,

        padding: "0",

        overflow: "hidden",
    },
    content: {
        flexBasis: "100%",
        padding: theme.spacing(2),

        overflowY: "scroll",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
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
    const nav = useContext(NavContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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
                    />
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Sidebar
                        variant={"permanent"}
                        open
                        onOpen={() => { }}
                        onClose={() => { }}
                    >
                        <Toolbar />
                    </Sidebar>
                </Hidden>
            </nav>
            <Container className={classes.contentContainer}>
                <Toolbar />
                <div className={classes.content}>
                    {props.children}
                </div>
            </Container>
        </div >
    );
};

export default AppLayout;