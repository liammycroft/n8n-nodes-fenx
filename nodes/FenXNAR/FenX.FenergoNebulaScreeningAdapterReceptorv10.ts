import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaScreeningAdapterReceptorv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'This method handles the results from the different screening adapters', value: 'ReceiveResults' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaScreeningAdapterReceptorv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "id": "id", "tenant": "tenant", "providerId": "providerId", "type": "Screen", "status": "Success", "errorDetails": { "source": "source", "errorCode": "errorCode", "message": "message" }, "response": null }', description: 'Request body', displayOptions: { show: { endpoint: [ 'ReceiveResults' ], domain: [ 'FenergoNebulaScreeningAdapterReceptorv10' ] } } }
];

async function ExecuteFenergoNebulaScreeningAdapterReceptorv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    
switch(endpoint){ case 'ReceiveResults': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/screeningreceptor/api/receptor';

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
    FenergoNebulaScreeningAdapterReceptorv10Properties,
    ExecuteFenergoNebulaScreeningAdapterReceptorv10
}
