import { Button, Container, Paper, TableBody, TableHead, Toolbar, Typography } from "@material-ui/core";
import { AddShoppingCartOutlined } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import React, { useEffect } from "react";
import { Route, RouteComponentProps, Switch, useHistory, useRouteMatch } from "react-router";
import { SiteUpdateForm } from "../../components/forms";
import { StyledInput, StyledTextField } from "../../components/input";
import AddressInput from "../../components/input/address";
import AffiliationInput from "../../components/input/affiliationagreement";
import ContactInput from "../../components/input/contact/indext";
import OfferedRotationsInput from "../../components/input/rotations";
import ResponsiveTable, { StyledTableCell, StyledTableRow } from "../../components/responsivetable";
import { Site } from "../../data/models";

interface SitesProps extends RouteComponentProps { };

const Sites: React.FunctionComponent<SitesProps> = (props) => {
    const [sortBy, setSortBy] = React.useState<string & keyof Site>();
    const [siteRefs, setSiteRefs] = React.useState<Partial<Site>[]>([]);
    const { path, url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        // TODO: Load site refs
    }, []);

    // TODO:
    const addSite = () => {
        history.push(`${path}/new`);
    };

    const createSite = () => {
        history.push(`${path}`);
    };

    const cancel = () => {
        history.push(`${path}`);
    };

    return (
        <div>
            <Switch>
                <Route exact path={`${path}`} >
                    <ResponsiveTable>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>
                                    Organization
                                </StyledTableCell>
                                <StyledTableCell>
                                    Address
                                </StyledTableCell>
                                <StyledTableCell>
                                    Last Contact
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </ResponsiveTable>
                    <Button fullWidth color={"primary"} variant={"outlined"} onClick={addSite}>
                        Add Site
                    </Button>
                </Route>
                <Route path={`${path}/new`} >
                    <Paper variant={"outlined"}>
                        <SiteUpdateForm />
                        {/* <Toolbar>
                            <Typography variant={"h6"} color={"primary"}>
                                New Site
                            </Typography>
                        </Toolbar>
                        <div style={{ display: "flex", flexDirection: "column", rowGap: ".5rem", padding: "0 1.5rem 0 1.5rem" }}>
                            <StyledInput required label={"Organization"} />
                            <ContactInput required label={"Primary Contact"} />
                            <ContactInput label={"Secondary Contact"} />
                            <AddressInput required />
                            <DatePicker
                                required
                                views={["year", "month", "date"]}
                                label={"Last Contact"}
                                inputVariant={"outlined"}
                                TextFieldComponent={StyledInput}
                                format={"MM/DD/yyyy"}
                                value={new Date()}
                                onChange={() => { }}
                            />
                            <StyledInput multiline rows={4} label={"Notes"} />
                            <AffiliationInput />
                            <OfferedRotationsInput />
                        </div>
                        <Toolbar style={{ justifyContent: "flex-end", columnGap: ".5rem" }}>
                            <Button variant={"outlined"} color={"primary"} onClick={createSite}>
                                Submit
                            </Button>
                            <Button variant={"outlined"} color={"primary"} onClick={cancel}>
                                Cancel
                            </Button>
                        </Toolbar> */}
                    </Paper>
                </Route>
            </Switch>
        </div>
    );
};

export default Sites;