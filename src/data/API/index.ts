const EndpointTemplate = `/api/{controller}/{action}/{payload}`;

function buildEndpoint(controller: string, action: string, payload?: string): string{
    return EndpointTemplate;
};

export {buildEndpoint};