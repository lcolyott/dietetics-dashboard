import React, { useEffect } from "react";
import { Button, createStyles, Divider, Grid, makeStyles, Paper, Theme, Toolbar, Typography, useTheme, withStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { StyledInput, StyledTextField } from "../../components/input";
import { isJSDocCommentContainingNode, JSDocUnknownType } from "typescript";
import AuthContext from "../../components/context/auth";
import NavContext from "../../components/context/nav";
import { UserSignInArgs, UserCreationArgs } from "../../data/events";
import { Form, Formik } from "formik";
import { User } from "../../data/models";
import { getDefaultRoute } from "../../data/authorization";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "column",

        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",

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
    onCreateAccount: (args: UserCreationArgs) => void;
    onSignIn: () => void;
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
    };

    // TODO:
    const createAccount = (args: UserCreationArgs) => {
        onCreateAccount?.(args);
    };

    // TODO:
    const clear = () => {

    };

    return (
        <Formik
            initialValues={{
                Name: "",
                Email: "",
                Password: "",
                RetypePassword: "",
                Phone: ""
            } as UserCreationArgs}
            onSubmit={(values) => createAccount(values)}
        >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit
            }) => (
                <form onSubmit={handleSubmit} >
                    <div style={{ display: "flex", flexDirection: "column", rowGap: ".75rem" }}>
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
                        <Grid item container justify={"center"} direction={"column"} style={{ rowGap: ".75rem" }}>
                            <StyledInput required name={"Name"} label={"Name"} onBlur={handleBlur} onChange={handleChange} />
                            <StyledInput required name={"Email"} label={"Email"} onBlur={handleBlur} onChange={handleChange} />
                            <StyledInput required name={"Password"} label={"Password"} onBlur={handleBlur} onChange={handleChange} />
                            <StyledInput required name={"RetypePassword"} label={"Retype Password"} onBlur={handleBlur} onChange={handleChange} />
                            <StyledInput required name={"Phone"} label={"Phone"} onBlur={handleBlur} onChange={handleChange} />
                        </Grid>
                        <Grid item container>
                            <Button fullWidth variant={"outlined"} color={"primary"} style={{ marginBottom: ".5rem" }} onClick={createAccount}>
                                Create Account
                            </Button>
                            <Button variant={"text"} color={"primary"} onClick={onSignIn}>
                                Already Have An Account?
                            </Button>
                        </Grid>
                    </div>
                </form>
            )}
        </Formik>
    );
};

interface ExistingAccountProps {
    onSignIn: (args: UserSignInArgs) => void;
    onSignUp: () => void;
};

const ExistingAccount: React.FunctionComponent<ExistingAccountProps> = (props) => {
    const { onSignIn, onSignUp } = props;

    // TODO:
    const signIn = (values: UserSignInArgs) => {
        onSignIn?.(values);
    };

    return (
        <Formik
            initialValues={{
                Username: "",
                Password: ""
            } as UserSignInArgs}
            onSubmit={(values) => signIn(values)}
        >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit
            }) => (
                <form onSubmit={handleSubmit}>
                    <Grid item container justify={"center"}>
                        <Typography align={"center"} variant={"h6"} color={"primary"}>
                            Login
                        </Typography>
                    </Grid>
                    <Grid container justify={"center"} style={{ margin: "1rem 0 1rem 0", rowGap: ".75rem" }}>
                        <StyledInput type={"email"} name={"Username"} required fullWidth label={"Email"} value={values.Username} onBlur={handleBlur} onChange={handleChange} />
                        <StyledInput type={"password"} name={"Password"} required fullWidth label={"Password"} value={values.Password} onBlur={handleBlur} onChange={handleChange} />
                    </Grid>
                    <Grid item container justify={"flex-end"} style={{ marginTop: "-.5rem", marginBottom: "1rem" }}>
                        <Typography align={"center"} variant={"caption"} color={"primary"}>
                            Forgot Password?
                        </Typography>
                    </Grid>
                    <Grid item container>
                        <Button type={"submit"} fullWidth variant={"outlined"} color={"primary"} style={{ marginBottom: ".5rem" }}>
                            Login
                        </Button>
                        <Button variant={"text"} color={"primary"} onClick={onSignUp} style={{ justifySelf: "flex-end" }}>
                            Sign Up
                        </Button>
                    </Grid>
                </form>
            )}
        </Formik >
    );
};

const Login: React.FunctionComponent<RouteComponentProps> = (props) => {
    const [visiblePane, setVisiblePane] = React.useState<string & "login" | "create" | "forgot">("login");

    const classes = useStyles();
    const auth = React.useContext(AuthContext);
    const nav = React.useContext(NavContext);

    useEffect(() => {
        if (auth.user) {
            nav?.navigate?.(getDefaultRoute(auth.user.Role));
        }
    }, []);

    const signIn = (args: UserSignInArgs) => {
        auth?.signIn?.(args)
            .then(action => {
                let user = action.payload;

                if (user) {
                    nav?.navigate?.(getDefaultRoute((user as User).Role));
                }
            })
            .catch();
    };

    // TODO:
    const createAccount = (args: UserCreationArgs) => {

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
            <Typography variant={"h2"} align={"center"} color={"primary"}>
                Dietetics <br /> Dashboard
            </Typography>
            <Toolbar />
            <Paper variant={"outlined"} className={classes.card}>
                <Grid container className={classes.content} spacing={2}>
                    {renderVisiblePane()}
                </Grid>
            </Paper>
        </div>
    );
};

export default Login;