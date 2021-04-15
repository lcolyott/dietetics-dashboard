import { createStyles, makeStyles, Paper, Theme, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Site } from "../../data/models";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "inline-block",
        flexGrow: 1,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: ".25rem",
        padding: "1rem",
    },
}), { name: "NDDview-sitecard" });

interface SiteCardProps {
    site: Site
};

const SiteCard: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <Paper variant={"outlined"} className={classes.root}>
            <div className={classes.content}>
                <Typography variant={"h6"}>
                    Test Organization
                </Typography>
                <Typography variant={"subtitle2"}>
                    Address
                </Typography>
            </div>
        </Paper>
    );
};

export default SiteCard;