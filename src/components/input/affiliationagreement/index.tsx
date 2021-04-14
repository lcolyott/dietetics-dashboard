import React, { useEffect } from "react";
import { Address, AffiliationAgreement } from "../../../data/models";
import { StyledInput } from "../";
import { createStyles, Divider, FormControl, FormControlLabel, InputLabel, makeStyles, Theme, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        rowGap: ".75rem"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: ".75rem",
        columnGap: ".5rem"
    },
}), { name: "NDDInput-address" });

interface AffiliationInputProps {
    required?: boolean;
    label?: string;
    value?: Partial<AffiliationAgreement>;
    onChange?: (agreement: Partial<AffiliationAgreement>) => void;
};

const AffiliationInput: React.FunctionComponent<AffiliationInputProps> = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState<Partial<AffiliationAgreement>>({
        Number: "",
        Date: new Date(),
        ExpirationDate: new Date(),
        File: undefined
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

    const changeAgreementNumber = (value: string) => {
        let newState: Partial<AffiliationAgreement> = { ...state };
        newState.Number = value;

        setState(newState);
    };

    const changeAgreementDate = (date: MaterialUiPickersDate) => {

    };

    const changeAgreementExpirationDate = (date: MaterialUiPickersDate) => {

    };

    const uploadFile = () => {

    }

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <Typography variant={"subtitle1"} color={"textSecondary"}>
                    {props.label ?? "Affiliation Agreement"}
                </Typography>
            </div>
            <Divider />
            <div className={classes.row}>
                <StyledInput label={"Agreement Number"} onChange={() => changeAgreementNumber} />
                <DatePicker
                    views={["year", "month", "date"]}
                    label={"Agreement Date"}
                    inputVariant={"outlined"}
                    TextFieldComponent={StyledInput}
                    format={"MM/DD/yyyy"}
                    value={new Date()}
                    onChange={changeAgreementDate}
                />
                <DatePicker
                    views={["year", "month", "date"]}
                    label={"Agreement Expiration Date"}
                    inputVariant={"outlined"}
                    TextFieldComponent={StyledInput}
                    format={"MM/DD/yyyy"}
                    value={new Date()}
                    onChange={changeAgreementExpirationDate}
                />
            </div>
            <div className={classes.row}>
                <StyledInput type={"file"} label={"File"} onChange={uploadFile} />
            </div>
        </div>
    );
};

export default AffiliationInput;