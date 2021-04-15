import { Button, createStyles, Input, InputBase, makeStyles, Paper, TableBody, TableHead, Theme, Toolbar, Typography, withStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect } from "react";
import { StyledInput } from "../input";
import ResponsiveTable, { StyledTableCell, StyledTableRow } from "../responsiveTable";

const StyledCellInput = withStyles((theme: Theme) => createStyles({
    root: {
        padding: "1rem",
        minHeight: "5rem",

        border: "0px solid white",

        transition: theme.input.border.transition,
    },
    focused: {
        border: "1px solid " + theme.palette.primary.main
    },
    disabled: {
        backgroundColor: theme.palette.background.default
    }
}))(InputBase)

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    content: {
        padding: "1rem",
    },
    body: {
        "& td:not(:last-child)": {
            borderRight: "1px solid " + theme.palette.divider
        }
    }
}), { name: "NDDTimeLogger" });

interface TimeLoggerProps {

};

const TimeLogger: React.FunctionComponent<TimeLoggerProps> = (props) => {
    const classes = useStyles();
    const [weekIndex, setWeekIndex] = React.useState<number>(0);

    useEffect(() => {

    }, []);

    return (
        <Paper variant={"outlined"} className={classes.root}>

            <ResponsiveTable>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>
                            Sunday
                            </StyledTableCell>
                        <StyledTableCell>
                            Monday
                            </StyledTableCell>
                        <StyledTableCell>
                            Tuesday
                            </StyledTableCell>
                        <StyledTableCell>
                            Wednesday
                            </StyledTableCell>
                        <StyledTableCell>
                            Thursday
                            </StyledTableCell>
                        <StyledTableCell>
                            Friday
                            </StyledTableCell>
                        <StyledTableCell>
                            Saturday
                            </StyledTableCell>
                        <StyledTableCell>
                            Total
                            </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody className={classes.body}>
                    <StyledTableRow>
                        {Array(7).fill(0).map((value, index) => (
                            <StyledTableCell key={index} padding={"none"}>
                                <StyledCellInput placeholder={"0.00"} />
                            </StyledTableCell>
                        ))}
                        <StyledTableCell padding={"none"}>
                            <StyledCellInput disabled placeholder={"0.00"} />
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell colSpan={8} padding={"none"}>
                            <StyledCellInput fullWidth placeholder={"Notes"} multiline rows={4} />
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </ResponsiveTable>
            <Toolbar disableGutters style={{ justifyContent: "flex-end", columnGap: ".5rem", padding: "1rem" }}>
                <Button color={"primary"} variant={"outlined"}>
                    Submit
                </Button>
                <Button color={"primary"} variant={"outlined"}>
                    Save
                </Button>
            </Toolbar>
        </Paper>
    );
};

export default TimeLogger;