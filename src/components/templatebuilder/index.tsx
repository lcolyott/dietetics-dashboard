import { Button, createStyles, Divider, Grid, Hidden, makeStyles, Paper, Theme, Toolbar, Typography, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import { bind } from "lodash";
import React, { useEffect } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WithOptional } from "../../utilities/types";
import Toolbox from "./toolbox";
import { TemplateItem, RootTemplateItem, LayoutTemplateItem, FormatTemplateItem, WidgetTemplateItem, TemplateItemType } from "./components/widgets";
import { TemplateComponents } from "./components/widgets/data";
import { mapItemToComponent } from "./components/widgets/logic";

const styles = (theme: Theme) => createStyles({
    root: {
        display: "grid",

        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "auto",
            gridTemplateRows: "calc(100% - 6rem) 5rem",
            gridTemplateAreas: `
            "template"
            "actions"
            `,
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: "auto 17.5rem",
            gridTemplateRows: "calc(100% - 6rem) 5rem",
            gridTemplateAreas: `
            "template toolbox"
            "actions actions"
            `,
        },

        gap: "1rem",

        height: "100%",
        maxHeight: "100%",
    },
    templateEditor: {
        display: "flex",
        flexDirection: "column",

        "& .header": {

        },
        "& .content": {
            padding: theme.spacing(2),
            flex: "1 1",

            overflow: "hidden",
        }
    },
    actions: {
        display: "flex",
        alignContent: "center",
        justifyContent: "flex-end",
        gap: "1rem",

        gridArea: "actions",

        padding: "1rem",

        "& > *": {
            flex: "0 1 20ch"
        }

    }
});

interface TemplateBuilderProps extends WithStyles<typeof styles> {

};

interface TemplateBuilderState {
    root: TemplateItem;
    count: number;
};

class TemplateBuilder extends React.PureComponent<TemplateBuilderProps, TemplateBuilderState> {
    constructor(props: TemplateBuilderProps) {
        super(props);
        this.state = {
            root: {
                id: "ROOT",
                type: "ROOT",
                component: "ROOT"
            },
            count: 0
        };

        this.renderItem = this.renderItem.bind(this);

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.removeAllItems = this.removeAllItems.bind(this);

        this.handleDrop = this.handleDrop.bind(this);
    };

    //#region Component Lifecycle Callbacks
    componentDidMount() { };
    componentDidUpdate() { };
    componentWillUnmount() { };
    //#endregion

    //#region Render Methods
    /** Recursively render the template */
    renderItem = (item: TemplateItem) => {
        let Component = mapItemToComponent(item);

        return (
            <Component key={item.id} onDrop={this.handleDrop} item={item}>
                {item.children?.map((child, index) => this.renderItem(child))}
            </Component>
        );
    };
    //#endregion

    //#region State Methods
    /** Add an item to the JSON string */
    addItem = (parentId: string, item: WithOptional<TemplateItem, "id">) => {
        let root = JSON.parse(JSON.stringify(this.state.root, (key, value: TemplateItem) => {
            if (value.id === parentId) {

                let newItem = { ...item };
                newItem.id = this.state.count.toString();

                console.log(this.state.count, value, item, newItem);

                value.children?.push(newItem as TemplateItem) ?? (
                    value.children = [newItem as TemplateItem]
                );
            }

            return value;
        })) as TemplateItem;

        let newCount = this.state.count + 1;

        this.setState({
            root,
            count: newCount
        });
    };

    /** Remove an item from state by converting it to a JSON string, using the "replacer" function in JSON.stringify to remove the matching element, then reconverting it into TemplateItems */
    removeItem = (itemId: string) => {
        this.setState({
            root: JSON.parse(
                JSON.stringify(this.state.root, (key, value: TemplateItem) => {
                    if (value.id !== itemId) {
                        return value;
                    }

                    console.log(value);

                    return "";
                })
            )
        });
    };

    /** Move an item from one item to another */
    moveItem = (item: TemplateItem, parent: TemplateItem) => {
        this.removeItem(item.id);

        let root = JSON.parse(JSON.stringify(this.state.root, (key, value: TemplateItem) => {
            if (value.id === parent.id) {

                value.children?.push(item) ?? (
                    value.children = [item]
                );
            }

            return value;
        })) as TemplateItem;

        let newCount = this.state.count + 1;

        this.setState({
            root,
        });
    };

    /** Remove all items of type */
    removeItemsByType = (type: TemplateItemType) => {
        this.setState({
            root: JSON.parse(
                JSON.stringify(this.state.root, (key, value: TemplateItem) => {
                    if (value.type === type) {
                        return "";
                    }

                    return value;
                })
            )
        });
    };

    removeAllItems = () => {
        let newRoot = this.state.root;
        newRoot.children = [];

        this.setState({
            root: newRoot,
            count: 0
        });
    };
    //#endregion

    //#region Drag and Drop Methods
    handleDrop = (droppedItem: WithOptional<TemplateItem, "id">, newParent: TemplateItem) => {
        if (droppedItem.id === "NEW") {
            this.addItem(newParent.id, droppedItem);
        }
        else {
            this.moveItem(droppedItem as TemplateItem, newParent);
        }
    };
    //#endregion

    render() {
        const { classes } = this.props;

        return (
            <DndProvider backend={HTML5Backend}>
                <div className={classes.root}>
                    <Paper variant={"outlined"} className={classes.templateEditor}>
                        <Toolbar className={"header"}>
                            <Typography variant={"h4"} color={"primary"}>
                                New Template
                            </Typography>
                        </Toolbar>
                        <Divider variant={"middle"} />
                        <div className={"content"}>
                            {this.renderItem(this.state.root)}
                        </div>
                    </Paper>
                    <Hidden smDown>
                        <Toolbox />
                    </Hidden>
                    <Paper variant={"outlined"} className={classes.actions}>
                        <Button variant={"outlined"} color={"primary"} onClick={this.removeAllItems}>
                            Save
                        </Button>
                        <Button variant={"outlined"} color={"primary"} onClick={this.removeAllItems}>
                            Clear
                        </Button>
                    </Paper>
                </div>
            </DndProvider>
        );
    }
};

export default withStyles(styles, { name: "NDDTemplateBuilder" })(TemplateBuilder);
