import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenX.node';

let EventNotificationsWebhooksv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'List all webhook configurations.', value: 'ListWebhooks' },{ name: 'Delete webhook configuration.', value: 'DeleteWebhook' },{ name: 'List all available event notification types.', value: 'ListEventNotificationTypes' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'EventNotificationsWebhooksv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'webhookId', name: 'webhookId', type: 'string', required: true, default: '', description: 'The webhook identifier.', displayOptions: { show: { endpoint: [ 'DeleteWebhook' ], domain: [ 'EventNotificationsWebhooksv10' ] } } }
];

async function ExecuteEventNotificationsWebhooksv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let webhookId='';
switch(endpoint){ case 'ListWebhooks': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/webhooks/v1/webhooks';

break;
case 'DeleteWebhook': webhookId = base.getNodeParameter('webhookId', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.fenergox.com/webhooks/v1/webhooks/{webhookId}'.replace('{webhookId}', webhookId);

break;
case 'ListEventNotificationTypes': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/webhooks/v1/webhooks/event-notification-types';

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
    EventNotificationsWebhooksv10Properties,
    ExecuteEventNotificationsWebhooksv10
}
