import React from "react";
import { createStyles, Grid, makeStyles, Paper, Theme, Typography, withStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {

    },
    card: {

    },
    roleToggle: {
        flexGrow: 1,
    },
    roleToggleButton: {
        border: "1px solid lightgray",

        "&:hover": {
            border: "1px solid lightblue",
        },
        "&-selected": {
            border: "1px solid lightblue",
        }
    }
}));

const RoleToggle = withStyles((theme: Theme) => createStyles({
    grouped: {

    }
}))(ToggleButtonGroup);

const RoleButton = withStyles((theme: Theme) => createStyles({

}))(ToggleButton);

const ExistingAccount = () => {
    return (
        <Grid container>
            <Grid item container>
                <Typography variant={"h6"}>
                    Login
                </Typography>
            </Grid>
            <Grid item container>
                Input
            </Grid>
        </Grid>
    );
};

const NewAccount = () => {
    const classes = useStyles();
    const [userRole, setUserRole] = React.useState<"student" | "preceptor">("student");

    return (
        <React.Fragment>
            <Grid item container>
                <Typography align={"center"} variant={"h6"}>
                    New Account
                </Typography>
            </Grid>
            <Grid item container>
                <RoleToggle exclusive />
            </Grid>
            <Grid item container>
                Input
            </Grid>
        </React.Fragment>
    );
};

const Login: React.FunctionComponent<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const [isLogin, setIsLogin] = React.useState<boolean>(true);

    return (
        <React.Fragment>
            <Paper className={classes.card}>
                <Grid container>
                    <NewAccount />
                </Grid>
            </Paper>
            {/* {isLogin ? (<LoginCard />) : (<NewAccountCard />)} */}
        </React.Fragment>
    );
};

export default Login;