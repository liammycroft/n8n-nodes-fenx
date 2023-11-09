import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXAPAC.node';

let FenergoNebulaDocumentManagementCommandv20Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create acceptable document set model', value: 'CreateAcceptableDocumentSet' },{ name: 'Create acceptable document set version by version number', value: 'CreateAcceptableDocumentSetVersionByVersionNumber' },{ name: 'Create acceptable document set version with given acceptable documents', value: 'CreateAcceptableDocumentSetVersion' },{ name: 'Submit acceptable document set version for approval', value: 'SubmitForApprovalAcceptableDocumentSetVersion' },{ name: 'Sign acceptable document set version', value: 'SignAcceptableDocumentSetVersion' },{ name: 'Archive acceptable document set version', value: 'ArchiveAcceptableDocumentSetVersion' },{ name: 'Create acceptable document model', value: 'CreateAcceptableDocument' },{ name: 'Update an existing acceptable document model', value: 'UpdateAcceptableDocument' },{ name: 'Save document metadata and generate the URL to upload the file', value: 'CreateDocumentModel' },{ name: 'Save document metadata and generate the URL to upload the file', value: 'product/CreateDocumentModel' },{ name: 'Save document metadata and generate the URL to upload the file', value: 'deal/CreateDocumentModel' },{ name: 'Generate URL to upload the new document file', value: 'UpdateFile' },{ name: 'Update document model access layers', value: 'UpdateDocumentAccessLayers' },{ name: 'Update document model access layers', value: 'product/UpdateDocumentAccessLayers' },{ name: 'Update document model access layers', value: 'deal/UpdateDocumentAccessLayers' },{ name: 'Save document metadata and generate the URL to upload the file for multiple Document Requirements', value: 'CreateDocumentModelMultipleRequirements' },{ name: 'Save document metadata and generate the URL to upload the file for multiple Document Requirements', value: 'product/CreateDocumentModelMultipleRequirements' },{ name: 'Save document metadata and generate the URL to upload the file for multiple Document Requirements', value: 'deal/CreateDocumentModelMultipleRequirements' },{ name: 'Clones Document Model which references Original Physical File', value: 'CloneDocumentModel' },{ name: 'Clones Document Model which references Original Physical File', value: 'product/CloneDocumentModel' },{ name: 'Clones Document Model which references Original Physical File', value: 'deal/CloneDocumentModel' },{ name: 'Update Document Model Status to "Error"', value: 'UpdateDocumentModelStatusError' },{ name: 'Update Document Model Status to "Error"', value: 'product/UpdateDocumentModelStatusError' },{ name: 'Update Document Model Status to "Error"', value: 'deal/UpdateDocumentModelStatusError' },{ name: 'Update Document Model Status to "Error" with custom error code and message', value: 'UpdateDocumentModelCustomError' },{ name: 'Update Document Model Status to "Error" with custom error code and message', value: 'product/UpdateDocumentModelCustomError' },{ name: 'Update Document Model Status to "Error" with custom error code and message', value: 'deal/UpdateDocumentModelCustomError' },{ name: 'Updates a document', value: 'UpdateDocument' },{ name: 'Updates a document', value: 'product/UpdateDocument' },{ name: 'Updates a document', value: 'deal/UpdateDocument' },{ name: 'Update the requirements linked to a document', value: 'UpdateRequirementIds' },{ name: 'Update the requirements linked to a document', value: 'product/UpdateRequirementIds' },{ name: 'Update the requirements linked to a document', value: 'deal/UpdateRequirementIds' },{ name: 'Update the requirement datakey linked to a document', value: 'UpdateDataKey' },{ name: 'Update the requirement datakey linked to a document', value: 'product/UpdateDataKey' },{ name: 'Update the requirement datakey linked to a document', value: 'deal/UpdateDataKey' },{ name: 'Updates an existing DocumentRequirement', value: 'UpdateDocumentRequirement' },{ name: 'Updates an existing DocumentRequirement', value: 'product/UpdateDocumentRequirement' },{ name: 'Updates an existing DocumentRequirement', value: 'deal/UpdateDocumentRequirement' },{ name: 'Creates a new DocumentRequirement.', value: 'CreateDocumentRequirement' },{ name: 'Creates a new DocumentRequirement.', value: 'product/CreateDocumentRequirement' },{ name: 'Creates a new DocumentRequirement.', value: 'deal/CreateDocumentRequirement' },{ name: 'Sends a request with documents to external provider for eSignature.', value: 'SendDocumentsForSignature' },{ name: 'Save Provider status', value: 'SaveProviderStatus' },{ name: 'Save Configuration', value: 'SaveProviderConfiguration' },{ name: 'Creates a new eSignatureDocumentRequirement.', value: 'CreateESignatureDocumentRequirement' },{ name: 'Updates an existing eSignatureDocumentRequirement', value: 'UpdateESignatureDocumentRequirement' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaDocumentManagementCommandv20',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocumentSetVersionByVersionNumber' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to be cloned', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocumentSetVersionByVersionNumber' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'SubmitForApprovalAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to submit', displayOptions: { show: { endpoint: [ 'SubmitForApprovalAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'SignAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to sign', displayOptions: { show: { endpoint: [ 'SignAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'ArchiveAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to archive', displayOptions: { show: { endpoint: [ 'ArchiveAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number where the acceptable document will be added', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Acceptable document set id', displayOptions: { show: { endpoint: [ 'UpdateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number where the acceptable document to be updated lives', displayOptions: { show: { endpoint: [ 'UpdateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The id of the existing model', displayOptions: { show: { endpoint: [ 'UpdateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'UpdateDocumentAccessLayers' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'product/UpdateDocumentAccessLayers' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'deal/UpdateDocumentAccessLayers' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'CloneDocumentModel' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'product/CloneDocumentModel' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'deal/CloneDocumentModel' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'UpdateDocumentModelStatusError' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'product/UpdateDocumentModelStatusError' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'deal/UpdateDocumentModelStatusError' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'UpdateDocumentModelCustomError' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'product/UpdateDocumentModelCustomError' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Document model id', displayOptions: { show: { endpoint: [ 'deal/UpdateDocumentModelCustomError' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'product/UpdateDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'deal/UpdateDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateRequirementIds' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'product/UpdateRequirementIds' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'deal/UpdateRequirementIds' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateDataKey' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'product/UpdateDataKey' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'deal/UpdateDataKey' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'product/UpdateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'deal/UpdateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'SaveProviderStatus' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'SaveProviderConfiguration' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model to update', displayOptions: { show: { endpoint: [ 'UpdateESignatureDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "setId": "setId", "acceptableDocuments": [ { "type": "type", "description": "description", "dataKey": "dataKey" } ], "notes": "notes" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "comment": "comment", "decision": "Approve", "created": "2023-11-07T11:29:16.2432648+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SignAcceptableDocumentSetVersion' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "type": "type", "description": "description", "dataKey": "dataKey" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "type": "type", "description": "description", "dataKey": "dataKey" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateAcceptableDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "fileName": "fileName", "entityId": "entityId", "journeyId": "journeyId", "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirementIds": [ "" ], "documentDataKey": "documentDataKey", "isDocumentForESignature": false, "comesFromESignatureProvider": false, "properties": {}, "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "policyEnforcedAccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "autoClassify": false, "metadata": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateDocumentModel' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "fileName": "fileName", "entityId": "entityId", "journeyId": "journeyId", "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirementIds": [ "" ], "documentDataKey": "documentDataKey", "isDocumentForESignature": false, "comesFromESignatureProvider": false, "properties": {}, "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "policyEnforcedAccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "autoClassify": false, "metadata": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'product/CreateDocumentModel' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "fileName": "fileName", "entityId": "entityId", "journeyId": "journeyId", "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirementIds": [ "" ], "documentDataKey": "documentDataKey", "isDocumentForESignature": false, "comesFromESignatureProvider": false, "properties": {}, "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "policyEnforcedAccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "autoClassify": false, "metadata": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'deal/CreateDocumentModel' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "fileName": "fileName" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateFile' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDocumentAccessLayers' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'product/UpdateDocumentAccessLayers' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'deal/UpdateDocumentAccessLayers' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "fileName": "fileName", "entityId": "entityId", "journeyId": "journeyId", "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirements": [ { "Id": "Id", "DocumentDataKey": "DocumentDataKey", "Name": "Name", "IsMandatory": false, "DocumentAccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "requirementModelId": "requirementModelId" } ], "isDocumentForESignature": false, "comesFromESignatureProvider": false, "properties": {}, "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "policyEnforcedAccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateDocumentModelMultipleRequirements' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "fileName": "fileName", "entityId": "entityId", "journeyId": "journeyId", "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirements": [ { "Id": "Id", "DocumentDataKey": "DocumentDataKey", "Name": "Name", "IsMandatory": false, "DocumentAccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "requirementModelId": "requirementModelId" } ], "isDocumentForESignature": false, "comesFromESignatureProvider": false, "properties": {}, "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "policyEnforcedAccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'product/CreateDocumentModelMultipleRequirements' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "fileName": "fileName", "entityId": "entityId", "journeyId": "journeyId", "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirements": [ { "Id": "Id", "DocumentDataKey": "DocumentDataKey", "Name": "Name", "IsMandatory": false, "DocumentAccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "requirementModelId": "requirementModelId" } ], "isDocumentForESignature": false, "comesFromESignatureProvider": false, "properties": {}, "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "policyEnforcedAccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'deal/CreateDocumentModelMultipleRequirements' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "Id": "Id", "DocumentDataKey": "DocumentDataKey", "EntityId": "EntityId", "JourneyId": "JourneyId", "DocumentRequirementIds": [ "" ], "AccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "requirementModelId": "requirementModelId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CloneDocumentModel' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "Id": "Id", "DocumentDataKey": "DocumentDataKey", "EntityId": "EntityId", "JourneyId": "JourneyId", "DocumentRequirementIds": [ "" ], "AccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "requirementModelId": "requirementModelId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'product/CloneDocumentModel' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "Id": "Id", "DocumentDataKey": "DocumentDataKey", "EntityId": "EntityId", "JourneyId": "JourneyId", "DocumentRequirementIds": [ "" ], "AccessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "requirementModelId": "requirementModelId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'deal/CloneDocumentModel' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "errorCode": "errorCode", "errorMessage": "errorMessage" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDocumentModelCustomError' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "errorCode": "errorCode", "errorMessage": "errorMessage" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'product/UpdateDocumentModelCustomError' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "errorCode": "errorCode", "errorMessage": "errorMessage" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'deal/UpdateDocumentModelCustomError' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirementIds": [ "" ], "documentDataKey": "documentDataKey", "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirementIds": [ "" ], "documentDataKey": "documentDataKey", "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'product/UpdateDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "documentType": "documentType", "friendlyName": "friendlyName", "documentRequirementIds": [ "" ], "documentDataKey": "documentDataKey", "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'deal/UpdateDocument' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '[ "" ]', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateRequirementIds' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '[ "" ]', description: 'Request body', displayOptions: { show: { endpoint: [ 'product/UpdateRequirementIds' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '[ "" ]', description: 'Request body', displayOptions: { show: { endpoint: [ 'deal/UpdateRequirementIds' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.2439972+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.2440132+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'product/UpdateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.2440288+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'deal/UpdateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "requirementId": "requirementId", "requirementName": "requirementName", "documentDataKey": "documentDataKey", "isMandatory": false, "journeyId": "journeyId", "entityId": "entityId", "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.2440535+00:00", "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "requirementId": "requirementId", "requirementName": "requirementName", "documentDataKey": "documentDataKey", "isMandatory": false, "journeyId": "journeyId", "entityId": "entityId", "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.2440892+00:00", "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'product/CreateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "requirementId": "requirementId", "requirementName": "requirementName", "documentDataKey": "documentDataKey", "isMandatory": false, "journeyId": "journeyId", "entityId": "entityId", "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.2441188+00:00", "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'deal/CreateDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "taskId": "taskId", "entityId": "entityId", "journeyId": "journeyId", "entityName": "entityName", "providerName": "providerName", "documentRequirementsIds": [ "" ], "signers": [ { "signerType": "signerType", "fullName": "fullName", "email": "email", "relationship": "relationship", "hasSigned": false, "order": 0 } ], "isDraft": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SendDocumentsForSignature' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": false }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SaveProviderStatus' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "configuration": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SaveProviderConfiguration' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "requirementId": "requirementId", "requirementName": "requirementName", "documentDataKey": "documentDataKey", "isMandatory": false, "journeyId": "journeyId", "entityId": "entityId", "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.2442189+00:00", "accessLayers": { "geographic": [ "" ], "businessRelated": [ "" ] }, "properties": {}, "envelopeId": "envelopeId", "dateSent": "2023-11-07T11:29:16.2442342+00:00", "lastNotificationDate": "2023-11-07T11:29:16.2442354+00:00", "signers": [ { "signerType": "signerType", "fullName": "fullName", "email": "email", "relationship": "relationship", "hasSigned": false, "order": 0 } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateESignatureDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "status": "status", "comment": "comment", "deferUntil": "2023-11-07T11:29:16.2442687+00:00", "envelopeId": "envelopeId", "dateSent": "2023-11-07T11:29:16.2442712+00:00", "lastNotificationDate": "2023-11-07T11:29:16.2442725+00:00", "signers": [ { "signerType": "signerType", "fullName": "fullName", "email": "email", "relationship": "relationship", "hasSigned": false, "order": 0 } ], "doNotOverrideESignature": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateESignatureDocumentRequirement' ], domain: [ 'FenergoNebulaDocumentManagementCommandv20' ] } } }
];

async function ExecuteFenergoNebulaDocumentManagementCommandv20(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/acceptabledocument/set';

break;
case 'CreateAcceptableDocumentSetVersionByVersionNumber': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/acceptabledocument/set/{setId}/version/{versionNumber}'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

break;
case 'CreateAcceptableDocumentSetVersion': setId = base.getNodeParameter('setId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/acceptabledocument/set/{setId}'.replace('{setId}', setId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SubmitForApprovalAcceptableDocumentSetVersion': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/acceptabledocument/set/{setId}/version/{versionNumber}/submit-for-approval'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

break;
case 'SignAcceptableDocumentSetVersion': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/acceptabledocument/set/{setId}/version/{versionNumber}/sign'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'ArchiveAcceptableDocumentSetVersion': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/acceptabledocument/set/{setId}/version/{versionNumber}/archive'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

break;
case 'CreateAcceptableDocument': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/acceptabledocument/set/{setId}/version/{versionNumber}/acceptableDocument'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateAcceptableDocument': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/acceptabledocument/set/{setId}/version/{versionNumber}/acceptableDocument/{id}'.replace('{setId}', setId).replace('{versionNumber}', versionNumber).replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateDocumentModel': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'product/CreateDocumentModel': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/product/CreateDocumentModel';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'deal/CreateDocumentModel': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/deal/CreateDocumentModel';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateFile': 
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/updateFile';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDocumentAccessLayers': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/{id}/access-layers'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'product/UpdateDocumentAccessLayers': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/product/{id}/access-layers'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'deal/UpdateDocumentAccessLayers': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/deal/{id}/access-layers'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateDocumentModelMultipleRequirements': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/CreateDocumentModelMultipleRequirements';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'product/CreateDocumentModelMultipleRequirements': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/product/CreateDocumentModelMultipleRequirements';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'deal/CreateDocumentModelMultipleRequirements': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/deal/CreateDocumentModelMultipleRequirements';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CloneDocumentModel': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/{id}/clone'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'product/CloneDocumentModel': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/product/{id}/clone'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'deal/CloneDocumentModel': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/deal/{id}/clone'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDocumentModelStatusError': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/error/{id}'.replace('{id}', id);

break;
case 'product/UpdateDocumentModelStatusError': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/product/error/{id}'.replace('{id}', id);

break;
case 'deal/UpdateDocumentModelStatusError': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/deal/error/{id}'.replace('{id}', id);

break;
case 'UpdateDocumentModelCustomError': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/custom-error/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'product/UpdateDocumentModelCustomError': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/product/custom-error/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'deal/UpdateDocumentModelCustomError': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/deal/custom-error/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDocument': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'product/UpdateDocument': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/product/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'deal/UpdateDocument': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/deal/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateRequirementIds': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/{id}/requirement-ids'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'product/UpdateRequirementIds': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/product/{id}/requirement-ids'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'deal/UpdateRequirementIds': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/deal/{id}/requirement-ids'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDataKey': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/{id}/datakey'.replace('{id}', id);

break;
case 'product/UpdateDataKey': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/product/{id}/datakey'.replace('{id}', id);

break;
case 'deal/UpdateDataKey': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentmanagement/deal/{id}/datakey'.replace('{id}', id);

break;
case 'UpdateDocumentRequirement': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentrequirement/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'product/UpdateDocumentRequirement': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentrequirement/product/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'deal/UpdateDocumentRequirement': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentrequirement/deal/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateDocumentRequirement': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentrequirement';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'product/CreateDocumentRequirement': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentrequirement/product/CreateDocumentRequirement';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'deal/CreateDocumentRequirement': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/documentrequirement/deal/CreateDocumentRequirement';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SendDocumentsForSignature': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/esignature';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SaveProviderStatus': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/esignatureconfiguration/provider/{providerId}/status'.replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SaveProviderConfiguration': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/esignatureconfiguration/provider/{providerId}/configuration'.replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateESignatureDocumentRequirement': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/esignaturedocumentrequirement';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateESignatureDocumentRequirement': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/documentmanagementcommand/api/v2/esignaturedocumentrequirement/{id}'.replace('{id}', id);

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
    FenergoNebulaDocumentManagementCommandv20Properties,
    ExecuteFenergoNebulaDocumentManagementCommandv20
}
