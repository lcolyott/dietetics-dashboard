import React from "react";
import { Button, createStyles, Divider, Grid, makeStyles, Paper, Theme, Typography, useTheme, withStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { StyledTextField } from "../../components/input";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        padding: "1rem",
        justifyContent: "center",
    },
    card: {
        maxWidth: "25rem"
    },
    content: {
        padding: "1rem",

        "& .MuiGrid-root:first-of-type": {
            borderBottom: "1px solid " + theme.palette.divider,
        }
    }
}));

const RoleToggle = withStyles((theme: Theme) => createStyles({
    grouped: {
        margin: theme.spacing(2),
        marginBottom: 0,

        '&:not(:first-child)': {
            marginRight: "0",
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            marginLeft: "0",
            borderRadius: theme.shape.borderRadius,
        },
    }
}))(ToggleButtonGroup);

const RoleButton = withStyles((theme: Theme) => createStyles({
    root: {
        position: "relative",

        border: "1px solid " + theme.palette.divider + " !important",
    },
    label: {
        display: "flex",
        flexDirection: "column",

        "& svg": {
            fontSize: "3rem",
            width: "auto",
            height: "3rem",
        }
    },
    sizeLarge: {
        width: "8rem",
        height: "8rem",
    },
    selected: {
        border: "1px solid " + theme.palette.primary.main + " !important",
        backgroundColor: "white !important",
        color: theme.palette.primary.main + " !important",

        "&:after": {
            content: "''",

            position: "absolute",
            right: "-.5rem",
            bottom: "-.5rem",

            width: "1.5rem",
            height: "1.5rem",

            borderRadius: "50%",

            backgroundColor: theme.palette.primary.main,

            webkitBoxShadow: "0px 0px 5px 0px rgba(0,191,255,0.5)",
            mozBoxShadow: "0px 0px 5px 0px rgba(0,191,255,0.5)",
            boxShadow: "0px 0px 5px 0px rgba(0,191,255,0.5)",
        },
    },
}))(ToggleButton);

const NewAccount = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [userRole, setUserRole] = React.useState<"student" | "preceptor">("student");

    const handleSetUserRole = (value: "student" | "preceptor" | undefined) => {
        if (value) {
            setUserRole(value);
        }
    }

    const StudentInput = () => {
        return (
            <React.Fragment>
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Email"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Password"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Retype Password"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"First Name"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Last Name"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Phone"} />
            </React.Fragment>
        );
    };

    const PreceptorInput = () => {
        return (
            <React.Fragment>
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Email"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Password"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Retype Password"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"First Name"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Last Name"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Phone"} />
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Grid item container justify={"center"}>
                <Typography align={"center"} variant={"h6"} color={"primary"}>
                    New Account
                </Typography>
            </Grid>
            <Grid item container justify={"center"}>
                <RoleToggle exclusive size={"large"} value={userRole} onChange={(event, value) => handleSetUserRole(value)} >
                    <RoleButton aria-label={"student"} value={"student"}>
                        <FontAwesomeIcon fixedWidth icon={faGraduationCap} />
                        Student
                    </RoleButton>
                    <RoleButton aria-label={"preceptor"} value={"preceptor"}>
                        <FontAwesomeIcon fixedWidth icon={faUserTie} />
                        Preceptor
                    </RoleButton>
                </RoleToggle>
            </Grid>
            <Grid item container justify={"center"} direction={"column"}>
                {userRole == 'student' ? (<StudentInput />) : (<PreceptorInput />)}
            </Grid>
            <Grid item container direction={"row-reverse"}>
                <Button variant={"outlined"} color={"primary"}>
                    Create Account
                </Button>
            </Grid>
        </React.Fragment>
    );
};

const ExistingAccount = () => {
    return (
        <React.Fragment>
            <Grid item container justify={"center"}>
                <Typography variant={"h6"}>
                    Login
                </Typography>
            </Grid>
            <Grid item container justify={"center"}>
                Input
            </Grid>
        </React.Fragment>
    );
};

const Login: React.FunctionComponent<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const [isLogin, setIsLogin] = React.useState<boolean>(true);

    return (
        <div className={classes.root}>
            <Paper variant={"outlined"} className={classes.card}>
                <Grid container className={classes.content} spacing={2}>
                    <NewAccount />
                </Grid>
            </Paper>
            {/* {isLogin ? (<LoginCard />) : (<NewAccountCard />)} */}
        </div>
    );
};

export default Login;