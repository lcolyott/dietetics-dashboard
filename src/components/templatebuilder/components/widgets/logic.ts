import React from "react";
import { RootTemplateItem, TemplateItem } from ".";
import { WithOptional } from "../../../../utilities/types";
import { TemplateItemComponentMap } from "./data";

/** Convert a tree of template items into a JSON string */
function toJSON(root: TemplateItem) {
    return JSON.stringify(root);
};

/** Convert a JSON template structure into TemplateItems */
function fromJSON(data: string) {
    console.log("fromJSON");
};

/** Return the component defined by the TemplateItem */
function mapItemToComponent(templateItem: TemplateItem) {
    if (templateItem.type && templateItem.component) {
        return TemplateItemComponentMap[templateItem.type][templateItem.component];

    }

    return React.Fragment;
};

export { toJSON, fromJSON, mapItemToComponent };