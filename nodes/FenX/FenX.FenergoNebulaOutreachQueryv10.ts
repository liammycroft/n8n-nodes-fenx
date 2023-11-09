import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenX.node';

let FenergoNebulaOutreachQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get EmailDomain by tenant', value: 'GetEmailDomainByTenant' },{ name: 'Get EmailTamplates by tenant', value: 'GetEmailTamplatesByTenant' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaOutreachQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, 
];

async function ExecuteFenergoNebulaOutreachQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    
switch(endpoint){ case 'GetEmailDomainByTenant': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/outreachquery/api/EmailDomain';

break;
case 'GetEmailTamplatesByTenant': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/outreachquery/api/EmailTemplates';

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
    FenergoNebulaOutreachQueryv10Properties,
    ExecuteFenergoNebulaOutreachQueryv10
}
