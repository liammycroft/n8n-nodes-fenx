import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaDataProtectionCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create data protection configuration', value: 'CreateConfiguration' },{ name: 'Update data protection configuration', value: 'UpdateConfiguration' },{ name: 'Delete data deletion process', value: 'DeleteEntityData' },{ name: 'Mark Entity Jurisdiction for deletion', value: 'MarkForDeletion' },{ name: 'Create data deletion process', value: 'CreateDataDeletionProcess' },{ name: 'Update data deletion process', value: 'UpdateDataDeletionProcess' },{ name: 'Create data protection regime', value: 'CreateDataProtectionRegime' },{ name: 'Update data protection regime', value: 'UpdateDataProtectionRegime' },{ name: 'Trigger Data Retention Check', value: 'TriggerDataRetentionCheck' },{ name: 'Create entity check configuration', value: 'CreateEntityCheckConfiguration' },{ name: 'Create entity check configuration version', value: 'CreateEntityCheckConfigurationVersion' },{ name: 'Create entity check configuration version from provided configuration id', value: 'CreateEntityCheckConfigurationVersionFromParentId' },{ name: 'Update entity check configuration version', value: 'UpdateEntityCheckConfigurationVersion' },{ name: 'Clone entity check configuration version', value: 'CloneEntityCheckConfigurationVersion' },{ name: 'Submit entity check configuration version for approval', value: 'SubmitEntityCheckConfigurationVersion' },{ name: 'Sign entity check configuration version', value: 'SignEntityCheckConfigurationVersion' },{ name: 'Archive entity check configuration version', value: 'ArchiveEntityCheckConfigurationVersion' },{ name: 'Creates a new Ongoing Screening Unsubscribe Batch for an Entity and Journey. This batch contains the Legal Entity and it"s associations that currently have Ongoing Screening Enabled.', value: 'CreateUnsubscribeBatch' },{ name: 'Updates an existing Ongoing Screening Unsubscribe Batch with the relevant Legal Entities and Providers which must be disabled from Ongoing Screening', value: 'UpdateUnsubscribeBatchEntities' },{ name: 'Create orphan entity', value: 'CreateOrphanEntity' },{ name: 'Update orphan entity', value: 'UpdateOrphanEntity' },{ name: 'Verify orphan entity', value: 'VerifyOrphanEntity' },{ name: 'Verify orphan entities', value: 'VerifyAllOrphanEnties' },{ name: 'Trigger Orphan Entity Check', value: 'TriggerOrphanEntityCheck' },{ name: 'Trigger deleting expired orphan entities process', value: 'TriggerDeleteExpiredOrphanEntitites' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaDataProtectionCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Data protection configuration id', displayOptions: { show: { endpoint: [ 'UpdateConfiguration' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'Id of the entity marked for deletion', displayOptions: { show: { endpoint: [ 'MarkForDeletion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'Id of the entity for which data deletion process will be launched', displayOptions: { show: { endpoint: [ 'CreateDataDeletionProcess' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'Id of the entity for which data deletion process was launched', displayOptions: { show: { endpoint: [ 'UpdateDataDeletionProcess' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Data deletion process id', displayOptions: { show: { endpoint: [ 'UpdateDataDeletionProcess' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Data protection regime id', displayOptions: { show: { endpoint: [ 'UpdateDataProtectionRegime' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: 'Entity check configuration id', displayOptions: { show: { endpoint: [ 'CreateEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: 'Entity check configuration id', displayOptions: { show: { endpoint: [ 'CreateEntityCheckConfigurationVersionFromParentId' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to create new draft from', displayOptions: { show: { endpoint: [ 'CreateEntityCheckConfigurationVersionFromParentId' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: 'Entity check configuration id', displayOptions: { show: { endpoint: [ 'UpdateEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to update', displayOptions: { show: { endpoint: [ 'UpdateEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: 'Entity check configuration id', displayOptions: { show: { endpoint: [ 'CloneEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to clone', displayOptions: { show: { endpoint: [ 'CloneEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: 'Entity check configuration id', displayOptions: { show: { endpoint: [ 'SubmitEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to submit', displayOptions: { show: { endpoint: [ 'SubmitEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: 'Entity check configuration id', displayOptions: { show: { endpoint: [ 'SignEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to sign', displayOptions: { show: { endpoint: [ 'SignEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: 'Entity check configuration id', displayOptions: { show: { endpoint: [ 'ArchiveEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to archive', displayOptions: { show: { endpoint: [ 'ArchiveEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'UpdateUnsubscribeBatchEntities' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'Id of the entity for which orphan entity will be created', displayOptions: { show: { endpoint: [ 'CreateOrphanEntity' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Orhan Entity id', displayOptions: { show: { endpoint: [ 'UpdateOrphanEntity' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'Orhan Entity id', displayOptions: { show: { endpoint: [ 'VerifyOrphanEntity' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'configurationId', name: 'configurationId', type: 'string', required: true, default: '', description: 'Configuration id', displayOptions: { show: { endpoint: [ 'TriggerOrphanEntityCheck' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "automaticOffboarding": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateConfiguration' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "automaticOffboarding": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateConfiguration' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "entityId": "entityId", "jurisdictions": [ "" ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'DeleteEntityData' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "jurisdiction": "jurisdiction", "initiatedOn": "2023-11-30T11:31:45.8037421+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'MarkForDeletion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "jurisdiction": "jurisdiction", "initiatedOn": "2023-11-30T11:31:45.8037615+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateDataDeletionProcess' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "initiatedOn": "2023-11-30T11:31:45.8037846+00:00", "dataRetentionPeriod": { "months": 0 } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDataDeletionProcess' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "name": "name", "relatedJurisdiction": "relatedJurisdiction", "dataRetentionPeriod": { "months": 0 } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateDataProtectionRegime' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "name": "name", "relatedJurisdiction": "relatedJurisdiction", "dataRetentionPeriod": { "months": 0 } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateDataProtectionRegime' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "parentId": "parentId", "name": "name", "conditions": [ { "id": "id", "name": "name", "description": "description", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [] } ] } ] } ] } ], "process": { "isEnabled": false, "frequencyCount": 0, "actionType": "actionType", "expiryPeriod": 0 }, "versionNumber": 0, "effectiveFrom": "2023-11-30T11:31:45.8039030+00:00", "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8039228+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8039401+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8039473+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8039548+00:00" }, "hasProcessedRequest": false } ], "notes": "notes", "created": "2023-11-30T11:31:45.8039600+00:00", "status": "Draft", "type": "type" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateEntityCheckConfiguration' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "parentId": "parentId", "name": "name", "conditions": [ { "id": "id", "name": "name", "description": "description", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [] } ] } ] } ] } ], "process": { "isEnabled": false, "frequencyCount": 0, "actionType": "actionType", "expiryPeriod": 0 }, "versionNumber": 0, "effectiveFrom": "2023-11-30T11:31:45.8040594+00:00", "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8040758+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8040835+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8040946+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8041022+00:00" }, "hasProcessedRequest": false } ], "notes": "notes", "created": "2023-11-30T11:31:45.8041064+00:00", "status": "Draft", "type": "type" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "parentId": "parentId", "name": "name", "conditions": [ { "id": "id", "name": "name", "description": "description", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [ { "fieldName": "fieldName", "value": [ "" ], "valueType": "valueType", "dataSource": "dataSource", "operation": "operation", "logicalOperation": "logicalOperation", "operands": [] } ] } ] } ] } ], "process": { "isEnabled": false, "frequencyCount": 0, "actionType": "actionType", "expiryPeriod": 0 }, "versionNumber": 0, "effectiveFrom": "2023-11-30T11:31:45.8043181+00:00", "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8043879+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8044111+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8044519+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8044688+00:00" }, "hasProcessedRequest": false } ], "notes": "notes", "version": -1 } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "name": "name" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CloneEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "comment": "comment", "decision": "Approve", "created": "2023-11-30T11:31:45.8046475+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SignEntityCheckConfigurationVersion' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "entityId": "entityId", "journeyId": "journeyId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateUnsubscribeBatch' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ { "screeningEntityId": "screeningEntityId", "entityId": "entityId", "providerId": "providerId", "status": "status" } ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateUnsubscribeBatchEntities' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "entityCheckVersion": 0, "entityCheckConfigurationId": "entityCheckConfigurationId", "type": "type", "action": "action" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateOrphanEntity' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "action": "action" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateOrphanEntity' ], domain: [ 'FenergoNebulaDataProtectionCommandv10' ] } } }
];

