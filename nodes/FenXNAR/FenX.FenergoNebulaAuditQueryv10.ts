import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaAuditQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get Audit Events for a specific list of resource IDs.', value: 'GetAuditEventsForMultipleResources' },{ name: 'Get Audit Events for a specific search term', value: 'SearchByTerm' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaAuditQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "ids": [ "" ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetAuditEventsForMultipleResources' ], domain: [ 'FenergoNebulaAuditQueryv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "searchTerm": "searchTerm", "ids": [ "" ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SearchByTerm' ], domain: [ 'FenergoNebulaAuditQueryv10' ] } } }
];

async function ExecuteFenergoNebulaAuditQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    
switch(endpoint){ case 'GetAuditEventsForMultipleResources': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/auditquery/api/auditevent/resources';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SearchByTerm': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/auditquery/api/auditevent/searchterm';

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
    FenergoNebulaAuditQueryv10Properties,
    ExecuteFenergoNebulaAuditQueryv10
}
