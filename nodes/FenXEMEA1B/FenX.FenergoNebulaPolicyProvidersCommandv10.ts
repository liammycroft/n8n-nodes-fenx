import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaPolicyProvidersCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create External Api Provider', value: 'CreatePolicyProvider' },{ name: 'Update Policy External Api Provider', value: 'UpdatePolicyProvider' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaPolicyProvidersCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: 'PolicyProvider Id', displayOptions: { show: { endpoint: [ 'UpdatePolicyProvider' ], domain: [ 'FenergoNebulaPolicyProvidersCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "name": "name", "serviceUrl": "serviceUrl", "encryptionKey": "encryptionKey", "authenticationKey": "authenticationKey", "type": "type", "dataGroupId": "dataGroupId", "searchFieldsConfigs": [ { "label": "label", "name": "name" } ], "resultFieldsConfig": [ { "dataKey": "dataKey" } ], "detailsUrl": "detailsUrl" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreatePolicyProvider' ], domain: [ 'FenergoNebulaPolicyProvidersCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "version": -1, "id": "id", "name": "name", "serviceUrl": "serviceUrl", "encryptionKey": "encryptionKey", "authenticationKey": "authenticationKey", "type": "type", "dataGroupId": "dataGroupId", "searchFieldsConfigs": [ { "label": "label", "name": "name" } ], "resultFieldsConfig": [ { "dataKey": "dataKey" } ], "detailsUrl": "detailsUrl" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdatePolicyProvider' ], domain: [ 'FenergoNebulaPolicyProvidersCommandv10' ] } } }
];

async function ExecuteFenergoNebulaPolicyProvidersCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let providerId='';
switch(endpoint){ case 'CreatePolicyProvider': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/policyproviderscommand/api/provider';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdatePolicyProvider': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/policyproviderscommand/api/provider/{providerId}'.replace('{providerId}', providerId);

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
    FenergoNebulaPolicyProvidersCommandv10Properties,
    ExecuteFenergoNebulaPolicyProvidersCommandv10
}
