import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenX.node';

let FenergoExternalDataPortalOutreachQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get all Associations by Journey Id', value: 'GetAssociations' },{ name: 'Get all Existing Associated Entities Comments by Journey Id', value: 'GetAssociatedEntityComments' },{ name: 'Get outreach entity data by journey id', value: 'GetDataByJourneyId' },{ name: 'Get list of outreach related Data', value: 'GetRelatedDataList' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoExternalDataPortalOutreachQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetAssociations' ], domain: [ 'FenergoExternalDataPortalOutreachQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetAssociations' ], domain: [ 'FenergoExternalDataPortalOutreachQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Id of a journey that associated entities comments belong to', displayOptions: { show: { endpoint: [ 'GetAssociatedEntityComments' ], domain: [ 'FenergoExternalDataPortalOutreachQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Journey id', displayOptions: { show: { endpoint: [ 'GetDataByJourneyId' ], domain: [ 'FenergoExternalDataPortalOutreachQueryv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "ids": [ "" ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetRelatedDataList' ], domain: [ 'FenergoExternalDataPortalOutreachQueryv10' ] } } }
];

async function ExecuteFenergoExternalDataPortalOutreachQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let JourneyId=''; let EntityId=''; let journeyId='';
switch(endpoint){ case 'GetAssociations': JourneyId = base.getNodeParameter('JourneyId', 0) as string;
EntityId = base.getNodeParameter('EntityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/externaloutreachquery/api/association/root/{EntityId}/journey/{JourneyId}'.replace('{JourneyId}', JourneyId).replace('{EntityId}', EntityId);

break;
case 'GetAssociatedEntityComments': journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/externaloutreachquery/api/association/existingassociatedentitycomments/{journeyId}'.replace('{journeyId}', journeyId);

break;
case 'GetDataByJourneyId': journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/externaloutreachquery/api/data/getdatabyjourneyid/{journeyId}'.replace('{journeyId}', journeyId);

break;
case 'GetRelatedDataList': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/externaloutreachquery/api/related-data/getlist';

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
    FenergoExternalDataPortalOutreachQueryv10Properties,
    ExecuteFenergoExternalDataPortalOutreachQueryv10
}
