import { Divider, MenuItem, Paper, Toolbar, Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import react from "react";
import { RouteComponentProps, Switch, useHistory, useRouteMatch } from "react-router";
import { StyledTextField } from "../../components/input";
import AuthRoute from "../../components/navigation/authroute";
import { userRoles } from "../../data/authorization";
import { Semester } from "../../data/models";

// TODO: Move scheduler to its own component
interface SchedulerProps {
    semesterId: number;
};

// TODO: Get students to schedule
const Scheduler: React.FunctionComponent<SchedulerProps> = (props) => {
    const history = useHistory();
    const { semesterId } = props;
    const [state, setState] = React.useState<Semester>();

    useEffect(() => {
        // TODO: Fetch semester by semesterId
    }, [])

    return (
        <Paper>
            <Toolbar>
                <Typography variant={"h6"} color={"primary"}>
                    Scheduling
                </Typography>
            </Toolbar>
            <Divider />
        </Paper>
    );
};

const ScheduleDisplay: React.FunctionComponent<any> = (props) => {
    return (
        <div>
            Schedule Display
        </div>
    );
};

interface SchedulingProps extends RouteComponentProps { };

const Scheduling: React.FunctionComponent<SchedulingProps> = (props) => {
    const history = useHistory();
    let { path, url } = useRouteMatch();

    const [selectedSemesterId, setSelectedSemesterId] = React.useState<number | undefined>(undefined);
    const [semesterRefs, setSemesterRefs] = React.useState<Partial<Semester>[]>([]);

    useEffect(() => {
        //TODO: Fetch semester refs
        setSemesterRefs([
            {
                Id: 0,
                Type: "Spring",
                Year: 2021,
            },
            {
                Id: 1,
                Type: "Fall",
                Year: 2021,
            },
            {
                Id: 2,
                Type: "Spring",
                Year: 2022,
            },
        ])
    }, []);

    const selectSemester = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedSemesterId(parseInt(event.target.value));
    };

    const SemesterSelect = () => {
        return (
            <StyledTextField select label={"Semester"} variant={"outlined"} style={{ width: "25ch" }} value={selectedSemesterId} onChange={selectSemester}>
                {semesterRefs.map((ref, index) => (
                    <MenuItem value={ref.Id}>
                        {ref.Type + " " + ref.Year}
                    </MenuItem>
                ))}
            </StyledTextField>
        );
    };

    return (
        <div>
            <SemesterSelect />
            {selectedSemesterId !== undefined && <Scheduler semesterId={selectedSemesterId} />}
        </div>
    );
};

export default Scheduling;