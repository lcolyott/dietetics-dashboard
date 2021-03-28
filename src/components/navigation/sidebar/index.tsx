import React from "react";
import { createStyles, makeStyles, SwipeableDrawer, SwipeableDrawerProps, Theme, withStyles } from "@material-ui/core";
import classes from "*.module.css";

const Sidebar = withStyles((theme: Theme) => createStyles({
    root: {

    },
    paper: {
        width: "15rem",
    }
}))(SwipeableDrawer);

export default Sidebar;
