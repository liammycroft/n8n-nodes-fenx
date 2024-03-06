import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaReportsCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create a new Query definition', value: 'CreateSqlQueryDefinition' },{ name: 'Update a Query definition', value: 'UpdateSqlQueryDefinition' },{ name: 'Delete a Query definition', value: 'DeleteSqlQueryDefinition' },{ name: 'Create report', value: 'CreateReport' },{ name: 'Preview report', value: 'Preview' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaReportsCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'Id', name: 'Id', type: 'string', required: true, default: '', description: 'The Id of the existing Query definition model to delete', displayOptions: { show: { endpoint: [ 'DeleteSqlQueryDefinition' ], domain: [ 'FenergoNebulaReportsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "sqlQuery": "sqlQuery", "name": "name", "description": "description", "id": "id" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateSqlQueryDefinition' ], domain: [ 'FenergoNebulaReportsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "sqlQuery": "sqlQuery", "name": "name", "description": "description" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateSqlQueryDefinition' ], domain: [ 'FenergoNebulaReportsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "sqlQuery": "sqlQuery", "description": "description" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateReport' ], domain: [ 'FenergoNebulaReportsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "sqlQuery": "sqlQuery" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'Preview' ], domain: [ 'FenergoNebulaReportsCommandv10' ] } } }
];

async function ExecuteFenergoNebulaReportsCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let Id='';
switch(endpoint){ case 'CreateSqlQueryDefinition': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportscommand/api/Query';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateSqlQueryDefinition': 
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportscommand/api/Query';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteSqlQueryDefinition': Id = base.getNodeParameter('Id', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportscommand/api/Query/{Id}'.replace('{Id}', Id);

break;
case 'CreateReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportscommand/api/Report';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'Preview': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportscommand/api/Report/Preview';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
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
    FenergoNebulaReportsCommandv10Properties,
    ExecuteFenergoNebulaReportsCommandv10
}
