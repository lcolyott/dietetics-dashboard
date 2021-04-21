import React from "react";
import { RouteComponentProps } from "react-router";
import TemplateBuilder from "../../components/templatebuilder";

interface TemplatesProps extends RouteComponentProps {

};

const Templates: React.FunctionComponent<TemplatesProps> = (props) => {
    return (
        <div>
            <TemplateBuilder />
        </div>
    );
};

export default Templates;