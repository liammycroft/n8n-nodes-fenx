import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXAPAC.node';

let FenergoNebulaDashboardsCommandv100Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Set task is favourite flag', value: 'SetIsFavouriteFlag' },{ name: 'Bulk set tasks is favourite flag', value: 'BulkSetIsFavouriteFlag' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaDashboardsCommandv100',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "taskId": "taskId", "journeyId": "journeyId", "isFavourite": false, "userId": "userId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SetIsFavouriteFlag' ], domain: [ 'FenergoNebulaDashboardsCommandv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "tasks": [ { "taskId": "taskId", "journeyId": "journeyId", "isFavourite": false, "userId": "userId" } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'BulkSetIsFavouriteFlag' ], domain: [ 'FenergoNebulaDashboardsCommandv100' ] } } }
];

async function ExecuteFenergoNebulaDashboardsCommandv100(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    
switch(endpoint){ case 'SetIsFavouriteFlag': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardscommand/api/user-tasks';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'BulkSetIsFavouriteFlag': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardscommand/api/user-tasks/bulk';

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
    FenergoNebulaDashboardsCommandv100Properties,
    ExecuteFenergoNebulaDashboardsCommandv100
}
