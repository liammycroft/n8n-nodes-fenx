import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenX.node';

let FenergoNebulaAssociationCommandv20Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Verify a single association', value: 'VerifyAssociation' },{ name: 'Permanently delete an existing unverified Association', value: 'DeleteAssociation' },{ name: 'Restore a soft deleted Association', value: 'RestoreSoftDeletedAssociation' },{ name: 'Create new Entity Association', value: 'CreateAssociation' },{ name: 'Update an existing unverified association', value: 'UpdateAssociation' },{ name: 'Verify all associations in a journey', value: 'VerifyAllAssociations' },{ name: 'Verify all group management associations in a journey', value: 'VerifyAllGroupManagementAssociations' },{ name: 'Mark a verified Association for deletion', value: 'DeleteVerifiedAssociation' },{ name: 'Resolve detected association conflict', value: 'ResolveConflict' },{ name: 'Update an existing entity', value: 'UpdateEntity' },{ name: 'Create new Unwrapping Requirement Status Model', value: 'CreateUnwrappingRequirementStatusModel' },{ name: 'Create single Unwrapping Requirement Status.', value: 'CreateSingleUnwrappingRequirementStatusModel' },{ name: 'Update existing Unwrapping Requirement Status Model.', value: 'UpdateUnwrappingRequirementStatusModel' },{ name: 'Update single Unwrapping Requirement Status.', value: 'UpdateSingleUnwrappingRequirementStatusModel' },{ name: 'Measures the completeness of Ownership and Control Unwrapping requirements', value: 'MeasureCompleteness' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaAssociationCommandv20',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the Association to verify', displayOptions: { show: { endpoint: [ 'VerifyAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Current Journey, Journey Id', displayOptions: { show: { endpoint: [ 'VerifyAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to delete', displayOptions: { show: { endpoint: [ 'DeleteAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Current Journey, Journey Id', displayOptions: { show: { endpoint: [ 'DeleteAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to restore', displayOptions: { show: { endpoint: [ 'RestoreSoftDeletedAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The Id of the journey where it was marked for deletion', displayOptions: { show: { endpoint: [ 'RestoreSoftDeletedAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing unverified Association to update', displayOptions: { show: { endpoint: [ 'UpdateAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The Id of the root entity', displayOptions: { show: { endpoint: [ 'VerifyAllAssociations' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The Id of the journey the associations to verify belong to', displayOptions: { show: { endpoint: [ 'VerifyAllAssociations' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The Id of the root entity', displayOptions: { show: { endpoint: [ 'VerifyAllGroupManagementAssociations' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The Id of the journey the associations to verify belong to', displayOptions: { show: { endpoint: [ 'VerifyAllGroupManagementAssociations' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to delete', displayOptions: { show: { endpoint: [ 'DeleteVerifiedAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The Id of the journey which requested the deletion', displayOptions: { show: { endpoint: [ 'DeleteVerifiedAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing Association to update', displayOptions: { show: { endpoint: [ 'ResolveConflict' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing Entity to update', displayOptions: { show: { endpoint: [ 'UpdateEntity' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The identifier.', displayOptions: { show: { endpoint: [ 'UpdateUnwrappingRequirementStatusModel' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The identifier.', displayOptions: { show: { endpoint: [ 'UpdateSingleUnwrappingRequirementStatusModel' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "sourceId": "sourceId", "targetId": "targetId", "rootEntityId": "rootEntityId", "type": "type", "journeyId": "journeyId", "isVerified": false, "ownershipPercentage": 0.0, "controlPercentage": 0.0, "originalAssociations": [ { "associationId": "associationId", "type": "type" } ], "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "sourceId": "sourceId", "targetId": "targetId", "rootEntityId": "rootEntityId", "type": "type", "journeyId": "journeyId", "isVerified": false, "ownershipPercentage": 0.0, "controlPercentage": 0.0, "originalAssociations": [ { "associationId": "associationId", "type": "type" } ], "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "mergeResult": { "id": "id", "sourceId": "sourceId", "targetId": "targetId", "rootEntityId": "rootEntityId", "type": "type", "journeyId": "journeyId", "isVerified": false, "ownershipPercentage": 0.0, "controlPercentage": 0.0, "originalAssociations": [ { "associationId": "associationId", "type": "type" } ], "properties": {} }, "invalidAssociation": "invalidAssociation" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'ResolveConflict' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "entityId": "entityId", "type": "type" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateEntity' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "entityId": "entityId", "journeyId": "journeyId", "statuses": [ { "requirementId": "requirementId", "status": "status", "ownershipAndControlDataKey": "ownershipAndControlDataKey", "requirementName": "requirementName", "idvName": "idvName", "minimumPartyCount": 0, "addAllParties": false } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateUnwrappingRequirementStatusModel' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "entityId": "entityId", "journeyId": "journeyId", "status": { "requirementId": "requirementId", "status": "status", "ownershipAndControlDataKey": "ownershipAndControlDataKey", "requirementName": "requirementName", "idvName": "idvName", "minimumPartyCount": 0, "addAllParties": false } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateSingleUnwrappingRequirementStatusModel' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "statuses": [ { "requirementId": "requirementId", "status": "status", "ownershipAndControlDataKey": "ownershipAndControlDataKey", "requirementName": "requirementName", "idvName": "idvName", "minimumPartyCount": 0, "addAllParties": false } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateUnwrappingRequirementStatusModel' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "requirementId": "requirementId", "status": "status", "ownershipAndControlDataKey": "ownershipAndControlDataKey", "requirementName": "requirementName", "idvName": "idvName", "minimumPartyCount": 0, "addAllParties": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateSingleUnwrappingRequirementStatusModel' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "journeyId": "journeyId", "taskId": "taskId", "entityId": "entityId", "entityDraftId": "entityDraftId", "productDraftId": "productDraftId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'MeasureCompleteness' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } },{ displayName: 'rootEntityId', name: 'rootEntityId', type: 'string', required: true, default: '', description: 'Related party root entity id', displayOptions: { show: { endpoint: [ 'DeleteAssociation' ], domain: [ 'FenergoNebulaAssociationCommandv20' ] } } }
];

async function ExecuteFenergoNebulaAssociationCommandv20(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let id=''; let journeyId=''; let entityId='';
switch(endpoint){ case 'VerifyAssociation': id = base.getNodeParameter('id', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/association/verify/{id}/journeyId/{journeyId}'.replace('{id}', id).replace('{journeyId}', journeyId);

break;
case 'DeleteAssociation': id = base.getNodeParameter('id', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/association/{id}/journeyId/{journeyId}'.replace('{id}', id).replace('{journeyId}', journeyId);
requestOptions.qs = { rootEntityId: base.getNodeParameter('rootEntityId', 0) as string };
break;
case 'RestoreSoftDeletedAssociation': id = base.getNodeParameter('id', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/association/{id}/journeyId/{journeyId}'.replace('{id}', id).replace('{journeyId}', journeyId);

break;
case 'CreateAssociation': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/association';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateAssociation': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/association/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'VerifyAllAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/association/verifyAll/entityId/{entityId}/journeyId/{journeyId}'.replace('{entityId}', entityId).replace('{journeyId}', journeyId);

break;
case 'VerifyAllGroupManagementAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/association/verifyAllGroupManagement/entityId/{entityId}/journeyId/{journeyId}'.replace('{entityId}', entityId).replace('{journeyId}', journeyId);

break;
case 'DeleteVerifiedAssociation': id = base.getNodeParameter('id', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/association/{id}/{journeyId}'.replace('{id}', id).replace('{journeyId}', journeyId);

break;
case 'ResolveConflict': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/association/resolveConflict/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateEntity': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/entity/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateUnwrappingRequirementStatusModel': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/unwrapping-requirement-status';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateSingleUnwrappingRequirementStatusModel': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/unwrapping-requirement-status/create-single-status';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateUnwrappingRequirementStatusModel': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/unwrapping-requirement-status/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateSingleUnwrappingRequirementStatusModel': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/unwrapping-requirement-status/update-single-status/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'MeasureCompleteness': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/associationcommand/api/v2/unwrapping-requirement-status/measure-completeness';

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
    FenergoNebulaAssociationCommandv20Properties,
    ExecuteFenergoNebulaAssociationCommandv20
}
