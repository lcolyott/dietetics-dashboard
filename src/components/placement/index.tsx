import { createStyles, makeStyles, Paper, TableBody, TableHead, Theme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Record } from "../../data/models";
import ResponsiveTable, { StyledTableCell, StyledTableRow } from "../responsivetable";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    content: {

    },
    status: {
        display: "inline-flex",
        boxSizing: "border-box",

        justifyContent: "left",
        alignItems: "center",

        paddingLeft: ".5rem",

        width: "15ch",
        height: "2rem",

        borderRadius: "4px",

        fontWeight: "bold",

        "&.incomplete": {
            backgroundColor: "rgba(255, 60, 50, .075)",
            border: "1px solid rgb(255, 60, 50)",
            color: "rgb(255, 60, 50)",
        },
        "&.submitted": {
            backgroundColor: "rgba(255, 190, 50, .075)",
            border: "1px solid rgb(255, 190, 50)",
            color: "rgb(255, 190, 50)",
        },
        "&.approved": {
            backgroundColor: "rgba(30, 200, 30, .075)",
            border: "1px solid rgb(30, 200, 30)",
            color: "rgb(30, 200, 30)",
        }
    }
}), {});

interface PlacementFormsProps {
    forms: Record[];
};

// TODO: Route to appropriate forms when row is clicked
const PlacementForms: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <Paper variant={"outlined"} className={classes.root}>
            <ResponsiveTable>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>
                            Form
                        </StyledTableCell>
                        <StyledTableCell>
                            Due By
                        </StyledTableCell>
                        <StyledTableCell>
                            Status
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow hover>
                        <StyledTableCell>
                            Test Form
                        </StyledTableCell>
                        <StyledTableCell>
                            {new Date().toString()}
                        </StyledTableCell>
                        <StyledTableCell>
                            <div className={clsx(classes.status, "incomplete")}>
                                Incomplete
                            </div>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow hover>
                        <StyledTableCell>
                            Test Form
                        </StyledTableCell>
                        <StyledTableCell>
                            {new Date().toString()}
                        </StyledTableCell>
                        <StyledTableCell>
                            <div className={clsx(classes.status, "submitted")}>
                                Submitted
                            </div>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow hover>
                        <StyledTableCell>
                            Test Form
                        </StyledTableCell>
                        <StyledTableCell>
                            {new Date().toString()}
                        </StyledTableCell>
                        <StyledTableCell>
                            <div className={clsx(classes.status, "approved")}>
                                Approved
                            </div>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </ResponsiveTable>
        </Paper>
    );
};

export default PlacementForms;