import React from "react";
import SiteUpdateForm from "./siteupdate";
import AccountUpdateForm from "./accountupdate";
import { createStyles, Divider, makeStyles, Paper, Theme, Toolbar, withStyles, WithStyles } from "@material-ui/core";

const formStyles = (theme: Theme) => createStyles({
    root: {

    },
    container: {

    },
    header: {

    },
    body: {

    },
    footer: {

    }
});

interface ModelInput<T> {

};

interface FormInputMap<T> {
    [key: string]: keyof T;
};

interface UpdateFormProps extends WithStyles<typeof formStyles> {
    model: unknown;
    title?: string;
    locked?: boolean;
    inputMap?: FormInputMap<unknown>;
};

const UpdateForm = withStyles(formStyles)((props: UpdateFormProps) => {
    const { model, title, locked, inputMap, classes } = props;

    return (
        <Paper className={classes.root}>
            <div className={classes.container}>
                {title &&
                    <Toolbar className={classes.header}>
                        {title}
                    </Toolbar>
                }
                <Divider variant={"middle"} />
                <div className={classes.container}>

                </div>
                <Toolbar className={classes.footer}>

                </Toolbar>
            </div>
        </Paper>
    );
});

export { SiteUpdateForm, AccountUpdateForm };

export default UpdateForm;