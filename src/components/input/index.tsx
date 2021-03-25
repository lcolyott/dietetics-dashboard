import { createStyles, TextField, Theme, withStyles } from "@material-ui/core";
import React from "react";

const StyledTextField = withStyles((theme: Theme) => createStyles({
    root: {
        marginBottom: ".5rem",
    }
}))(TextField);

export { StyledTextField }