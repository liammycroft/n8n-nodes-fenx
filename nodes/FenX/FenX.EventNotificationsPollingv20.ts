import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenX.node';

let EventNotificationsPollingv20Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Discards all messages in queue for specific feed', value: 'DiscardAll' },{ name: 'Get the next batch of event notifications.', value: 'GetNext' },{ name: 'List all available event notification types.', value: 'ListEventNotificationTypes' },{ name: 'Marks a batch as complete.', value: 'Marksabatchascomplete.' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'EventNotificationsPollingv20',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'feedId', name: 'feedId', type: 'string', required: true, default: '', description: 'The feed identifier. Each tenant has by default all feed which contains all notifications and feed per specific event source (i.e. document, entitydata, journey, screening)', displayOptions: { show: { endpoint: [ 'DiscardAll' ], domain: [ 'EventNotificationsPollingv20' ] } } },{ displayName: 'feedId', name: 'feedId', type: 'string', required: true, default: '', description: 'The feed identifier. Each tenant has by default all feed which contains all notifications and feed per specific event source (i.e. document, entitydata, journey, screening)', displayOptions: { show: { endpoint: [ 'GetNext' ], domain: [ 'EventNotificationsPollingv20' ] } } },{ displayName: 'feedId', name: 'feedId', type: 'string', required: true, default: '', description: 'The feed identifier. Each tenant has by default all feed which contains all notifications and feed per specifc event source (i.e. document, entitydata, journey, screening)', displayOptions: { show: { endpoint: [ 'Marksabatchascomplete.' ], domain: [ 'EventNotificationsPollingv20' ] } } },{ displayName: 'batchId', name: 'batchId', type: 'string', required: true, default: '', description: 'The batch identifier. Id of batch of event notifications which will be processed and set to complete after processing.', displayOptions: { show: { endpoint: [ 'Marksabatchascomplete.' ], domain: [ 'EventNotificationsPollingv20' ] } } }
];

async function ExecuteEventNotificationsPollingv20(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let feedId=''; let batchId='';
switch(endpoint){ case 'DiscardAll': feedId = base.getNodeParameter('feedId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/eventnotifications/v2/{feedId}/discardAll'.replace('{feedId}', feedId);

break;
case 'GetNext': feedId = base.getNodeParameter('feedId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/eventnotifications/v2/{feedId}/next'.replace('{feedId}', feedId);

break;
case 'ListEventNotificationTypes': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/eventnotifications/v2/event-notification-types';

break;
case 'Marksabatchascomplete.': feedId = base.getNodeParameter('feedId', 0) as string;
batchId = base.getNodeParameter('batchId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/eventnotifications/v2/{feedId}/{batchId}/complete'.replace('{feedId}', feedId).replace('{batchId}', batchId);

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
    EventNotificationsPollingv20Properties,
    ExecuteEventNotificationsPollingv20
}
