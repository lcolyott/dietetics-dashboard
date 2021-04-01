import { createStyles, Grid, Paper, Theme, Toolbar, Typography, withStyles } from "@material-ui/core";
import React from "react";
import UserPlacements from "../../components/userplacements";

function Dashboard() {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant={"h3"} color={"primary"}>
                    Welcome Back [Username]
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <UserPlacements semesterId={0} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;