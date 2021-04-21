import { Button, Container, createStyles, Divider, IconButton, makeStyles, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Toolbar, Typography } from "@material-ui/core";
import { Delete, TheatersTwoTone } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import clsx from "clsx";
import React, { useEffect } from "react";
import { RouteComponentProps, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { Unauthorized } from "..";
import { StyledInput, StyledTextField } from "../../components/input";
import AuthRoute from "../../components/navigation/authroute";
import ResponsiveTable, { StyledTableCell, StyledTableRow } from "../../components/responsivetable";
import { userRoles } from "../../data/authorization";
import { Course, Semester } from "../../data/models";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {

    },
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: ".75rem",

        padding: theme.spacing(4),

        "& .MuiTextField-root": {
            width: "25ch"
        }
    },
    row: {
        display: "flex",
        flexDirection: "row",
        columnGap: ".5rem",
    },
    actions: {
        padding: theme.spacing(2),
        justifyContent: "flex-end",

        "& > *": {
            margin: theme.spacing(0, 1),
        }
    },
    courseTable: {
    },
    courseField: {
    }
}));

interface SemesterForm {
    Semester: {
        Id?: number;
        Type?: string & "Spring" | "Summer" | "Fall" | "Winter";
        Year?: Date;
        StartDate?: Date;
        EndDate?: Date;
    }
    Courses: Partial<Course>[];
};

const SemesterForm: React.FunctionComponent<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [state, setState] = React.useState<SemesterForm>({
        Semester: {
            Id: undefined,
            Type: undefined,
            Year: new Date(),
            StartDate: new Date(),
            EndDate: new Date()
        },
        Courses: []
    });

    useEffect(() => {
        // TODO: Get semesterId from route
        // If semesterId is 'new', don't fetch data
        // TODO: Fetch semester info and load into state
    }, []);

    const selectSemester = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newState = { ...state };
        newState.Semester.Type = event.target.value as string & "Spring" | "Summer" | "Fall" | "Winter";

        setState(newState);
    };

    const selectYear = (date: MaterialUiPickersDate) => {
        console.log(date);

        let newState = { ...state };
        newState.Semester.Year = date?.toDate() ?? undefined;
        newState.Semester.StartDate?.setFullYear(date?.year() ?? 0);
        newState.Semester.EndDate?.setFullYear(date?.year() ?? 0);

        setState(newState);
    };

    const selectStartDate = (date: MaterialUiPickersDate) => {
        console.log(date);

        let newState = { ...state };
        newState.Semester.StartDate = date?.toDate() ?? undefined;

        setState(newState);
    };

    const selectEndDate = (date: MaterialUiPickersDate) => {
        console.log(date);

        let newState = { ...state };
        newState.Semester.EndDate = date?.toDate() ?? undefined;

        setState(newState);
    };

    const addCourse = () => {
        let newState = { ...state };
        newState.Courses.push({});

        setState(newState);
    };

    // TODO: Removes last index??
    const removeCourse = (index: number) => {
        let newState = { ...state };
        newState.Courses.splice(index, 1);

        setState(newState);
    };

    // TODO: Convert SemesterForm into Semester and Course models
    // TODO: Validate input
    // TODO: Ask for confirmation
    const submit = () => {
        history.push("/semesters");
    };

    const cancel = () => {
        history.push("/semesters");
    };

    return (
        <Paper variant={"outlined"} className={classes.root}>
            <form>
                <div className={classes.content}>
                    <Typography variant={"h6"} color={"primary"}>
                        New Semester
                    </Typography>
                    <Divider />
                    <div className={classes.row}>
                        <StyledInput
                            required
                            select
                            label={"Semester"}
                            value={state.Semester.Type ?? "Spring"}
                            onChange={selectSemester}
                        >
                            <MenuItem value={"Spring"}>Spring</MenuItem>
                            <MenuItem value={"Summer"}>Summer</MenuItem>
                            <MenuItem value={"Fall"}>Fall</MenuItem>
                            <MenuItem value={"Winter"}>Winter</MenuItem>
                        </StyledInput>
                        <DatePicker
                            required
                            disablePast
                            views={["year"]}
                            label={"Year"}
                            inputVariant={"outlined"}
                            TextFieldComponent={StyledInput}
                            value={new Date(state.Semester.Year ?? 0)}
                            onChange={selectYear}
                        />
                    </div>
                    <div className={classes.row}>
                        <DatePicker
                            required
                            disablePast
                            views={["year", "month", "date"]}
                            label={"Start Date"}
                            inputVariant={"outlined"}
                            TextFieldComponent={StyledInput}
                            format={"MM/DD/yyyy"}
                            value={state.Semester.StartDate}
                            onChange={selectStartDate}
                        />
                        <DatePicker
                            required
                            disablePast
                            views={["year", "month", "date"]}
                            label={"Start Date"}
                            inputVariant={"outlined"}
                            TextFieldComponent={StyledInput}
                            format={"MM/DD/yyyy"}
                            value={state.Semester.EndDate}
                            onChange={selectEndDate}
                        />
                    </div>
                </div>
                <div className={clsx(classes.content, classes.courseTable)}>
                    <Typography variant={"subtitle1"} color={"textSecondary"}>
                        Courses
                    </Typography>
                    <Divider />
                    {state.Courses.map((course, index) => (
                        <div className={clsx(classes.courseField, classes.row)}>
                            <StyledInput required label={"Course Number"} />
                            <StyledInput required label={"Course Description"} />
                            <IconButton onClick={() => removeCourse(index)}>
                                <Delete />
                            </IconButton>
                        </div>
                    ))}
                    <div className={clsx(classes.courseField, classes.row)}>
                        <Button color={"primary"} variant={"outlined"} onClick={addCourse}>
                            Add Course
                        </Button>
                    </div>
                </div>
                <Toolbar disableGutters className={classes.actions}>
                    <Button type={"submit"} color={"primary"} variant={"outlined"}>
                        Submit
                    </Button>
                    <Button color={"primary"} variant={"outlined"} onClick={cancel}>
                        Cancel
                    </Button>
                </Toolbar>
            </form >
        </Paper >
    );
};

const SemesterSearch: React.FunctionComponent<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = React.useState<Semester[]>([]);

    useEffect(() => {
        // TODO: fetch semester references into state
    }, [])

    const selectSemester = (semesterId: number) => {
        history.push(`/semesters/${semesterId}}`);
    };

    const addNewSemester = () => {
        history.push("/semesters/new");
    };

    // TODO: Sort semesters by SemesterType Spring -> Summer -> Fall -> Winter, then by Year
    return (
        <div>
            <ResponsiveTable>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>
                            Semester
                        </StyledTableCell>
                        <StyledTableCell>
                            Year
                        </StyledTableCell>
                        <StyledTableCell>
                            Start Date
                        </StyledTableCell>
                        <StyledTableCell>
                            End Date
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {state.map((semester, index) => (
                        <StyledTableRow hover onClick={() => selectSemester(semester.Id as number)}>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </ResponsiveTable>
            <Button fullWidth color={"primary"} variant={"outlined"} onClick={addNewSemester}>
                Add Semester
            </Button>
        </div>
    );
};

interface SemestersProps extends RouteComponentProps { };

const Semesters: React.FunctionComponent<SemestersProps> = (props) => {
    const classes = useStyles();

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <AuthRoute exact path={`${path}`} Component={SemesterSearch} requiredRoles={userRoles.admins} />
            <AuthRoute path={`${path}/:semesterId`} Component={SemesterForm} requiredRoles={userRoles.admins} />
        </Switch>
    );
};

export default Semesters;