import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXAPAC.node';

let FenergoNebulaDealsCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create a Deal Draft', value: 'CreateDealDraft' },{ name: 'Update deal draft', value: 'UpdateDealDraft' },{ name: 'Validate and Update deal draft', value: 'ValidateAndUpdateDealDraft' },{ name: 'Create a Deal', value: 'CreateDeal' },{ name: 'Deletes a deal', value: 'DeleteDeal' },{ name: 'Create requirement set', value: 'CreateRequirementSet' },{ name: 'Update requirement set version', value: 'UpdateRequirementSetVersion' },{ name: 'Submit requirement set version for approval', value: 'SubmitRequirementSetVersion' },{ name: 'Sign requirement set version', value: 'SignRequirementSetVersion' },{ name: 'Delete requirement set', value: 'DeleteRequirementSet' },{ name: 'Create requirement set version from provided version number', value: 'CreateRequirementSetVersionDraft' },{ name: 'Archive a Deal Requirement Set Version', value: 'ArchiveRequirementSetVersion' },{ name: 'Add deal requirement', value: 'AddRequirement' },{ name: 'Update a deal requirement', value: 'UpdateRequirement' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaDealsCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'dealId', name: 'dealId', type: 'string', required: true, default: '', description: 'Deal id', displayOptions: { show: { endpoint: [ 'CreateDealDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'dealId', name: 'dealId', type: 'string', required: true, default: '', description: 'Deal id', displayOptions: { show: { endpoint: [ 'UpdateDealDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'draftId', name: 'draftId', type: 'string', required: true, default: '', description: 'Deal draft id', displayOptions: { show: { endpoint: [ 'UpdateDealDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'dealId', name: 'dealId', type: 'string', required: true, default: '', description: 'Deal id', displayOptions: { show: { endpoint: [ 'ValidateAndUpdateDealDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'draftId', name: 'draftId', type: 'string', required: true, default: '', description: 'Deal draft id', displayOptions: { show: { endpoint: [ 'ValidateAndUpdateDealDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the deal', displayOptions: { show: { endpoint: [ 'DeleteDeal' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'requirementSetId', name: 'requirementSetId', type: 'string', required: true, default: '', description: 'Requirement set id', displayOptions: { show: { endpoint: [ 'UpdateRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to update', displayOptions: { show: { endpoint: [ 'UpdateRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'requirementSetId', name: 'requirementSetId', type: 'string', required: true, default: '', description: 'Requirement Set Id', displayOptions: { show: { endpoint: [ 'SubmitRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to submit', displayOptions: { show: { endpoint: [ 'SubmitRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'requirementSetId', name: 'requirementSetId', type: 'string', required: true, default: '', description: 'Requirement Set Id', displayOptions: { show: { endpoint: [ 'SignRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to sign', displayOptions: { show: { endpoint: [ 'SignRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'requirementSetId', name: 'requirementSetId', type: 'string', required: true, default: '', description: 'Requirement Set Id', displayOptions: { show: { endpoint: [ 'DeleteRequirementSet' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'requirementSetId', name: 'requirementSetId', type: 'string', required: true, default: '', description: 'Requirement set id', displayOptions: { show: { endpoint: [ 'CreateRequirementSetVersionDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number from which new draft will be created', displayOptions: { show: { endpoint: [ 'CreateRequirementSetVersionDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'requirementSetId', name: 'requirementSetId', type: 'string', required: true, default: '', description: 'Requirement Set Id', displayOptions: { show: { endpoint: [ 'ArchiveRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to archive', displayOptions: { show: { endpoint: [ 'ArchiveRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'requirementSetId', name: 'requirementSetId', type: 'string', required: true, default: '', description: 'Deal requirement set id', displayOptions: { show: { endpoint: [ 'AddRequirement' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Deal requirement set version number', displayOptions: { show: { endpoint: [ 'AddRequirement' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'requirementSetId', name: 'requirementSetId', type: 'string', required: true, default: '', description: 'Requirement Set id', displayOptions: { show: { endpoint: [ 'UpdateRequirement' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version Number', displayOptions: { show: { endpoint: [ 'UpdateRequirement' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'requirementId', name: 'requirementId', type: 'string', required: true, default: '', description: 'Requirement Id', displayOptions: { show: { endpoint: [ 'UpdateRequirement' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "journeyId": "journeyId", "properties": {}, "categoriesInScope": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateDealDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "journeyId": "journeyId", "properties": {}, "categoriesInScope": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDealDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "journeyId": "journeyId", "properties": {}, "categoriesInScope": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'ValidateAndUpdateDealDraft' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "entityId": "entityId", "journeyId": "journeyId", "requirementSetId": "requirementSetId", "properties": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateDeal' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "name": "name", "effectiveFrom": "2023-11-17T13:26:06.0853131+00:00", "notes": "notes" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateRequirementSet' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "name": "name", "effectiveFrom": "2023-11-17T13:26:06.0853329+00:00", "notes": "notes" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "comment": "comment", "decision": "Approve", "created": "2023-11-17T13:26:06.0853621+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SignRequirementSetVersion' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "category": "category", "description": "description", "name": "name", "classification": "classification", "tags": [ "" ], "type": "type", "dataField": { "propertyName": "propertyName", "propertyType": "propertyType", "propertyTypeId": "propertyTypeId", "linkChildFieldPropertyName": "linkChildFieldPropertyName" }, "validationRule": { "propertyName": "propertyName", "friendlyName": "friendlyName", "validationType": "validationType", "validationData": { "isMandatory": { "active": false, "message": "message" }, "specialCharacters": { "excludedCharacters": [ "" ], "active": false, "message": "message" }, "noNumbers": { "active": false, "message": "message" }, "onlyInteger": { "active": false, "message": "message" }, "noNegative": { "active": false, "message": "message" }, "onlyDecimal": { "active": false, "message": "message" }, "regex": { "isCaseSensitive": false, "regexValue": "regexValue", "active": false, "message": "message" }, "characterLimit": { "minValue": 0, "maxValue": 0, "active": false, "message": "message" }, "numberLimit": { "minValue": 0, "maxValue": 0, "active": false, "message": "message" }, "noFutureDates": { "active": false, "message": "message" }, "noPastDates": { "active": false, "message": "message" }, "dateLimit": { "minDate": "2023-11-17T13:26:06.0855171+00:00", "maxDate": "2023-11-17T13:26:06.0855193+00:00", "active": false, "message": "message" }, "multiSelectLimit": { "minValue": 0, "maxValue": 0, "active": false, "message": "message" }, "collectionMinimumCount": { "requiredTypesMinCount": {}, "overallMinimumCount": 0, "active": false, "message": "message" }, "collectionMaximumCount": { "requiredTypesMaxCount": {}, "overallMaximumCount": 0, "active": false, "message": "message" } } }, "order": 0.0, "defaultValue": "defaultValue", "isSecondaryIdentifier": false, "secondaryIdentifierOrder": 0.0, "isReadOnly": false, "conditions": [ { "id": "id", "name": "name", "description": "description", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [] } ] } ] } ] } ], "conditionalValues": [ { "id": "id", "name": "name", "description": "description", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [] } ] } ] } ], "value": "value", "priority": 0 } ], "documentDescription": "documentDescription", "documentDataKey": "documentDataKey", "isMandatory": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'AddRequirement' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "category": "category", "description": "description", "name": "name", "classification": "classification", "tags": [ "" ], "type": "type", "dataField": { "propertyName": "propertyName", "propertyType": "propertyType", "propertyTypeId": "propertyTypeId", "linkChildFieldPropertyName": "linkChildFieldPropertyName" }, "validationRule": { "propertyName": "propertyName", "friendlyName": "friendlyName", "validationType": "validationType", "validationData": { "isMandatory": { "active": false, "message": "message" }, "specialCharacters": { "excludedCharacters": [ "" ], "active": false, "message": "message" }, "noNumbers": { "active": false, "message": "message" }, "onlyInteger": { "active": false, "message": "message" }, "noNegative": { "active": false, "message": "message" }, "onlyDecimal": { "active": false, "message": "message" }, "regex": { "isCaseSensitive": false, "regexValue": "regexValue", "active": false, "message": "message" }, "characterLimit": { "minValue": 0, "maxValue": 0, "active": false, "message": "message" }, "numberLimit": { "minValue": 0, "maxValue": 0, "active": false, "message": "message" }, "noFutureDates": { "active": false, "message": "message" }, "noPastDates": { "active": false, "message": "message" }, "dateLimit": { "minDate": "2023-11-17T13:26:06.0858282+00:00", "maxDate": "2023-11-17T13:26:06.0858302+00:00", "active": false, "message": "message" }, "multiSelectLimit": { "minValue": 0, "maxValue": 0, "active": false, "message": "message" }, "collectionMinimumCount": { "requiredTypesMinCount": {}, "overallMinimumCount": 0, "active": false, "message": "message" }, "collectionMaximumCount": { "requiredTypesMaxCount": {}, "overallMaximumCount": 0, "active": false, "message": "message" } } }, "order": 0.0, "defaultValue": "defaultValue", "isSecondaryIdentifier": false, "secondaryIdentifierOrder": 0.0, "isReadOnly": false, "conditions": [ { "id": "id", "name": "name", "description": "description", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [] } ] } ] } ] } ], "conditionalValues": [ { "id": "id", "name": "name", "description": "description", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [] } ] } ] } ], "value": "value", "priority": 0 } ], "documentDescription": "documentDescription", "documentDataKey": "documentDataKey", "isMandatory": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateRequirement' ], domain: [ 'FenergoNebulaDealsCommandv10' ] } } }
];

async function ExecuteFenergoNebulaDealsCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let dealId=''; let draftId=''; let id=''; let requirementSetId=''; let versionNumber=''; let requirementId='';
switch(endpoint){ case 'CreateDealDraft': dealId = base.getNodeParameter('dealId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/deals/{dealId}/drafts'.replace('{dealId}', dealId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDealDraft': dealId = base.getNodeParameter('dealId', 0) as string;
draftId = base.getNodeParameter('draftId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/deals/{dealId}/drafts/{draftId}'.replace('{dealId}', dealId).replace('{draftId}', draftId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'ValidateAndUpdateDealDraft': dealId = base.getNodeParameter('dealId', 0) as string;
draftId = base.getNodeParameter('draftId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/deals/{dealId}/drafts/{draftId}/complete'.replace('{dealId}', dealId).replace('{draftId}', draftId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateDeal': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/deals';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteDeal': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/deals/{id}'.replace('{id}', id);

break;
case 'CreateRequirementSet': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/requirement-set';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateRequirementSetVersion': requirementSetId = base.getNodeParameter('requirementSetId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/requirement-set/{requirementSetId}/version/{versionNumber}'.replace('{requirementSetId}', requirementSetId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SubmitRequirementSetVersion': requirementSetId = base.getNodeParameter('requirementSetId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/requirement-set/{requirementSetId}/version/{versionNumber}/submit-for-approval'.replace('{requirementSetId}', requirementSetId).replace('{versionNumber}', versionNumber);

break;
case 'SignRequirementSetVersion': requirementSetId = base.getNodeParameter('requirementSetId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/requirement-set/{requirementSetId}/version/{versionNumber}/sign'.replace('{requirementSetId}', requirementSetId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteRequirementSet': requirementSetId = base.getNodeParameter('requirementSetId', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/requirement-set/{requirementSetId}'.replace('{requirementSetId}', requirementSetId);

break;
case 'CreateRequirementSetVersionDraft': requirementSetId = base.getNodeParameter('requirementSetId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/requirement-set/{requirementSetId}/version/{versionNumber}/draft'.replace('{requirementSetId}', requirementSetId).replace('{versionNumber}', versionNumber);

break;
case 'ArchiveRequirementSetVersion': requirementSetId = base.getNodeParameter('requirementSetId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/requirement-set/{requirementSetId}/version/{versionNumber}/archive'.replace('{requirementSetId}', requirementSetId).replace('{versionNumber}', versionNumber);

break;
case 'AddRequirement': requirementSetId = base.getNodeParameter('requirementSetId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/requirement-set/{requirementSetId}/version/{versionNumber}/field'.replace('{requirementSetId}', requirementSetId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateRequirement': requirementSetId = base.getNodeParameter('requirementSetId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requirementId = base.getNodeParameter('requirementId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/dealscommand/api/requirement-set/{requirementSetId}/version/{versionNumber}/field/{requirementId}'.replace('{requirementSetId}', requirementSetId).replace('{versionNumber}', versionNumber).replace('{requirementId}', requirementId);

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
    FenergoNebulaDealsCommandv10Properties,
    ExecuteFenergoNebulaDealsCommandv10
}
