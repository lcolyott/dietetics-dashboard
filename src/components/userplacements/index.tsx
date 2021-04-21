import { Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { testPlacements, testSites, testRotations } from "../../data/test";
import ResponsiveTable, { StyledTableCell, StyledTableRow } from "../responsivetable";

interface UserPlacementsProps {
    semesterId: number;
};

const UserPlacements: React.FunctionComponent<UserPlacementsProps> = (props) => {
    const placementsTableMap: [key: string, label: string][] = [
        ["Name", "Site Name"],
        ["Address", "Address"],
        ["StartDate", "Start Date"],
        ["EndDate", "End Date"],
        ["Type", "Type"]
    ];

    return (
        <Paper>
            <Toolbar>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <Typography variant={"h6"} color={"primary"}>
                        My Placements
                    </Typography>
                    <Typography variant={"subtitle1"} color={"primary"}>
                        Spring 2021
                    </Typography>
                </div>
            </Toolbar>
            <Divider variant={"middle"} style={{ marginBottom: "1rem" }} />
            <TableContainer component={Container} >
                <Paper variant={"outlined"} style={{ overflow: "hidden" }}>
                    <ResponsiveTable>
                        <TableHead>
                            <StyledTableRow>
                                {placementsTableMap.map((keyvalue, index) => (
                                    <StyledTableCell key={index}>
                                        {keyvalue[1]}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {testPlacements.filter(p => p.UserId === 0).map((placement, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        Placeholder Site
                                </TableCell>
                                    <TableCell>
                                        xxxx Street Rd.
                                </TableCell>
                                    <TableCell>
                                        {new Date().toDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {moment(new Date()).add("M", 2).toDate().toDateString()}
                                    </TableCell>
                                    <TableCell>
                                        Clinical
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </ResponsiveTable>
                </Paper>
            </TableContainer>
            <Toolbar />
        </Paper>
    );
};

export default UserPlacements;