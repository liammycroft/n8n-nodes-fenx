import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaExternalAuthenticationCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: '', value: 'CreateConfiguration' },{ name: '', value: 'UpdateConfiguration' },{ name: '', value: 'DeleteConfiguration' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaExternalAuthenticationCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "url": "url", "isMtlsEnabled": false, "endpointCertificate": { "isPublicCA": false, "certificate": "certificate" }, "headers": [ { "name": "name", "value": "value" } ], "oAuthConfiguration": { "clientCredentialsConfig": { "clientId": "clientId", "clientSecret": "clientSecret", "useBasicAuthentication": false, "url": "url", "isMtlsEnabled": false, "endpointCertificate": { "isPublicCA": false, "certificate": "certificate" }, "headers": [ { "name": "name", "value": "value" } ], "useEndpointMtlsConfiguration": false, "formValues": [ { "name": "name", "value": "value" } ] } } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateConfiguration' ], domain: [ 'FenergoNebulaExternalAuthenticationCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "url": "url", "isMtlsEnabled": false, "endpointCertificate": { "isPublicCA": false, "certificate": "certificate" }, "headers": [ { "name": "name", "value": "value" } ], "oAuthConfiguration": { "clientCredentialsConfig": { "clientId": "clientId", "clientSecret": "clientSecret", "useBasicAuthentication": false, "url": "url", "isMtlsEnabled": false, "endpointCertificate": { "isPublicCA": false, "certificate": "certificate" }, "headers": [ { "name": "name", "value": "value" } ], "useEndpointMtlsConfiguration": false, "formValues": [ { "name": "name", "value": "value" } ] } } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateConfiguration' ], domain: [ 'FenergoNebulaExternalAuthenticationCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'UpdateConfiguration' ], domain: [ 'FenergoNebulaExternalAuthenticationCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'DeleteConfiguration' ], domain: [ 'FenergoNebulaExternalAuthenticationCommandv10' ] } } }
];

async function ExecuteFenergoNebulaExternalAuthenticationCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    
switch(endpoint){ case 'CreateConfiguration': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externalauthenticationcommand/api/configuration';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateConfiguration': 
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externalauthenticationcommand/api/configuration';
requestOptions.qs = { configurationId: base.getNodeParameter('configurationId', 0) as string };
requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteConfiguration': 
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externalauthenticationcommand/api/configuration';
requestOptions.qs = { configurationId: base.getNodeParameter('configurationId', 0) as string };
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
    FenergoNebulaExternalAuthenticationCommandv10Properties,
    ExecuteFenergoNebulaExternalAuthenticationCommandv10
}