async function ExecuteFenergoNebulaDataProtectionCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let id=''; let entityId=''; let configurationId=''; let versionNumber='';
switch(endpoint){ case 'CreateConfiguration': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/configuration';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateConfiguration': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/configuration/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteEntityData': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/datadeletion/deleteEntityData';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'MarkForDeletion': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/datadeletion/markForDeletion/{entityId}'.replace('{entityId}', entityId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateDataDeletionProcess': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/datadeletionprocess/{entityId}'.replace('{entityId}', entityId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDataDeletionProcess': entityId = base.getNodeParameter('entityId', 0) as string;
id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/datadeletionprocess/{entityId}/{id}'.replace('{entityId}', entityId).replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateDataProtectionRegime': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/regime';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateDataProtectionRegime': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/regime/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'TriggerDataRetentionCheck': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/dataretentioncheck/triggerdataretentioncheck';

break;
case 'CreateEntityCheckConfiguration': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/entitycheckconfiguration';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateEntityCheckConfigurationVersion': configurationId = base.getNodeParameter('configurationId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/entitycheckconfiguration/{configurationId}'.replace('{configurationId}', configurationId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateEntityCheckConfigurationVersionFromParentId': configurationId = base.getNodeParameter('configurationId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/entitycheckconfiguration/{configurationId}/version/{versionNumber}/draft'.replace('{configurationId}', configurationId).replace('{versionNumber}', versionNumber);

break;
case 'UpdateEntityCheckConfigurationVersion': configurationId = base.getNodeParameter('configurationId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/entitycheckconfiguration/{configurationId}/version/{versionNumber}'.replace('{configurationId}', configurationId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CloneEntityCheckConfigurationVersion': configurationId = base.getNodeParameter('configurationId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/entitycheckconfiguration/{configurationId}/version/{versionNumber}/clone'.replace('{configurationId}', configurationId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SubmitEntityCheckConfigurationVersion': configurationId = base.getNodeParameter('configurationId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/entitycheckconfiguration/{configurationId}/version/{versionNumber}/submit-for-approval'.replace('{configurationId}', configurationId).replace('{versionNumber}', versionNumber);

break;
case 'SignEntityCheckConfigurationVersion': configurationId = base.getNodeParameter('configurationId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/entitycheckconfiguration/{configurationId}/version/{versionNumber}/sign'.replace('{configurationId}', configurationId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'ArchiveEntityCheckConfigurationVersion': configurationId = base.getNodeParameter('configurationId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/entitycheckconfiguration/{configurationId}/version/{versionNumber}/archive'.replace('{configurationId}', configurationId).replace('{versionNumber}', versionNumber);

break;
case 'CreateUnsubscribeBatch': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/ongoingscreening';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateUnsubscribeBatchEntities': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/ongoingscreening/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateOrphanEntity': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/orphanentity/{entityId}'.replace('{entityId}', entityId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateOrphanEntity': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/orphanentity/{id}/update'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'VerifyOrphanEntity': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/orphanentity/{entityId}/verify'.replace('{entityId}', entityId);

break;
case 'VerifyAllOrphanEnties': 
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/orphanentity/verifyAll';

break;
case 'TriggerOrphanEntityCheck': configurationId = base.getNodeParameter('configurationId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/orphanentityprocess/{configurationId}/orphanentitycheck'.replace('{configurationId}', configurationId);

break;
case 'TriggerDeleteExpiredOrphanEntitites': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/dataprotectioncommand/api/orphanentityprocess/deleteexpiredorphan';

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
    FenergoNebulaDataProtectionCommandv10Properties,
    ExecuteFenergoNebulaDataProtectionCommandv10
}
