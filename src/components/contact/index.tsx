import { Avatar, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { Contact } from "../../data/models";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "inline-block",

        backgroundColor: theme.palette.background.default,
        border: theme.input.border.unfocused,
        borderRadius: "8px",

        "&:hover": {
            backgroundColor: "lightgrey",
            cursor: "pointer",
        }
    },
    content: {
        display: "flex",
        flexDirection: "row",
        columnGap: "1rem",
        padding: "1rem"
    },
    avatarContainer: {
        display: "flex",
        flexBasis: "auto",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
    },
    infoContainer: {
        display: "flex",
        flexDirection: "column",
    }
}), { name: "NDDview-contact" });

interface ContactCardProps {
    contact: Contact;
};

const ContactCard: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.avatarContainer}>
                    <Avatar alt={"John Doe"} className={classes.avatar} />
                </div>
                <div className={classes.infoContainer}>
                    <Typography variant={"h6"}>
                        Ron Gorbagio
                    </Typography>
                    <Typography variant={"subtitle2"}>
                        Preceptor
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;