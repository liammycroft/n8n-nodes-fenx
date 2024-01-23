import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaExternalAuthenticationQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get endpoint configuration for a single configuration ID.', value: 'GetConfigurationById' },{ name: 'Get all your endpoint configurations.', value: 'GetAllConfigurationsByTenant' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaExternalAuthenticationQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetConfigurationById' ], domain: [ 'FenergoNebulaExternalAuthenticationQueryv10' ] } } }
];

async function ExecuteFenergoNebulaExternalAuthenticationQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let configurationId='';
switch(endpoint){ case 'GetConfigurationById': configurationId = base.getNodeParameter('configurationId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externalauthenticationquery/api/configuration/{configurationId}'.replace('{configurationId}', configurationId);

break;
case 'GetAllConfigurationsByTenant': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externalauthenticationquery/api/configuration/getAll';

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
    FenergoNebulaExternalAuthenticationQueryv10Properties,
    ExecuteFenergoNebulaExternalAuthenticationQueryv10
}
