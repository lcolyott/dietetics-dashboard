import { Button, TableBody, TableHead } from "@material-ui/core";
import { AddShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import ResponsiveTable, { StyledTableCell, StyledTableRow } from "../../components/responsiveTable";
import { Site } from "../../data/models";

interface SitesProps extends RouteComponentProps { };

const Sites: React.FunctionComponent<SitesProps> = (props) => {
    const [sortBy, setSortBy] = React.useState<string & keyof Site>();
    const [siteRefs, setSiteRefs] = React.useState<Partial<Site>[]>([]);

    useEffect(() => {
        // TODO: Load site refs
    }, []);

    // TODO:
    const addSite = () => {

    };

    return (
        <div>
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
        </div>
    );
};

export default Sites;