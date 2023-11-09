import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaReportsQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get all stored Query definitions', value: 'GetAllQueryDefinitions' },{ name: 'Get Stored Query definition', value: 'GetQueryDefinitionById' },{ name: 'Get generated Report', value: 'GetReportById' },{ name: 'Get Report status', value: 'GetStatusById' },{ name: 'Get all tables', value: 'GetTables' },{ name: 'Get a Table', value: 'GetTable' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaReportsQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetQueryDefinitionById' ], domain: [ 'FenergoNebulaReportsQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetReportById' ], domain: [ 'FenergoNebulaReportsQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetStatusById' ], domain: [ 'FenergoNebulaReportsQueryv10' ] } } },{ displayName: 'tableName', name: 'tableName', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetTable' ], domain: [ 'FenergoNebulaReportsQueryv10' ] } } }
];

async function ExecuteFenergoNebulaReportsQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let id=''; let tableName='';
switch(endpoint){ case 'GetAllQueryDefinitions': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/QueryDefinition';

break;
case 'GetQueryDefinitionById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/QueryDefinition/{id}'.replace('{id}', id);

break;
case 'GetReportById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/Report/{id}'.replace('{id}', id);

break;
case 'GetStatusById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/Report/{id}/status'.replace('{id}', id);

break;
case 'GetTables': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/Schema';

break;
case 'GetTable': tableName = base.getNodeParameter('tableName', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/Schema/{tableName}'.replace('{tableName}', tableName);

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
    FenergoNebulaReportsQueryv10Properties,
    ExecuteFenergoNebulaReportsQueryv10
}
