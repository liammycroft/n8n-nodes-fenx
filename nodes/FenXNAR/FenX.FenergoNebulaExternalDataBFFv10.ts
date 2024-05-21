import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaExternalDataBFFv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create new search request', value: 'RequestSearch' },{ name: 'Create new search request for existing context', value: 'RequestNewRequestSearch' },{ name: 'Get process data by context type and id', value: 'GetNewRequest' },{ name: 'Create new search request', value: 'RequestProcessSearch' },{ name: 'Create new get request', value: 'RequestProcessGet' },{ name: 'Create Ultimate Beneficial Owner discovery request', value: 'RequestProcessUbo' },{ name: 'Create new import request', value: 'RequestNewRequestImport' },{ name: 'Create new import request', value: 'RequestProcessImport' },{ name: 'Create new document retrieval request', value: 'RequestProcessGetDocument' },{ name: 'Get process data by context type and id', value: 'GetProcess' },{ name: 'Get process get data by id', value: 'GetProcessGet' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaExternalDataBFFv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'contextType', name: 'contextType', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestSearch' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestNewRequestSearch' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: 'Id from which the request originated from', displayOptions: { show: { endpoint: [ 'GetNewRequest' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextType', name: 'contextType', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessSearch' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessSearch' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextType', name: 'contextType', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessGet' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessGet' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextType', name: 'contextType', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessUbo' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessUbo' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestNewRequestImport' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextType', name: 'contextType', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessImport' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessImport' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextType', name: 'contextType', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessGetDocument' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessGetDocument' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'getId', name: 'getId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'RequestProcessGetDocument' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextType', name: 'contextType', type: 'string', required: true, default: '', description: 'type of the context from which the request originated from', displayOptions: { show: { endpoint: [ 'GetProcess' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: 'Id from which the request originated from', displayOptions: { show: { endpoint: [ 'GetProcess' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextType', name: 'contextType', type: 'string', required: true, default: '', description: 'type of the context from which the request originated from', displayOptions: { show: { endpoint: [ 'GetProcessGet' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'contextId', name: 'contextId', type: 'string', required: true, default: '', description: 'Id from which the request originated from', displayOptions: { show: { endpoint: [ 'GetProcessGet' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'getId', name: 'getId', type: 'string', required: true, default: '', description: 'Id of the get', displayOptions: { show: { endpoint: [ 'GetProcessGet' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "providersIds": [ "" ], "searchCriteria": null, "entityType": "Unknown" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'RequestSearch' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "providersIds": [ "" ], "searchCriteria": null, "entityType": "Unknown" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'RequestNewRequestSearch' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "providersIds": [ "" ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'RequestProcessSearch' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "searchId": "searchId", "providerId": "providerId", "externalId": "externalId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'RequestProcessGet' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "getId": "getId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'RequestProcessUbo' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "searchId": "searchId", "externalId": "externalId", "overwrittenData": null, "journeyTypes": [ { "type": "type" } ], "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'RequestNewRequestImport' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "getId": "getId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'RequestProcessImport' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "documents": [ { "id": "id", "data": { "name": "name", "type": "type", "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] } } } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'RequestProcessGetDocument' ], domain: [ 'FenergoNebulaExternalDataBFFv10' ] } } }
];

async function ExecuteFenergoNebulaExternalDataBFFv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let contextType=''; let contextId=''; let getId='';
switch(endpoint){ case 'RequestSearch': contextType = base.getNodeParameter('contextType', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/{contextType}/search'.replace('{contextType}', contextType);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'RequestNewRequestSearch': contextId = base.getNodeParameter('contextId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/newRequest/{contextId}/search'.replace('{contextId}', contextId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetNewRequest': contextId = base.getNodeParameter('contextId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/newRequest/{contextId}'.replace('{contextId}', contextId);

break;
case 'RequestProcessSearch': contextType = base.getNodeParameter('contextType', 0) as string;
contextId = base.getNodeParameter('contextId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/{contextType}/{contextId}/search'.replace('{contextType}', contextType).replace('{contextId}', contextId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'RequestProcessGet': contextType = base.getNodeParameter('contextType', 0) as string;
contextId = base.getNodeParameter('contextId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/{contextType}/{contextId}/get'.replace('{contextType}', contextType).replace('{contextId}', contextId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'RequestProcessUbo': contextType = base.getNodeParameter('contextType', 0) as string;
contextId = base.getNodeParameter('contextId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/{contextType}/{contextId}/ubo'.replace('{contextType}', contextType).replace('{contextId}', contextId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'RequestNewRequestImport': contextId = base.getNodeParameter('contextId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/newRequest/{contextId}/import'.replace('{contextId}', contextId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'RequestProcessImport': contextType = base.getNodeParameter('contextType', 0) as string;
contextId = base.getNodeParameter('contextId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/{contextType}/{contextId}/import'.replace('{contextType}', contextType).replace('{contextId}', contextId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'RequestProcessGetDocument': contextType = base.getNodeParameter('contextType', 0) as string;
contextId = base.getNodeParameter('contextId', 0) as string;
getId = base.getNodeParameter('getId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/{contextType}/{contextId}/gets/{getId}/document'.replace('{contextType}', contextType).replace('{contextId}', contextId).replace('{getId}', getId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetProcess': contextType = base.getNodeParameter('contextType', 0) as string;
contextId = base.getNodeParameter('contextId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/{contextType}/{contextId}'.replace('{contextType}', contextType).replace('{contextId}', contextId);

break;
case 'GetProcessGet': contextType = base.getNodeParameter('contextType', 0) as string;
contextId = base.getNodeParameter('contextId', 0) as string;
getId = base.getNodeParameter('getId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/externaldatabff/api/processes/{contextType}/{contextId}/gets/{getId}'.replace('{contextType}', contextType).replace('{contextId}', contextId).replace('{getId}', getId);

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
    FenergoNebulaExternalDataBFFv10Properties,
    ExecuteFenergoNebulaExternalDataBFFv10
}
