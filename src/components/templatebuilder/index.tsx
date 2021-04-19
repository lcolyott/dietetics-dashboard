import React from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes, Item, LayoutItem, RootItem } from "./widgets";

interface TemplateBuilderProps {

};

interface TemplateBuilderState {

};

const TemplateBuilder: React.FunctionComponent<TemplateBuilderProps> = (props) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <RootItem />
        </DndProvider>
    );
};

export default TemplateBuilder;