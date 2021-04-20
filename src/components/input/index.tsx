import { createStyles, Input, InputBase, TextField, TextFieldProps, Theme, WithStyles, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import transitions from "@material-ui/core/styles/transitions";
import React from "react";

const StyledInput = withStyles((theme: Theme) => createStyles({
    root: {
        "& fieldset": {
            border: theme.input.border.unfocused,
            borderRadius: "2px",
            transition: theme.input.border.transition,
        },

        "&:hover": {
            "& fieldset": {
                borderColor: grey[600],
            },
        }
    },
}))(({ classes, ...rest }: Omit<TextFieldProps, "variant">) => (
    <TextField variant={"outlined"} classes={{ ...classes }} {...rest} />
));

// TODO: Create StyledFileInput

const StyledTextField = withStyles((theme: Theme) => createStyles({
    root: {
        marginBottom: ".5rem",
    }
}))(TextField);

export { StyledTextField, StyledInput }