import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { JsxElement } from "typescript";

// TODO: Create map between widget types and strings

// the toJSON function will recursively convert this TemplateItem and its children into JSON in order to read/write to the database
interface TemplateItem {
    itemId: number;
    type: string;
    itemChildren?: TemplateItem[];
    toJSON?: Function;
};

interface TemplayoutLayoutItem extends TemplateItem {
    direction?: "row" | "column";
};

const ItemTypes = {
    ROOT: "root",
    ITEM: "Item",
    LAYOUT: "Layout",
};

const Item: React.FunctionComponent<TemplateItem> = (props) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.ITEM,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    return (
        <div ref={dragRef} style={{
            opacity: isDragging ? .5 : 1,
            border: "1px dashed lightgrey"
        }}>
            Item
        </div>
    );
};

const LayoutItem: React.FunctionComponent<TemplayoutLayoutItem> = (props) => {
    const [state, setState] = React.useState<TemplateItem[]>([]);

    useEffect(() => {
        if (props.itemChildren) {
            setState(props.itemChildren);
        }
    }, []);

    useEffect(() => {
        if (props.itemChildren) {
            setState(props.itemChildren);
        }
    }, [props.itemChildren])

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: ItemTypes.ITEM,
        drop: (item: TemplateItem, monitor) => {
            state.push(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const renderItem = (item: TemplateItem) => {
        let Component = ItemTypeMap[item.type];

        return <Component {...item} />
    };

    return (
        <div ref={dropRef} style={{
            flexGrow: 1,
            backgroundColor: isOver ? "lightskyblue" : props.direction ? "lightpink" : "lightyellow",
        }}>
            Layout Item
            <div style={{
                display: "flex",
                flexDirection: props.direction ?? "column",
                paddingLeft: "1rem",
            }}>
                {state.map((item, index) => renderItem(item))}
            </div>
        </div>
    );
};

interface ItemTypeMap {
    [key: string]: any;
}

const ItemTypeMap: ItemTypeMap = {
    "Item": Item,
    "Layout": LayoutItem
};

const RootItem: React.FunctionComponent<any> = (props) => {
    return (
        <LayoutItem itemId={0} type={ItemTypes.ROOT} direction={"row"} />
    );
};

export type { TemplateItem };
export { ItemTypes, Item, LayoutItem, RootItem };
