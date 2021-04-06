import { Button, Container, Divider, MenuItem, Paper, TableBody, TableContainer, TableHead, Toolbar } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { Unauthorized } from "..";
import { StyledTextField } from "../../components/input";
import AuthRoute from "../../components/navigation/authroute";
import ResponsiveTable from "../../components/responsiveTable";
import { userRoles } from "../../data/authorization";

const SemesterInfo: React.FunctionComponent<RouteComponentProps> = (props) => {
    return (
        <div>
            Semester Info
        </div>
    );
};

const CreateSemester: React.FunctionComponent<RouteComponentProps> = (props) => {
    return (
        <div>
            Create Semester
        </div>
    );
};

interface SemestersProps extends RouteComponentProps { };

const Semesters: React.FunctionComponent<SemestersProps> = (props) => {
    let { path, url } = useRouteMatch();
    const history = useHistory();

    const Tools = () => {
        return (
            <Toolbar disableGutters style={{ display: "flex", justifyContent: "space-between" }}>
                <StyledTextField
                    select
                    SelectProps={{ MenuProps: { variant: "menu" } }}
                    label={"Semester"}
                    margin={"dense"}
                    variant={"outlined"}
                    placeholder={"Select a semester"}
                >
                    <MenuItem value={0}>Spring 2021</MenuItem>
                </StyledTextField>
                <Button variant={"outlined"} color={"primary"} onClick={() => history.push(`${path}/create`)}>
                    Create Semester
                </Button>
            </Toolbar>
        );
    };

    return (
        <Paper variant={"outlined"}>
            <Container>
                <Switch>
                    <AuthRoute exact path={`${path}`} Component={Tools} requiredRoles={userRoles.admins} />
                    <AuthRoute path={`${path}/create`} Component={CreateSemester} requiredRoles={userRoles.admins} />
                    <AuthRoute path={`${path}/:semesterId/info`} Component={SemesterInfo} requiredRoles={userRoles.admins} />
                </Switch>
            </Container>
        </Paper>
    );
};

export default Semesters;