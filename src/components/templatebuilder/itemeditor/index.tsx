import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {

    }
}), { name: "NDDTemplateBuilder-ItemEditor" });

interface ItemEditorProps {

};

const ItemEditor: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <div>
            Item Editor
        </div>
    );
};

export { };
export default ItemEditor;