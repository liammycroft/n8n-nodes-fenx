import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXAPAC.node';

let FenergoNebulaDocumentManagementCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create acceptable document set model', value: 'CreateAcceptableDocumentSet' },{ name: 'Create acceptable document set version by version number', value: 'CreateAcceptableDocumentSetVersionByVersionNumber' },{ name: 'Create acceptable document set version with given acceptable documents', value: 'CreateAcceptableDocumentSetVersion' },{ name: 'Submit acceptable document set version for approval', value: 'SubmitForApprovalAcceptableDocumentSetVersion' },{ name: 'Sign acceptable document set version', value: 'SignAcceptableDocumentSetVersion' },{ name: 'Archive acceptable document set version', value: 'ArchiveAcceptableDocumentSetVersion' },{ name: 'Create acceptable document model', value: 'CreateAcceptableDocument' },{ name: 'Update an existing acceptable document model', value: 'UpdateAcceptableDocument' },{ name: 'Upload a document', value: 'UploadDocumentModel' },{ name: 'Updates a document', value: 'UpdateDocument' },{ name: 'Update the requirements linked to a document', value: 'UpdateRequirementIds' },{ name: 'Update a document', value: 'UpdateDocumentFile' },{ name: 'Update the requirement datakey linked to a document', value: 'UpdateDataKey' },{ name: 'Creates a new DocumentRequirement.', value: 'CreateDocumentRequirement' },{ name: 'Updates an existing DocumentRequirement', value: 'UpdateDocumentRequirement' },{ name: 'Updates the existing properties on a DocumentRequirement', value: 'UpdateDocumentRequirementProperties' },{ name: 'Sends a request with documents to external provider for eSignature.', value: 'SendDocumentsForSignature' },{ name: 'Save Provider status', value: 'SaveProviderStatus' },{ name: 'Save Configuration', value: 'SaveProviderConfiguration' },{ name: 'Creates a new eSignatureDocumentRequirement.', value: 'CreateESignatureDocumentRequirement' },{ name: 'Updates an existing eSignatureDocumentRequirement', value: 'UpdateESignatureDocumentRequirement' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaDocumentManagementCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocumentSetVersionByVersionNumber' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to be cloned', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocumentSetVersionByVersionNumber' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'SubmitForApprovalAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to submit', displayOptions: { show: { endpoint: [ 'SubmitForApprovalAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'SignAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to sign', displayOptions: { show: { endpoint: [ 'SignAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'ArchiveAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to archive', displayOptions: { show: { endpoint: [ 'ArchiveAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number where the acceptable document will be added', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'UpdateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number where the acceptable document to be updated lives', displayOptions: { show: { endpoint: [ 'UpdateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The id of the existing model', displayOptions: { show: { endpoint: [ 'UpdateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateRequirementIds' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateDataKey' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateDocumentRequirementProperties' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'SaveProviderStatus' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'SaveProviderConfiguration' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateESignatureDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "setId": "setId", "acceptableDocuments": [ { "type": "type", "description": "description", "dataKey": "dataKey" } ], "notes": "notes" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "comment": "comment", "decision": "Approve", "created": "2023-11-07T11:29:16.1547983+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SignAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "type": "type", "description": "description", "dataKey": "dataKey" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "type": "type", "description": "description", "dataKey": "dataKey" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirementIds": [ "" ], "documentDataKey": "documentDataKey", "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '[ "" ]', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateRequirementIds' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "requirementId": "requirementId", "requirementName": "requirementName", "documentDataKey": "documentDataKey", "isMandatory": false, "journeyId": "journeyId", "entityId": "entityId", "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.1549102+00:00", "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.1549403+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDocumentRequirementProperties' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "taskId": "taskId", "entityId": "entityId", "journeyId": "journeyId", "entityName": "entityName", "providerName": "providerName", "documentRequirementsIds": [ "" ], "signers": [ { "signerType": "signerType", "fullName": "fullName", "email": "email", "relationship": "relationship", "hasSigned": false, "order": 0 } ], "isDraft": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SendDocumentsForSignature' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": false }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SaveProviderStatus' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "configuration": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SaveProviderConfiguration' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "requirementId": "requirementId", "requirementName": "requirementName", "documentDataKey": "documentDataKey", "isMandatory": false, "journeyId": "journeyId", "entityId": "entityId", "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.1550338+00:00", "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "properties": {}, "envelopeId": "envelopeId", "dateSent": "2023-11-07T11:29:16.1550428+00:00", "lastNotificationDate": "2023-11-07T11:29:16.1550439+00:00", "signers": [ { "signerType": "signerType", "fullName": "fullName", "email": "email", "relationship": "relationship", "hasSigned": false, "order": 0 } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateESignatureDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.1550722+00:00", "envelopeId": "envelopeId", "dateSent": "2023-11-07T11:29:16.1550784+00:00", "lastNotificationDate": "2023-11-07T11:29:16.1550796+00:00", "signers": [ { "signerType": "signerType", "fullName": "fullName", "email": "email", "relationship": "relationship", "hasSigned": false, "order": 0 } ], "doNotOverrideESignature": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateESignatureDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv10' ] } } }
];

async function ExecuteFenergoNebulaDocumentManagementCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let setId=''; let versionNumber=''; let id=''; let providerId='';
switch(endpoint){ case 'CreateAcceptableDocumentSet': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/acceptabledocument/set';

break;
case 'CreateAcceptableDocumentSetVersionByVersionNumber': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/acceptabledocument/set/{setId}/version/{versionNumber}'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

break;
case 'CreateAcceptableDocumentSetVersion': setId = base.getNodeParameter('setId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/acceptabledocument/set/{setId}'.replace('{setId}', setId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SubmitForApprovalAcceptableDocumentSetVersion': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/acceptabledocument/set/{setId}/version/{versionNumber}/submit-for-approval'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

break;
case 'SignAcceptableDocumentSetVersion': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/acceptabledocument/set/{setId}/version/{versionNumber}/sign'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'ArchiveAcceptableDocumentSetVersion': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/acceptabledocument/set/{setId}/version/{versionNumber}/archive'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

break;
case 'CreateAcceptableDocument': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/acceptabledocument/set/{setId}/version/{versionNumber}/acceptableDocument'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateAcceptableDocument': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/acceptabledocument/set/{setId}/version/{versionNumber}/acceptableDocument/{id}'.replace('{setId}', setId).replace('{versionNumber}', versionNumber).replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UploadDocumentModel': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/documentmanagement';

break;
case 'UpdateDocument': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/documentmanagement/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateRequirementIds': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/documentmanagement/{id}/requirement-ids'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDocumentFile': 
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/documentmanagement/updateFile';

break;
case 'UpdateDataKey': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/documentmanagement/{id}/datakey'.replace('{id}', id);

break;
case 'CreateDocumentRequirement': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/documentrequirement';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDocumentRequirement': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/documentrequirement/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDocumentRequirementProperties': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/documentrequirement/{id}/properties'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SendDocumentsForSignature': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/esignature';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SaveProviderStatus': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/esignatureconfiguration/provider/{providerId}/status'.replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SaveProviderConfiguration': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/esignatureconfiguration/provider/{providerId}/configuration'.replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateESignatureDocumentRequirement': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/esignaturedocumentrequirement';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateESignatureDocumentRequirement': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/esignaturedocumentrequirement/{id}'.replace('{id}', id);

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
    FenergoNebulaDocumentManagementCommandv10Properties,
    ExecuteFenergoNebulaDocumentManagementCommandv10
}
