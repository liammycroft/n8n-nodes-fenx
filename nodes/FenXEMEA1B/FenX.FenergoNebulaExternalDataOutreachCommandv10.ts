import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaExternalDataOutreachCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create new Entity Association', value: 'CreateAssociation' },{ name: 'Permanently delete an existing outreach Association', value: 'DeleteAssociation' },{ name: 'Update an existing outreach association', value: 'UpdateAssociation' },{ name: 'Stores comments of an existing associated entity', value: 'UpsertExistingAssociatedEntityComments' },{ name: 'Update outreach entity data', value: 'UpdateOutreachData' },{ name: 'Delete related outreach data', value: 'DeleteRelatedOutreachData' },{ name: 'Create related outreach data', value: 'CreateRelatedOutreachData' },{ name: 'Permanently deletes existing outreach related data.', value: 'ClearOutreachRelatedData' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaExternalDataOutreachCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to delete', displayOptions: { show: { endpoint: [ 'DeleteAssociation' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Current Journey, Journey Id', displayOptions: { show: { endpoint: [ 'DeleteAssociation' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing unverified Association to update', displayOptions: { show: { endpoint: [ 'UpdateAssociation' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The JourneyId of the existing associated entity comments to update', displayOptions: { show: { endpoint: [ 'UpsertExistingAssociatedEntityComments' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Journey id', displayOptions: { show: { endpoint: [ 'UpdateOutreachData' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Related data id', displayOptions: { show: { endpoint: [ 'DeleteRelatedOutreachData' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Journey id', displayOptions: { show: { endpoint: [ 'DeleteRelatedOutreachData' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Journey id', displayOptions: { show: { endpoint: [ 'CreateRelatedOutreachData' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Journey Id', displayOptions: { show: { endpoint: [ 'ClearOutreachRelatedData' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "sourceId": "sourceId", "targetId": "targetId", "type": "type", "journeyId": "journeyId", "ownershipPercentage": 0.0, "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateAssociation' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "sourceId": "sourceId", "targetId": "targetId", "type": "type", "journeyId": "journeyId", "ownershipPercentage": 0.0, "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateAssociation' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "associatedEntityIdsComments": {}, "version": 0 } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpsertExistingAssociatedEntityComments' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "sourceEntityId": "sourceEntityId", "jurisdictions": [ { "jurisdiction": "jurisdiction", "versionId": "versionId" } ], "type": "type", "category": [ "" ], "properties": {}, "version": -1 } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateOutreachData' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "sourceEntityId": "sourceEntityId", "jurisdictions": [ { "jurisdiction": "jurisdiction", "versionId": "versionId" } ], "type": "type", "category": [ "" ], "properties": {}, "version": -1 } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateRelatedOutreachData' ], domain: [ 'FenergoNebulaExternalDataOutreachCommandv10' ] } } }
];

async function ExecuteFenergoNebulaExternalDataOutreachCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let id=''; let journeyId='';
switch(endpoint){ case 'CreateAssociation': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externaloutreachcommand/api/association';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteAssociation': id = base.getNodeParameter('id', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externaloutreachcommand/api/association/{id}/journeyid/{journeyId}'.replace('{id}', id).replace('{journeyId}', journeyId);

break;
case 'UpdateAssociation': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externaloutreachcommand/api/association/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpsertExistingAssociatedEntityComments': journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externaloutreachcommand/api/association/existingassociatedentitycomments/{journeyId}'.replace('{journeyId}', journeyId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateOutreachData': journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externaloutreachcommand/api/data/updateoutreachdata/{journeyId}'.replace('{journeyId}', journeyId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteRelatedOutreachData': id = base.getNodeParameter('id', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externaloutreachcommand/api/related-data/{id}/journey/{journeyId}'.replace('{id}', id).replace('{journeyId}', journeyId);

break;
case 'CreateRelatedOutreachData': journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externaloutreachcommand/api/related-data/{journeyId}'.replace('{journeyId}', journeyId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'ClearOutreachRelatedData': journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.emea1b.fenergox.com/externaloutreachcommand/api/related-data/clear/journey/{journeyId}'.replace('{journeyId}', journeyId);

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
    FenergoNebulaExternalDataOutreachCommandv10Properties,
    ExecuteFenergoNebulaExternalDataOutreachCommandv10
}
