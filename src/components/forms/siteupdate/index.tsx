import { Button, Container, createStyles, Divider, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Address, AffiliationAgreement, Contact, Site } from "../../../data/models";
import { StyledInput } from "../../input";
import AddressInput from "../../input/address";
import AffiliationInput from "../../input/affiliationagreement";
import ContactInput from "../../input/contact/indext";
import OfferedRotationsInput from "../../input/rotations";


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        rowGap: ".75rem",

        paddingTop: "0 !important",
        padding: theme.spacing(2, 6),

        "& .organization": {
            flex: "1 1",
            flexBasis: "51ch",
        },
        "& .lastcontact": {
            flex: "1 1",
        },

        "& h6": {
            marginBottom: "-1rem",
        },

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2, 2),
            "& .MuiFormControl-root": {
                flexGrow: "1 !important",
            }
        }
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: ".75rem",
        columnGap: ".5rem",

        "&.formactions": {
            justifyContent: "flex-end"
        },
    },
}), { name: "NDDForm-site" });

interface SiteFormProps {
    siteId?: number;
    onSubmit?: Function;
};

interface SiteFormState {
    site: Partial<Site>;
    address: Partial<Address>;
    pContact: Partial<Contact>;
    sContact: Partial<Contact>;
    agreement: Partial<AffiliationAgreement>;
};

const SiteUpdateForm: React.FunctionComponent<SiteFormProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [state, useState] = React.useState<Partial<SiteFormState>>({});

    useEffect(() => {
        // Fetch site data
    }, []);

    useEffect(() => {

    }, [props.siteId]);

    const submit = () => {
        history.push("/sites");
    };

    const cancel = () => {
        history.push("/sites");
    };

    return (
        <form onSubmit={submit}>
            <div className={classes.root}>
                <Toolbar disableGutters>
                    <Typography variant={"h6"} color={"primary"}>
                        {props.siteId !== undefined ? "Update" : "New"} Site
                    </Typography>
                </Toolbar>
                <div className={classes.row}>
                    <Typography variant={"subtitle1"} color={"textSecondary"}>
                        Site Info
                    </Typography>
                </div>
                <Divider />
                <div className={classes.row}>
                    <StyledInput required label={"Organization"} className={"organization"} />
                    <DatePicker
                        views={["year", "month", "date"]}
                        label={"Last Contact"}
                        inputVariant={"outlined"}
                        TextFieldComponent={StyledInput}
                        format={"MM/DD/yyyy"}
                        value={state.site?.LastContact}
                        onChange={() => { }}
                        className={"lastcontact"}
                    />
                </div>
                <div className={classes.row}>
                    <StyledInput fullWidth multiline rows={4} label={"Notes"} />
                </div>
                <AddressInput required value={state.address} />
                <ContactInput required label={"Primary Contact"} value={state.pContact} />
                <ContactInput label={"Secondary Contact"} value={state.sContact} />
                <AffiliationInput value={state.agreement} />
                <OfferedRotationsInput />
                <div className={classes.row + " formactions"}>
                    <Button type={"submit"} color={"primary"} variant={"outlined"}>
                        Submit
                    </Button>
                    <Button color={"primary"} variant={"outlined"} onClick={cancel}>
                        Cancel
                    </Button>
                </div>
            </div>

        </form>
    );
};

export default SiteUpdateForm;