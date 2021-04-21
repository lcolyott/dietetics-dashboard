import React, { Component, useEffect } from "react";
import { Button, Container, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Toolbar, Typography, Switch as MSwitch, Divider } from "@material-ui/core";
import { ApplicationUser } from "../../data/models";
import { routes, userRoles, UserRoles } from "../../data/authorization";
import { StyledInput, StyledTextField } from "../../components/input";
import { Switch, useHistory, useParams } from "react-router-dom";
import { testUsers } from "../../data/test";
import { DatePicker } from "@material-ui/pickers";

interface AddUserProps {
    onAddUser: () => void;
};

const AddUser: React.FunctionComponent<AddUserProps> = (props) => {
    const { onAddUser } = props;
    const [showPreceptorInput, setShowPreceptorInput] = React.useState<boolean>(false);

    return (
        <form>
            <Container style={{ display: "flex", flexDirection: "column", rowGap: ".75rem", paddingTop: "1rem" }}>
                <StyledInput required label={"Name"} fullWidth />
                <StyledInput required label={"Email"} fullWidth />
                <StyledInput required label={"Phone"} fullWidth />
                <StyledInput
                    required
                    select
                    SelectProps={{ MenuProps: { variant: "menu" } }}
                    label={"Role"}
                    fullWidth
                >
                    {userRoles.all.map((role, index) => (
                        <MenuItem value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</MenuItem>
                    ))}
                </StyledInput>
            </Container>
            <Toolbar style={{ justifyContent: "flex-end" }}>
                <Button type={"submit"} variant={"outlined"} color={"primary"}>
                    Create User
                </Button>
            </Toolbar>
        </form>
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
            <Divider variant={"middle"} />
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
            <Divider variant={"middle"} />
            <form>
                <Container style={{ display: "flex", flexDirection: "column", rowGap: ".75rem", paddingTop: "1rem" }}>
                    <StyledInput required label={"Name"} fullWidth />
                    <StyledInput required label={"Email"} fullWidth />
                    <StyledInput required label={"Phone"} fullWidth />
                    <StyledInput
                        required
                        select
                        SelectProps={{ MenuProps: { variant: "menu" } }}
                        label={"Role"}
                        fullWidth
                    >
                        {userRoles.all.map((role, index) => (
                            <MenuItem value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</MenuItem>
                        ))}
                    </StyledInput>
                    {userRole === "Student" &&
                        <DatePicker
                            views={["year", "month", "date"]}
                            label={"Graduation Date"}
                            inputVariant={"outlined"}
                            TextFieldComponent={StyledInput}
                            format={"MM/dd/yyyy"}
                            value={undefined}
                            onChange={() => { }}
                        />
                    }
                    {userRole === "Preceptor" &&
                        <StyledInput select label={"Site"} fullWidth />
                    }
                </Container>
                <Toolbar style={{ justifyContent: "flex-end", columnGap: ".5rem" }}>
                    <Button type={"submit"} variant={"outlined"} color={"primary"}>
                        Save
                    </Button>
                    <Button variant={"outlined"} color={"primary"} onClick={handleCancel}>
                        Cancel
                </Button>
                </Toolbar>
            </form>
        </Paper >
    );
};

export { ManageUser };
export default Users;