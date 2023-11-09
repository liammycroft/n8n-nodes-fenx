import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenX.node';

let FenergoNebulaConfigurationExchangeQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get all ConfigurationEnvironments', value: 'GetAllConfigurationEnvironments' },{ name: 'Get a ConfigurationEnvironment', value: 'GetConfigurationEnvironmentById' },{ name: 'Get data about the last imports of multiple source tenant configurations', value: 'GetLatestImportedConfigsBySourceIds' },{ name: 'Get all ImportRecords', value: 'GetAllImportRecords' },{ name: 'Get an ImportRecord', value: 'GetImportRecordById' },{ name: 'Get an ImportSession', value: 'GetImportSession' },{ name: 'Get session logs', value: 'GetLogs' },{ name: 'Get basic details for all import sessions', value: 'GetAllImportSessionSummaries' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaConfigurationExchangeQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Unique Identifier of the ConfigurationEnvironment', displayOptions: { show: { endpoint: [ 'GetConfigurationEnvironmentById' ], domain: [ 'FenergoNebulaConfigurationExchangeQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Unique Identifier of the ImportRecord', displayOptions: { show: { endpoint: [ 'GetImportRecordById' ], domain: [ 'FenergoNebulaConfigurationExchangeQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Unique Identifier of the ImportSession', displayOptions: { show: { endpoint: [ 'GetImportSession' ], domain: [ 'FenergoNebulaConfigurationExchangeQueryv10' ] } } },{ displayName: 'sessionId', name: 'sessionId', type: 'string', required: true, default: '', description: 'Unique Identifier of the ImportSession', displayOptions: { show: { endpoint: [ 'GetLogs' ], domain: [ 'FenergoNebulaConfigurationExchangeQueryv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "sourceTenantId": "sourceTenantId", "sourceConfigIdentifiers": [ { "configId": "configId", "configType": "configType" } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetLatestImportedConfigsBySourceIds' ], domain: [ 'FenergoNebulaConfigurationExchangeQueryv10' ] } } }
];

async function ExecuteFenergoNebulaConfigurationExchangeQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let id=''; let sessionId='';
switch(endpoint){ case 'GetAllConfigurationEnvironments': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/configexchangequery/api/configuration-exchange';

break;
case 'GetConfigurationEnvironmentById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/configexchangequery/api/configuration-exchange/{id}'.replace('{id}', id);

break;
case 'GetLatestImportedConfigsBySourceIds': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/configexchangequery/api/import-history/getLatestBySourceIds';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetAllImportRecords': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/configexchangequery/api/import-history';

break;
case 'GetImportRecordById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/configexchangequery/api/import-history/{id}'.replace('{id}', id);

break;
case 'GetImportSession': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/configexchangequery/api/import-session/{id}'.replace('{id}', id);

break;
case 'GetLogs': sessionId = base.getNodeParameter('sessionId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/configexchangequery/api/import-session/{sessionId}/log'.replace('{sessionId}', sessionId);

break;
case 'GetAllImportSessionSummaries': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/configexchangequery/api/import-session';

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
    FenergoNebulaConfigurationExchangeQueryv10Properties,
    ExecuteFenergoNebulaConfigurationExchangeQueryv10
}
