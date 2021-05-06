import { createStyles, Paper, Table, TableCell, TableContainer, TableProps, TableRow, Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

// TODO: Hide specified columns on certain breakpoints
// See: Material UI breakpoints

type ResponsiveTableColumn = {
    key: string;
    label: string;
    hidden: "xs" | "sm" | "md" | "lg" | "xl";
};

interface ResponsiveTableProps extends TableProps {
    columns?: ResponsiveTableColumn[];
};

const RTable: React.FunctionComponent<ResponsiveTableProps> = (props) => {
    const tableProps = props as TableProps;

    return (
        <TableContainer component={Paper}>
            <Table {...tableProps} />
        </TableContainer>
    );
};

export const StyledTableRow = withStyles((theme: Theme) => createStyles({
    root: {

    },
}))(TableRow);

export const StyledTableCell = withStyles((theme: Theme) => createStyles({
    root: {
    },
    head: {
        fontWeight: "bolder",

        backgroundColor: "unset",
    }
}))(TableCell);

const ResponsiveTable = withStyles((theme: Theme) => createStyles({
    root: {
        tableLayout: "fixed"
    }
}))(RTable);

export default ResponsiveTable;