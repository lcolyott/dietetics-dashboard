import React, { Component, useEffect } from "react";
import { Button, Container, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Toolbar, Typography, Switch as MSwitch } from "@material-ui/core";
import { User } from "../../data/models";
import { routes, userRoles, UserRoles } from "../../data/authorization";
import { StyledTextField } from "../../components/input";
import { Switch, useHistory, useParams } from "react-router-dom";

const dummyUsers: User[] = [
    {
        Id: 0,
        Name: "John Doe",
        Email: "JohnDoe@email.com",
        Phone: "x-xxx-xxx-xxxx",
        Role: "student"
    },
    {
        Id: 1,
        Name: "Jill Doe",
        Email: "JillDoe@email.com",
        Phone: "x-xxx-xxx-xxxx",
        Role: "preceptor"
    },
    {
        Id: 2,
        Name: "Ron Swanson",
        Email: "RonSwanson@email.com",
        Phone: "x-xxx-xxx-xxxx",
        Role: "admin"
    },
];

interface AddUserProps {
    onAddUser: () => void;
}

const AddUser: React.FunctionComponent<AddUserProps> = (props) => {
    const { onAddUser } = props;
    const [showPreceptorInput, setShowPreceptorInput] = React.useState<boolean>(false);

    return (
        <React.Fragment>
            <Container>
                <StyledTextField label={"Name"} fullWidth margin={"dense"} variant={"outlined"} />
                <StyledTextField label={"Email"} fullWidth margin={"dense"} variant={"outlined"} />
                <StyledTextField label={"Phone"} fullWidth margin={"dense"} variant={"outlined"} />
                <StyledTextField
                    select
                    SelectProps={{ MenuProps: { variant: "menu" } }}
                    label={"Role"}
                    fullWidth
                    margin={"dense"}
                    variant={"outlined"}
                >
                    {userRoles.all.map((role, index) => (
                        <MenuItem value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</MenuItem>
                    ))}
                </StyledTextField>
            </Container>
            <Toolbar >
                <Button variant={"outlined"} color={"primary"} onClick={onAddUser}>
                    Create User
                </Button>
            </Toolbar>
        </React.Fragment>
    );
}

interface UsersTableProps {
    onSelectUser: (userId: number) => void;
};

const UsersTable: React.FunctionComponent<UsersTableProps> = (props) => {
    const { onSelectUser } = props;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Id
                    </TableCell>
                    <TableCell>
                        Name
                    </TableCell>
                    <TableCell>
                        Email
                    </TableCell>
                    <TableCell>
                        Phone
                    </TableCell>
                    <TableCell>
                        Role
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dummyUsers.map((user, index) => {
                    return (
                        <TableRow hover key={index} onClick={() => onSelectUser(user.Id)}>
                            {Object.entries(user).map((entry, index) => (
                                <TableCell key={index}>
                                    {entry[1]}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

const Users: React.FunctionComponent<any> = (props) => {
    const [showTable, setShowTable] = React.useState<boolean>(true);

    const history = useHistory();

    // TODO: validate info and request before showing table
    const handleAddUser = () => {
        console.log("Adding User!");

        setShowTable(true);
    };

    const handleUserSelected = (userId: number) => {
        history.push(routes.authorizedRoutes["manageUser"].path.replace(":userId", userId.toString()));
    };

    return (
        <TableContainer component={Paper}>
            <Toolbar style={{ justifyContent: "space-between" }}>
                <Typography align={"center"} variant={"h6"} color={"primary"}>
                    {showTable ? ("Users") : ("Add User")}
                </Typography>
                <Button variant={"outlined"} color={"primary"} onClick={() => setShowTable(!showTable)}>
                    {showTable ? ("Add User") : ("Back to List")}
                </Button>
            </Toolbar>
            {showTable ? (<UsersTable onSelectUser={handleUserSelected} />) : (<AddUser onAddUser={handleAddUser} />)}
        </TableContainer>
    );
};

// TODO: Display appropriate input based on role
const ManageUser: React.FunctionComponent<any> = (props) => {
    //@ts-expect-error
    const { id } = useParams();
    const history = useHistory();

    // TODO:
    const handleUpdateUser = () => {
        history.push(routes.authorizedRoutes["users"].path);
    };

    return (
        <Paper>
            <Toolbar>
                <Typography align={"center"} variant={"h6"} color={"primary"}>
                    Manage User
                </Typography>
                Active
                <MSwitch color={"primary"} />
            </Toolbar>
            <Container>
                <StyledTextField label={"Name"} fullWidth margin={"dense"} variant={"outlined"} />
                <StyledTextField label={"Email"} fullWidth margin={"dense"} variant={"outlined"} />
                <StyledTextField label={"Phone"} fullWidth margin={"dense"} variant={"outlined"} />
                <StyledTextField
                    select
                    SelectProps={{ MenuProps: { variant: "menu" } }}
                    label={"Role"}
                    fullWidth
                    margin={"dense"}
                    variant={"outlined"}
                >
                    {userRoles.all.map((role, index) => (
                        <MenuItem value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</MenuItem>
                    ))}
                </StyledTextField>
                *Students Only*
                <StyledTextField label={"Graduation Date"} fullWidth margin={"dense"} variant={"outlined"} />
                *Preceptors Only*
                <StyledTextField select label={"Site"} fullWidth margin={"dense"} variant={"outlined"} />
            </Container>
            <Toolbar>
                <Button variant={"outlined"} color={"primary"} onClick={handleUpdateUser}>
                    Update User
                </Button>
            </Toolbar>
        </Paper>
    );
};

export { ManageUser };
export default Users;