import { createStyles, makeStyles, Paper, TableBody, TableHead, Theme } from "@material-ui/core";
import React from "react";
import { Record } from "../../../data/models";
import ResponsiveTable, { StyledTableCell, StyledTableRow } from "../../responsiveTable";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    content: {

    }
}), {});

interface PlacementFormsProps {
    forms: Record[];
};

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
                            Incomplete
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
                            Submitted
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
                            Approved
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </ResponsiveTable>
        </Paper>
    );
};

export default PlacementForms;