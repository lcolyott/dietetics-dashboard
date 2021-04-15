import { createStyles, Grid, Paper, Theme, Toolbar, Typography, withStyles } from "@material-ui/core";
import React from "react";
import AuthContext from "../../components/context/auth";
import UserPlacements from "../../components/userplacements";

function Dashboard() {
    const auth = React.useContext(AuthContext);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant={"h3"} color={"primary"}>
                    Welcome Back {auth?.user?.Name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <UserPlacements semesterId={0} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;