import React, { Component, useEffect } from "react";
import { Button, Container, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Toolbar, Typography, Switch as MSwitch } from "@material-ui/core";
import { ApplicationUser } from "../../data/models";
import { routes, userRoles, UserRoles } from "../../data/authorization";
import { StyledTextField } from "../../components/input";
import { Switch, useHistory, useParams } from "react-router-dom";
import { testUsers } from "../../data/test";

interface AddUserProps {
    onAddUser: () => void;
};

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
            <Toolbar style={{ justifyContent: "right" }}>
                <Button variant={"outlined"} color={"primary"} onClick={onAddUser}>
                    Create User
                </Button>
            </Toolbar>
        </React.Fragment>
    );
}

interface UsersTableProps {
    onSelectUser: (userId: string | number) => void;
};

// TODO: Sort table by role Admin -> Preceptor -> Student
// TODO: Color code roles
const UsersTable: React.FunctionComponent<UsersTableProps> = (props) => {
    const { onSelectUser } = props;
    const usersTableKeys: (string & keyof ApplicationUser)[] = [
        "Name",
        "Role",
        "Email",
        "Phone",
    ];

    return (
        <Table style={{ tableLayout: "fixed" }}>
            <TableHead>
                <TableRow>
                    {usersTableKeys.map((key, index) => (
                        <TableCell key={index}>
                            {key}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {testUsers.map((user, index) => {
                    return (
                        <TableRow hover key={index} onClick={() => onSelectUser(user.Id)}>
                            {usersTableKeys.map((key, index) => (
                                <TableCell key={index}>
                                    {user[key]}
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

    const handleUserSelected = (userId: string | number) => {
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
    const [userRole, setUserRole] = React.useState<"Student" | "Preceptor" | "Admin">("Preceptor");

    // TODO:
    const handleSave = () => {
        history.push(routes.authorizedRoutes["users"].path);
    };

    // TODO:
    const handleCancel = () => {
        history.push(routes.authorizedRoutes["users"].path);
    };

    return (
        <Paper>
            <Toolbar style={{ justifyContent: "space-between" }}>
                <Typography align={"center"} variant={"h6"} color={"primary"}>
                    Manage User
                </Typography>
                <span>
                    Active
                    <MSwitch color={"primary"} />
                </span>
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
                {userRole === "Student" &&
                    <StyledTextField label={"Graduation Date"} fullWidth margin={"dense"} variant={"outlined"} />
                }
                {userRole === "Preceptor" &&
                    <StyledTextField select label={"Site"} fullWidth margin={"dense"} variant={"outlined"} />
                }
            </Container>
            <Toolbar style={{ justifyContent: "right", columnGap: ".5rem" }}>
                <Button variant={"outlined"} color={"primary"} onClick={handleSave}>
                    Save
                </Button>
                <Button variant={"outlined"} color={"primary"} onClick={handleCancel}>
                    Cancel
                </Button>
            </Toolbar>
        </Paper >
    );
};

export { ManageUser };
export default Users;