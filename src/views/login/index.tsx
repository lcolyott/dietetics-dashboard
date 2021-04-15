import React from "react";
import { Button, createStyles, Divider, Grid, makeStyles, Paper, Theme, Typography, useTheme, withStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { StyledTextField } from "../../components/input";
import { isJSDocCommentContainingNode, JSDocUnknownType } from "typescript";
import AuthContext from "../../components/context/auth";
import NavContext from "../../components/context/nav";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "column",

        width: "100%",
        height: "100%",

        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        maxWidth: "25rem",
        margin: "0 0.75rem 0 0.75rem",
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

interface NewAccountProps {
    onCreateAccount: (args?: unknown) => void;
    onSignIn: (args?: unknown) => void;
};

const NewAccount: React.FunctionComponent<NewAccountProps> = (props) => {
    const { onCreateAccount, onSignIn } = props;
    const [userRole, setUserRole] = React.useState<"student" | "preceptor">("student");

    const theme = useTheme();
    const classes = useStyles(theme);

    const handleSetUserRole = (value: "student" | "preceptor" | undefined) => {
        if (value) {
            setUserRole(value);
        }
    }

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
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Name"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Email"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Password"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Retype Password"} />
                <StyledTextField variant={"outlined"} margin={"dense"} label={"Phone"} />
            </Grid>
            <Grid item container>
                <Button fullWidth variant={"outlined"} color={"primary"} style={{ marginBottom: ".5rem" }} onClick={onCreateAccount}>
                    Create Account
                </Button>
                <Button variant={"text"} color={"primary"} onClick={onSignIn}>
                    Already Have An Account?
                </Button>
            </Grid>
        </React.Fragment>
    );
};

interface ExistingAccountProps {
    onSignIn: (args?: unknown) => void;
    onSignUp: (args?: unknown) => void;
};

const ExistingAccount: React.FunctionComponent<ExistingAccountProps> = (props) => {
    const { onSignIn, onSignUp } = props;

    return (
        <React.Fragment>
            <Grid item container justify={"center"}>
                <Typography align={"center"} variant={"h6"} color={"primary"}>
                    Login
                </Typography>
            </Grid>
            <Grid item container justify={"center"}>
                <StyledTextField fullWidth variant={"outlined"} margin={"dense"} label={"Email"} />
                <StyledTextField fullWidth variant={"outlined"} margin={"dense"} label={"Password"} />
            </Grid>
            <Grid item container justify={"flex-end"} style={{ marginTop: "-.5rem", marginBottom: "-.5rem" }}>
                <Typography align={"center"} variant={"caption"} color={"primary"}>
                    Forgot Password?
                </Typography>
            </Grid>
            <Grid item container>
                <Button fullWidth variant={"outlined"} color={"primary"} style={{ marginBottom: ".5rem" }} onClick={onSignIn}>
                    Login
                </Button>
                <Button variant={"text"} color={"primary"} onClick={onSignUp} style={{ justifySelf: "flex-end" }}>
                    Sign Up
                </Button>
            </Grid>
        </React.Fragment >
    );
};

const Login: React.FunctionComponent<RouteComponentProps> = (props) => {
    const [visiblePane, setVisiblePane] = React.useState<string & "login" | "create" | "forgot">("login");

    const classes = useStyles();
    const auth = React.useContext(AuthContext);
    const nav = React.useContext(NavContext);

    // TODO: 
    const signIn = (args?: unknown) => {
        auth?.signIn();
    };

    // TODO:
    const createAccount = (args?: unknown) => {
        auth?.signIn();
    };

    const setPane = (pane: string & "login" | "create" | "forgot") => {
        setVisiblePane(pane);
    };

    const renderVisiblePane = () => {
        switch (visiblePane) {
            case "login": {
                return <ExistingAccount
                    onSignIn={signIn}
                    onSignUp={() => setPane("create")}
                />
            }
            case "create": {
                return <NewAccount
                    onCreateAccount={createAccount}
                    onSignIn={() => setPane("login")}
                />
            }
            case "forgot": {
                return <React.Fragment />
            }
            default: {
                return <React.Fragment />
            }
        }
    };

    return (
        <div className={classes.root}>
            <Paper variant={"outlined"} className={classes.card}>
                <Grid container className={classes.content} spacing={2}>
                    {renderVisiblePane()}
                </Grid>
            </Paper>
        </div>
    );
};

export default Login;