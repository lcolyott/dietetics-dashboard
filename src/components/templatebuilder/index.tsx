import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TemplateItem, RootTemplateItem, LayoutTemplateItem, FormatTemplateItem, WidgetTemplateItem, TemplateItemType } from "./widgets";
import { mapItemToComponent } from "./widgets/components";

const dummyTemplate: TemplateItem = {
    id: "root",
    type: "ROOT",
    component: "ROOT",
    children: [
        {
            id: "0",
            type: "LAYOUT",
            component: "LAYOUT",
            direction: "column",
            children: [
                {
                    id: "2",
                    type: "WIDGET",
                    component: "TEST"
                },
                {
                    id: "3",
                    type: "WIDGET",
                    component: "TEST"
                },
                {
                    id: "4",
                    type: "WIDGET",
                    component: "TEST"
                },
            ]
        },
        {
            id: "1",
            type: "LAYOUT",
            component: "LAYOUT",
            direction: "row",
            children: [
                {
                    id: "5",
                    type: "WIDGET",
                    component: "TEST"
                },
                {
                    id: "6",
                    type: "WIDGET",
                    component: "TEST"
                },
            ]
        },
    ]
};

interface TemplateBuilderProps {

};

interface TemplateBuilderState {

};

const TemplateBuilder: React.FunctionComponent<TemplateBuilderProps> = (props) => {
    const [state, setState] = React.useState<RootTemplateItem>(dummyTemplate);

    // Mounted
    useEffect(() => {

    }, [])

    const renderItem = (item: TemplateItem) => {
        function renderChildren(item: TemplateItem) {
            if (item.children) {
                return (
                    <React.Fragment>
                        {item.children.map((item, index) => renderItem(item))}
                    </React.Fragment>
                );
            }
        };

        let Component = mapItemToComponent(item);

        return (
            <Component key={item.id} {...item}>
                {renderChildren(item)}
            </Component>
        );
    };

    const renderTemplate = (root: RootTemplateItem) => {
        return renderItem(root);
    };

    /** Add an item to the JSON string */
    const addItem = (parentId: string, type: TemplateItemType) => {

    };

    /** Move an item from one item to another */
    const moveItem = (itemId: string, newParentId: string) => {
        function getItem(itemId: string): TemplateItem {
            return JSON.parse(
                JSON.stringify(state, (key, value: TemplateItem) => {
                    if (value.id === itemId) {
                        return value;
                    }
                    return "";
                })
            ) as TemplateItem;
        };

        let item = getItem(itemId);

        // Remove item from state
        removeItem(itemId);

        // Add to new parent element
    };

    /** Remove an item from state by converting it to a JSON string, using the "replacer" function in JSON.stringify to remove the matching element, then reconverting it into TemplateItems */
    const removeItem = (id: string | undefined) => {
        setState(
            JSON.parse(
                JSON.stringify(state, (key, value: TemplateItem) => {
                    if (value.id !== id) {
                        return value;
                    }

                    return "";
                })
            )
        );
    };

    /** Remove all items of type */
    const removeItemsByType = (type: TemplateItemType) => {
        setState(
            JSON.parse(
                JSON.stringify(state, (key, value: TemplateItem) => {
                    if (value.type === type) {
                        return "";
                    }

                    return value;
                })
            )
        );
    }

    return (
        <DndProvider backend={HTML5Backend}>
            {renderTemplate(state)}
            <Button onClick={() => removeItemsByType("WIDGET")} variant={"contained"}>
                Remove all widgets
            </Button>
            <Button onClick={() => moveItem("0", "1")} variant={"contained"}>
                Move widget to row
            </Button>
            <Button onClick={() => addItem("0", "WIDGET")} variant={"contained"}>
                Add widget to column
            </Button>
        </DndProvider>
    );
};

export default TemplateBuilder;