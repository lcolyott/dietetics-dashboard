import React, { useEffect } from "react";
import { Address, Contact } from "../../../data/models";
import { StyledInput } from "../";
import { createStyles, FormControl, FormControlLabel, InputLabel, makeStyles, Theme, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        rowGap: ".75rem",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: ".75rem",
        columnGap: ".5rem"
    },
}), { name: "NDDInput-contact" });

interface ContactInputProps {
    required?: boolean;
    label?: string;
    value?: Partial<Contact>;
    onChange?: (address: Partial<Contact>) => void;
};

const ContactInput: React.FunctionComponent<ContactInputProps> = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState<Partial<Contact>>({
        Name: "",
        Email: "",
        Phone: ""
    });

    useEffect(() => {
        // TODO: Setup initial input state if props.value
    }, []);

    useEffect(() => {
        // TODO: Update state with new props.value
    }, [props.value]);

    useEffect(() => {
        props.onChange?.(state);
    }, [state]);

    const changeContact = (key: keyof Partial<Contact>, value: string) => {
        let newState: Partial<Contact> = { ...state };
        newState[key] = value;

        setState(newState);
    };

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <Typography variant={"subtitle1"} color={"textSecondary"}>
                    {(props.label ?? "Contact")}
                </Typography>
            </div>
            <Divider />
            <div className={classes.row}>
                <StyledInput required={props.required} label={"Name"} onChange={(event) => changeContact("Name", event.target.value)} />
                <StyledInput required={props.required} type={"email"} inputMode={"email"} label={"Email"} onChange={(event) => changeContact("Email", event.target.value)} />
                <StyledInput required={props.required} type={"tel"} inputMode={"tel"} inputProps={{ pattern: "[0-9]{3}[0-9]{3}[0-9]{4}" }} label={"Phone"} onChange={(event) => changeContact("Phone", event.target.value)} />
            </div>
        </div>
    );
};

export default ContactInput;