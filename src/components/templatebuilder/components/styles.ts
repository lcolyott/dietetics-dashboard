import { createStyles, Theme } from "@material-ui/core";
import { ComponentClassKey } from "./types";

export const componentStyles = (theme: Theme) => createStyles<ComponentClassKey, {}>({
    root: {},
    content: {},
    actions: {},
    draggable: {},
    droppabled: {},
    fullWidth: {},
});