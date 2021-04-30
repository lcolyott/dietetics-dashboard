import { Container, Divider, MenuItem, Paper, Toolbar, Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import react from "react";
import { RouteComponentProps, Switch, useHistory, useRouteMatch } from "react-router";
import { StyledInput, StyledTextField } from "../../components/input";
import AuthRoute from "../../components/navigation/authroute";
import { userRoles } from "../../data/authorization";
import { Semester } from "../../data/models";

// TODO: Move scheduler to its own component
interface SchedulerProps {
    semesterId: number;
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

    return (
        <div>
            <Paper>
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <Typography variant={"h6"} color={"primary"}>
                        Scheduling
                    </Typography>
                    <StyledInput select label={"Semester"} margin={"dense"} value={selectedSemesterId} onChange={selectSemester} style={{ minWidth: "25ch" }}>
                        {semesterRefs.map((ref, index) => (
                            <MenuItem value={ref.Id}>
                                {ref.Type + " " + ref.Year}
                            </MenuItem>
                        ))}
                    </StyledInput>
                </Toolbar>
                <Divider variant={"middle"} />
                {selectedSemesterId !== undefined &&
                    <Container style={{ marginTop: "1rem" }}>
                        <div>
                            Schedule Tool
                        </div>
                        <div>
                            Schedule Display
                        </div>
                    </Container>
                }
            </Paper>
        </div >
    );
};

export default Scheduling;