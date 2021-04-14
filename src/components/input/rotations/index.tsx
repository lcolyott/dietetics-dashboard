import React, { useEffect } from "react";
import { Address, Site } from "../../../data/models";
import { StyledInput } from "../";
import { createStyles, Divider, FormControl, FormControlLabel, InputLabel, makeStyles, Theme, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

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
}), { name: "NDDInput-rotations" });

type OfferedRotations = Pick<Site, "Clinical" | "Community" | "Food" | "Sports">;

interface RotationsInputProps {
    required?: boolean;
    label?: string;
    value?: OfferedRotations;
    onChange?: (rotations: OfferedRotations) => void;
};

const OfferedRotationsInput: React.FunctionComponent<RotationsInputProps> = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState<OfferedRotations>({
        Clinical: false,
        Community: false,
        Food: false,
        Sports: false
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

    const changeOfferedRotations = (key: keyof OfferedRotations, value: string) => {
        let newState: OfferedRotations = { ...state };
        newState[key] = value === 'true' ? true : false;

        setState(newState);
    };

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <Typography variant={"subtitle1"} color={"textSecondary"}>
                    {props.label ?? "Offered Rotations"}
                </Typography>
            </div>
            <Divider />
            <div className={classes.row}>
                <ToggleButtonGroup>
                    <ToggleButton value={"Clinical"}>
                        Clinical
                    </ToggleButton>
                    <ToggleButton value={"Community"}>
                        Community
                    </ToggleButton>
                    <ToggleButton value={"Food"}>
                        Food
                    </ToggleButton>
                    <ToggleButton value={"Sports"}>
                        Sports
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
};

export default OfferedRotationsInput;