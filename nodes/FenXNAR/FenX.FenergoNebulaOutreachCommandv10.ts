import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaOutreachCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create Domain', value: 'CreateDomain' },{ name: 'Verify Domain', value: 'VerifyDomain' },{ name: 'Enable Domain', value: 'EnableDomain' },{ name: 'Disable Domain', value: 'DisableDomain' },{ name: 'Delete Domain', value: 'DeleteDomain' },{ name: 'Send Email', value: 'SendEmail' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaOutreachCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'VerifyDomain' ], domain: [ 'FenergoNebulaOutreachCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'EnableDomain' ], domain: [ 'FenergoNebulaOutreachCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'DisableDomain' ], domain: [ 'FenergoNebulaOutreachCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'DeleteDomain' ], domain: [ 'FenergoNebulaOutreachCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "name": "name" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateDomain' ], domain: [ 'FenergoNebulaOutreachCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "to": "to", "templateName": "templateName", "variables": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SendEmail' ], domain: [ 'FenergoNebulaOutreachCommandv10' ] } } }
];

async function ExecuteFenergoNebulaOutreachCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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
switch(endpoint){ case 'CreateDomain': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/outreachcommand/api/EmailDomain';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'VerifyDomain': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/outreachcommand/api/EmailDomain/{id}/verify'.replace('{id}', id);

break;
case 'EnableDomain': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/outreachcommand/api/EmailDomain/{id}/enable'.replace('{id}', id);

break;
case 'DisableDomain': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/outreachcommand/api/EmailDomain/{id}/disable'.replace('{id}', id);

break;
case 'DeleteDomain': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.nar1.fenergox.com/outreachcommand/api/EmailDomain/{id}'.replace('{id}', id);

break;
case 'SendEmail': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/outreachcommand/api/EmailMessages';

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
    FenergoNebulaOutreachCommandv10Properties,
    ExecuteFenergoNebulaOutreachCommandv10
}
