import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaReportsQueryv20Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get all stored Query definitions', value: 'GetAllQueries' },{ name: 'Get Stored Query definition', value: 'GetQueryById' },{ name: 'Get Stored Query definition', value: 'GetReportingHistory' },{ name: 'Get Stored Query definition', value: 'GetAssistantHistory' },{ name: 'Get generated Report', value: 'GetReportByIdV2' },{ name: 'Get Report status', value: 'GetStatusByIdV2' },{ name: 'Get Report Result', value: 'GetReportResultV2' },{ name: 'Get all tables', value: 'GetTables' },{ name: 'Get a Table', value: 'GetTable' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaReportsQueryv20',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetQueryById' ], domain: [ 'FenergoNebulaReportsQueryv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetReportingHistory' ], domain: [ 'FenergoNebulaReportsQueryv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetAssistantHistory' ], domain: [ 'FenergoNebulaReportsQueryv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetReportByIdV2' ], domain: [ 'FenergoNebulaReportsQueryv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetStatusByIdV2' ], domain: [ 'FenergoNebulaReportsQueryv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetReportResultV2' ], domain: [ 'FenergoNebulaReportsQueryv20' ] } } },{ displayName: 'tableName', name: 'tableName', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetTable' ], domain: [ 'FenergoNebulaReportsQueryv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "filters": { "queryId": "queryId", "users": [ "" ], "entityGeographicAccessLayers": [ "" ], "entityBusinessRelatedAccessLayers": [ "" ], "journeyGeographicAccessLayers": [ "" ], "journeyBusinessRelatedAccessLayers": [ "" ], "fieldGeographicAccessLayers": [ "" ], "fieldBusinessRelatedAccessLayers": [ "" ] }, "pageOptions": { "paginationToken": "paginationToken", "pageSize": 0, "sortOrder": "Ascending" } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetReportingHistory' ], domain: [ 'FenergoNebulaReportsQueryv20' ] } } }
];

async function ExecuteFenergoNebulaReportsQueryv20(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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
switch(endpoint){ case 'GetAllQueries': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/v2/Query';

break;
case 'GetQueryById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/v2/Query/{id}'.replace('{id}', id);

break;
case 'GetReportingHistory': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/v2/Query/{id}/history'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetAssistantHistory': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/v2/Query/{id}/assistant/history'.replace('{id}', id);

break;
case 'GetReportByIdV2': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/v2/Report/{id}'.replace('{id}', id);

break;
case 'GetStatusByIdV2': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/v2/Report/{id}/status'.replace('{id}', id);

break;
case 'GetReportResultV2': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/v2/Report/{id}/result/download'.replace('{id}', id);

break;
case 'GetTables': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/v2/Schema';

break;
case 'GetTable': tableName = base.getNodeParameter('tableName', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/reportsquery/api/v2/Schema/{tableName}'.replace('{tableName}', tableName);

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
    FenergoNebulaReportsQueryv20Properties,
    ExecuteFenergoNebulaReportsQueryv20
}
