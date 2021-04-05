import { createStyles, Table, TableCell, TableProps, TableRow, Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

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
        <Table {...tableProps} />
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

        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }
}))(TableCell);

const ResponsiveTable = withStyles((theme: Theme) => createStyles({
    root: {
        tableLayout: "fixed"
    }
}))(RTable);

export default ResponsiveTable;