import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { bind } from "lodash";
import React, { useEffect } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WithOptional } from "../../utilities/types";
import Toolbox from "./toolbox";
import { TemplateItem, RootTemplateItem, LayoutTemplateItem, FormatTemplateItem, WidgetTemplateItem, TemplateItemType } from "./widgets";
import { TemplateComponents } from "./widgets/data";
import { mapItemToComponent } from "./widgets/logic";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
    },
}), { name: "NDDTemplateBuilder" });

interface TemplateBuilderProps {

};

interface TemplateBuilderState {
    root: TemplateItem;
    count: number;
};

function TemplateBuilderContainer(props: any) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.children}
        </div>
    );
}

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
    /** Recursivles render the template */
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
        return (
            <DndProvider backend={HTML5Backend} >
                <TemplateBuilderContainer>
                    {this.renderItem(this.state.root)}
                    <Toolbox />
                    <Button variant={"outlined"} color={"primary"} onClick={this.removeAllItems}>
                        Clear
                    </Button>
                </TemplateBuilderContainer>
            </DndProvider>
        );
    }
};

export default TemplateBuilder;