import React from "react";
import { RootTemplateItem, TemplateItem } from ".";
import { TemplateItemComponentMap } from "./data";

/** Convert a tree of template items into a JSON string */
function toJSON(root: TemplateItem) {
    return JSON.stringify(root);
};

/** Convert a JSON template structure into TemplateItems */
function fromJSON(data: string) {
    console.log("fromJSON");
};

export { toJSON, fromJSON };