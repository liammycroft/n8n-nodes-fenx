import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXAPAC.node';

let FenergoNebulaIdentityScimAPIvv1Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Performs multiple operations at once and returns the status of each operation.', value: 'Bulk' },{ name: 'Gets all the resource types.', value: 'GetAllResourceTypes' },{ name: 'Gets a resource type by ID.', value: 'GetResourceTypeById' },{ name: 'Gets all the schemas.', value: 'GetAllSchemas' },{ name: 'Gets a schema by ID.', value: 'GetSchemaById' },{ name: 'Gets the service provider config.', value: 'GetServiceProviderConfig' },{ name: 'Gets all users. Accepts filters and sorting.', value: 'GetAllUsers' },{ name: 'Returns users according to the filter, sort and pagination parameters.', value: 'SearchUsers' },{ name: 'Gets a user by ID.', value: 'GetUserById' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaIdentityScimAPIvv1',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Id of the resource type to be retrieved.', displayOptions: { show: { endpoint: [ 'GetResourceTypeById' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Id of the schema to be retrieved.', displayOptions: { show: { endpoint: [ 'GetSchemaById' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'UUID: Universally Unique Identifier with 32 alpha-numeric characters formated as xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.', displayOptions: { show: { endpoint: [ 'GetUserById' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "operations": [ { "path": "path", "data": {}, "method": "method", "bulkId": "bulkId", "version": "version" } ], "schemas": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'Bulk' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "attributes": [ "" ], "excludedAttributes": [ "" ], "sortBy": "sortBy", "sortOrder": 0, "startIndex": 0, "count": 0, "filter": "filter" }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SearchUsers' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'attributes', name: 'attributes', type: 'string', required: true, default: '', description: 'A multi-valued list of strings indicating the names of resource attributes to return in the response', displayOptions: { show: { endpoint: [ 'GetAllUsers' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'excludedAttributes', name: 'excludedAttributes', type: 'string', required: true, default: '', description: 'A multi-valued list of strings indicating the names of resource attributes to be removed from the default set of attributes to return', displayOptions: { show: { endpoint: [ 'GetAllUsers' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'sortBy', name: 'sortBy', type: 'string', required: true, default: '', description: 'A string indicating the attribute whose value shall be used to order the returned responses', displayOptions: { show: { endpoint: [ 'GetAllUsers' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'sortOrder', name: 'sortOrder', type: 'string', required: true, default: '', description: 'An integer indicating the order in which the "sortBy" parameter is applied. Sort order: 0 Ascending or 1 Descending.', displayOptions: { show: { endpoint: [ 'GetAllUsers' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'startIndex', name: 'startIndex', type: 'string', required: true, default: '', description: 'An integer indicating the 1-based index of the first query result.', displayOptions: { show: { endpoint: [ 'GetAllUsers' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'count', name: 'count', type: 'string', required: true, default: '', description: 'An integer indicating the desired maximum number of query results per page', displayOptions: { show: { endpoint: [ 'GetAllUsers' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'filter', name: 'filter', type: 'string', required: true, default: '', description: 'Filter expression from the SCIM 2.0 specification <a href="https://www.rfc-editor.org/rfc/rfc7644#section-3.4.2.2">(RFC 7644)</a> (case in-sensitive).', displayOptions: { show: { endpoint: [ 'GetAllUsers' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'attributes', name: 'attributes', type: 'string', required: true, default: '', description: 'A multi-valued list of strings indicating the names of resource attributes to return in the response', displayOptions: { show: { endpoint: [ 'GetUserById' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } },{ displayName: 'excludedAttributes', name: 'excludedAttributes', type: 'string', required: true, default: '', description: 'A multi-valued list of strings indicating the names of resource attributes to be removed from the default set of attributes to return', displayOptions: { show: { endpoint: [ 'GetUserById' ], domain: [ 'FenergoNebulaIdentityScimAPIvv1' ] } } }
];

async function ExecuteFenergoNebulaIdentityScimAPIvv1(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
    // @ts-ignore
    let token = await FenXToken.getToken(base);

    let requestOptions: OptionsWithUri = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'x-tenant-id': FenXToken.tenant
        },
        gzip: true,
        timeout: 3600000,
        uri: ""
    };

    const endpoint = base.getNodeParameter('endpoint', 0) as string;

    let id='';
switch(endpoint){ case 'Bulk': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/scim/Bulk';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetAllResourceTypes': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/scim/ResourceTypes';

break;
case 'GetResourceTypeById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/scim/ResourceTypes/{id}'.replace('{id}', id);

break;
case 'GetAllSchemas': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/scim/Schemas';

break;
case 'GetSchemaById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/scim/Schemas/{id}'.replace('{id}', id);

break;
case 'GetServiceProviderConfig': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/scim/ServiceProviderConfig';

break;
case 'GetAllUsers': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/scim/Users';
requestOptions.qs = { attributes: base.getNodeParameter('attributes', 0) as string,excludedAttributes: base.getNodeParameter('excludedAttributes', 0) as string,sortBy: base.getNodeParameter('sortBy', 0) as string,sortOrder: base.getNodeParameter('sortOrder', 0) as string,startIndex: base.getNodeParameter('startIndex', 0) as string,count: base.getNodeParameter('count', 0) as string,filter: base.getNodeParameter('filter', 0) as string };
break;
case 'SearchUsers': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/scim/Users/.search';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetUserById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/scim/Users/{id}'.replace('{id}', id);
requestOptions.qs = { attributes: base.getNodeParameter('attributes', 0) as string,excludedAttributes: base.getNodeParameter('excludedAttributes', 0) as string };
break;
}

	let request = base.helpers.request(requestOptions);

    // @ts-ignore
    const promisesResponses = await Promise.allSettled([request]);
    let response: any; // tslint:disable-line:no-any
    response = promisesResponses.shift();
    if(response!.status !== 'fulfilled') {
    // throw error;
    console.log(request);
    throw new NodeApiError(base.getNode(), response);
}
    try {
        response = JSON.parse(response.value);
    }
    catch { response = response.value; }

const returnItems: INodeExecutionData[] = [];
returnItems.push({ json: response });

return base.prepareOutputData(returnItems);
}

export {
    FenergoNebulaIdentityScimAPIvv1Properties,
    ExecuteFenergoNebulaIdentityScimAPIvv1
}
