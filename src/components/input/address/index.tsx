import React, { useEffect } from "react";
import { Address } from "../../../data/models";
import { StyledInput } from "../";
import { createStyles, FormControl, FormControlLabel, InputLabel, makeStyles, Theme, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        rowGap: ".75rem",

        "& .street": {
            flex: "0 1 51ch",
        },
        "& .city": {
            flex: "0 1 auto",
        },
        "& .state": {
            flex: "0 1 15ch",
        },
        "& .zip": {
            flex: "0 1 auto",
        },
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: ".75rem",
        columnGap: ".5rem"
    },
}), { name: "NDDInput-address" });

interface AddressInputProps {
    required?: boolean;
    label?: string;
    value?: Partial<Address>;
    onChange?: (address: Partial<Address>) => void;
};

const AddressInput: React.FunctionComponent<AddressInputProps> = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState<Partial<Address>>({
        Street: "",
        City: "",
        State: "",
        Zip: ""
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

    const changeAddress = (key: keyof Partial<Address>, value: string) => {
        let newState: Partial<Address> = { ...state };
        newState[key] = value;

        setState(newState);
    };

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <Typography variant={"subtitle1"} color={"textSecondary"}>
                    {props.label ?? "Address"}
                </Typography>
            </div>
            <Divider />
            <div className={classes.row}>
                <StyledInput required={props.required} multiline className={"street"} label={"Address Line 1"} onChange={(event) => changeAddress("Street", event.target.value)} />
                <StyledInput required={props.required} className={"city"} label={"City"} onChange={(event) => changeAddress("City", event.target.value)} />
            </div>
            <div className={classes.row}>
                <StyledInput required={props.required} className={"state"} label={"State"} onChange={(event) => changeAddress("State", event.target.value)} />
                <StyledInput required={props.required} className={"zip"} label={"Zip"} onChange={(event) => changeAddress("Zip", event.target.value)} />
            </div>
        </div>
    );
};

export default AddressInput;