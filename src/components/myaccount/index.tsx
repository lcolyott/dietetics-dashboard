import { Button, Container, createStyles, Divider, makeStyles, Paper, Theme, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { User } from "../../data/models";
import ContactInput from "../input/contact/indext";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {

    },
}), { name: "NDDview-myaccount" });

interface MyAccountProps {
    user: User;
};

const MyAccount: React.FunctionComponent<MyAccountProps> = (props) => {
    const { user } = props;
    const [edit, setEdit] = React.useState<boolean>(false);

    const classes = useStyles();

    // TODO:
    const saveChanges = () => {
        setEdit(false);
    };

    return (
        <Paper variant={"outlined"}>
            <Toolbar>
                <Typography variant={"h6"} color={"primary"}>
                    My Account
                </Typography>
            </Toolbar>
            <Divider variant={"middle"} />
            <Container>
            </Container>
            <Toolbar style={{ justifyContent: "right", columnGap: ".5rem" }}>
                {edit ?
                    (
                        <React.Fragment >
                            <Button color={"primary"} variant={"outlined"} onClick={() => saveChanges()}>
                                Submit
                            </Button>
                            <Button color={"primary"} variant={"outlined"} onClick={() => setEdit(false)}>
                                Cancel
                            </Button>
                        </React.Fragment>
                    ) :
                    (
                        <Button color={"primary"} variant={"outlined"} onClick={() => setEdit(true)}>
                            Edit
                        </Button>
                    )
                }
            </Toolbar>
        </Paper>
    );
};

export default MyAccount;