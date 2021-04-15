import React from "react";
import SiteUpdateForm from "./siteupdate";

interface ModelUpdateFormProps<T> {
    model: T;
};

// Factory function that returns a typed ModelUpdateForm
function ModelUpdateForm<T>(props: ModelUpdateFormProps<T>) {
    const UpdateForm: React.FunctionComponent<ModelUpdateFormProps<T>> = (props) => {
        return (
            <React.Fragment>
                Model Update Form
            </React.Fragment>
        );
    };

    return UpdateForm;
};

export { SiteUpdateForm };

export default ModelUpdateForm;