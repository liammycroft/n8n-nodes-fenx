import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaLookupCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create a new Lookup using values as the source of truth', value: 'CreateLookup' },{ name: 'Create a new Lookup using items as the source of truth', value: 'CreateLookupItems' },{ name: 'Update Lookups Settings.', value: 'UpdateLookup' },{ name: 'Delete Lookup and all it"s versions', value: 'DeleteLookup' },{ name: 'Create a new Version for an existing Lookup using Values as the source of truth', value: 'CreateLookupVersion' },{ name: 'Bulk Delete Lookups', value: 'BulkDeleteLookup' },{ name: 'Create a new Version for an existing Lookup using Items as the source of truth', value: 'CreateLookupVersionItems' },{ name: 'Updates an existing Version of a Lookup using Values as the source of truth', value: 'UpdateLookupVersion' },{ name: 'Delete an existing Version of a Lookup', value: 'DeleteLookupVersion' },{ name: 'Updates an existing Version of a Lookup using the items as the source of truth', value: 'UpdateLookupVersionItems' },{ name: 'Submit an existing Version of a Lookup for Approval', value: 'SubmitLookupVersion' },{ name: 'Sign an existing Version of a Lookup', value: 'SignLookupVersion' },{ name: 'Archive an existing Version of a Lookup', value: 'ArchiveLookupVersion' },{ name: 'Import a CSV to update an existing Draft Version of a Lookup', value: 'ImportLookupCsvFile' },{ name: 'Creates a parent child relationship between two lookups', value: 'CreateLookupLink' },{ name: 'Create a new version for an existing Linked lookup', value: 'CreateLookupLinkVersion' },{ name: 'Delete Lookup Link and all it"s versions', value: 'DeleteLookupLink' },{ name: 'Update an existing Version of a Linked lookup', value: 'UpdateLookupLinkVersion' },{ name: 'Delete an existing Version of a Linked Lookup', value: 'DeleteLookupLinkVersion' },{ name: 'Submit an existing Version of a Linked Lookup for Approval', value: 'SubmitLookupLinkVersion' },{ name: 'Sign an existing Version of a Linked Link', value: 'SignLookupLinkVersion' },{ name: 'Archive an existing Version of a Linked Lookup', value: 'ArchiveLookupLinkVersion' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaLookupCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'UpdateLookup' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'Lookup Id', displayOptions: { show: { endpoint: [ 'DeleteLookup' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'CreateLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'CreateLookupVersionItems' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'UpdateLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Number of version to update', displayOptions: { show: { endpoint: [ 'UpdateLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'Lookup Id', displayOptions: { show: { endpoint: [ 'DeleteLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Version number to delete', displayOptions: { show: { endpoint: [ 'DeleteLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'UpdateLookupVersionItems' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Number of version to update', displayOptions: { show: { endpoint: [ 'UpdateLookupVersionItems' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'SubmitLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number of the version to submit', displayOptions: { show: { endpoint: [ 'SubmitLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'SignLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number of the version to sign', displayOptions: { show: { endpoint: [ 'SignLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'ArchiveLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number of the version to archive', displayOptions: { show: { endpoint: [ 'ArchiveLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'ImportLookupCsvFile' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'ImportLookupCsvFile' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing Linked Lookup', displayOptions: { show: { endpoint: [ 'CreateLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing Linked Lookup', displayOptions: { show: { endpoint: [ 'DeleteLookupLink' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing Linked Lookup', displayOptions: { show: { endpoint: [ 'UpdateLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Number of version to update', displayOptions: { show: { endpoint: [ 'UpdateLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'DeleteLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'DeleteLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing Linked Lookup', displayOptions: { show: { endpoint: [ 'SubmitLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number of the version to submit', displayOptions: { show: { endpoint: [ 'SubmitLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing Linked Link', displayOptions: { show: { endpoint: [ 'SignLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number of the version to sign', displayOptions: { show: { endpoint: [ 'SignLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing Linked Lookup', displayOptions: { show: { endpoint: [ 'ArchiveLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number of the version to archive', displayOptions: { show: { endpoint: [ 'ArchiveLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookupId": "lookupId", "lookupName": "lookupName", "values": [ "" ], "items": [ { "id": "id", "value": "value" } ], "columns": [ { "type": "type", "name": "name", "values": {} } ], "versionNumber": 0, "notes": "notes", "effectiveFrom": "2024-03-06T11:17:03.8297771+00:00", "created": "2024-03-06T11:17:03.8297796+00:00", "status": "Draft", "isSystemLookup": false, "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8298086+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8298159+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8298221+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8298287+00:00" }, "hasProcessedRequest": false } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateLookup' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookupId": "lookupId", "lookupName": "lookupName", "items": [ { "id": "id", "value": "value" } ], "columns": [ { "type": "type", "name": "name", "values": {} } ], "versionNumber": 0, "notes": "notes", "effectiveFrom": "2024-03-06T11:17:03.8298932+00:00", "created": "2024-03-06T11:17:03.8298945+00:00", "status": "Draft", "isSystemLookup": false, "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8299130+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8299198+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8299262+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8299321+00:00" }, "hasProcessedRequest": false } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateLookupItems' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "isSystemLookup": false }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateLookup' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookupId": "lookupId", "lookupName": "lookupName", "values": [ "" ], "items": [ { "id": "id", "value": "value" } ], "columns": [ { "type": "type", "name": "name", "values": {} } ], "versionNumber": 0, "notes": "notes", "effectiveFrom": "2024-03-06T11:17:03.8299969+00:00", "created": "2024-03-06T11:17:03.8299986+00:00", "status": "Draft", "isSystemLookup": false, "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8300164+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8300226+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8300291+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8300355+00:00" }, "hasProcessedRequest": false } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "ids": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'BulkDeleteLookup' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookupId": "lookupId", "lookupName": "lookupName", "items": [ { "id": "id", "value": "value" } ], "columns": [ { "type": "type", "name": "name", "values": {} } ], "versionNumber": 0, "notes": "notes", "effectiveFrom": "2024-03-06T11:17:03.8300864+00:00", "created": "2024-03-06T11:17:03.8300875+00:00", "status": "Draft", "isSystemLookup": false, "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8301102+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8301165+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8301229+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8301294+00:00" }, "hasProcessedRequest": false } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateLookupVersionItems' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookupId": "lookupId", "lookupName": "lookupName", "values": [ "" ], "items": [ { "id": "id", "value": "value" } ], "versionNumber": 0, "notes": "notes", "effectiveFrom": "2024-03-06T11:17:03.8301674+00:00", "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8301828+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8301895+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8301955+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8302018+00:00" }, "hasProcessedRequest": false } ], "columns": [ { "type": "type", "name": "name", "values": {} } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookupId": "lookupId", "lookupName": "lookupName", "items": [ { "id": "id", "value": "value" } ], "versionNumber": 0, "notes": "notes", "effectiveFrom": "2024-03-06T11:17:03.8302552+00:00", "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8302704+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8302772+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8302836+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8302896+00:00" }, "hasProcessedRequest": false } ], "columns": [ { "type": "type", "name": "name", "values": {} } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateLookupVersionItems' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8303301+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SignLookupVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "name": "name", "parentLookupId": "parentLookupId", "parentLookupVersion": 0, "childLookupId": "childLookupId", "childLookupVersion": 0, "properties": {}, "effectiveFrom": "2024-03-06T11:17:03.8303641+00:00", "notes": "notes" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateLookupLink' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookupLinkId": "lookupLinkId", "name": "name", "parentLookupId": "parentLookupId", "parentLookupVersion": 0, "childLookupId": "childLookupId", "childLookupVersion": 0, "versionNumber": 0, "notes": "notes", "properties": {}, "effectiveFrom": "2024-03-06T11:17:03.8303957+00:00", "created": "2024-03-06T11:17:03.8303969+00:00", "status": "Draft", "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8304137+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8304200+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8304265+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8304329+00:00" }, "hasProcessedRequest": false } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookupLinkId": "lookupLinkId", "name": "name", "parentLookupId": "parentLookupId", "parentLookupVersion": 0, "childLookupId": "childLookupId", "childLookupVersion": 0, "properties": {}, "versionNumber": 0, "notes": "notes", "effectiveFrom": "2024-03-06T11:17:03.8304744+00:00", "signees": [ { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": { "subject": "subject", "successor": null, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8304892+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8304960+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8305025+00:00" }, "hasProcessedRequest": false }, "action": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8305122+00:00" }, "hasProcessedRequest": false } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "comment": "comment", "decision": "Approve", "created": "2024-03-06T11:17:03.8305492+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SignLookupLinkVersion' ], domain: [ 'FenergoNebulaLookupCommandv10' ] } } }
];

async function ExecuteFenergoNebulaLookupCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let lookupId=''; let versionNumber=''; let id='';
switch(endpoint){ case 'CreateLookup': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateLookupItems': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/items';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateLookup': lookupId = base.getNodeParameter('lookupId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}'.replace('{lookupId}', lookupId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteLookup': lookupId = base.getNodeParameter('lookupId', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}'.replace('{lookupId}', lookupId);

break;
case 'CreateLookupVersion': lookupId = base.getNodeParameter('lookupId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}'.replace('{lookupId}', lookupId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'BulkDeleteLookup': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/bulk-delete';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateLookupVersionItems': lookupId = base.getNodeParameter('lookupId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}/items'.replace('{lookupId}', lookupId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateLookupVersion': lookupId = base.getNodeParameter('lookupId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}/version/{versionNumber}'.replace('{lookupId}', lookupId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteLookupVersion': lookupId = base.getNodeParameter('lookupId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}/version/{versionNumber}'.replace('{lookupId}', lookupId).replace('{versionNumber}', versionNumber);

break;
case 'UpdateLookupVersionItems': lookupId = base.getNodeParameter('lookupId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}/version/{versionNumber}/items'.replace('{lookupId}', lookupId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'SubmitLookupVersion': lookupId = base.getNodeParameter('lookupId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}/version/{versionNumber}/submit-for-approval'.replace('{lookupId}', lookupId).replace('{versionNumber}', versionNumber);

break;
case 'SignLookupVersion': lookupId = base.getNodeParameter('lookupId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}/version/{versionNumber}/sign'.replace('{lookupId}', lookupId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'ArchiveLookupVersion': lookupId = base.getNodeParameter('lookupId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}/version/{versionNumber}/archive'.replace('{lookupId}', lookupId).replace('{versionNumber}', versionNumber);

break;
case 'ImportLookupCsvFile': lookupId = base.getNodeParameter('lookupId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookup/{lookupId}/version/{versionNumber}/file'.replace('{lookupId}', lookupId).replace('{versionNumber}', versionNumber);

break;
case 'CreateLookupLink': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookuplink';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateLookupLinkVersion': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookuplink/{id}'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteLookupLink': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookuplink/{id}'.replace('{id}', id);

break;
case 'UpdateLookupLinkVersion': id = base.getNodeParameter('id', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookuplink/{id}/version/{versionNumber}'.replace('{id}', id).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteLookupLinkVersion': id = base.getNodeParameter('id', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookuplink/{id}/version/{versionNumber}'.replace('{id}', id).replace('{versionNumber}', versionNumber);

break;
case 'SubmitLookupLinkVersion': id = base.getNodeParameter('id', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookuplink/{id}/version/{versionNumber}/submit'.replace('{id}', id).replace('{versionNumber}', versionNumber);

break;
case 'SignLookupLinkVersion': id = base.getNodeParameter('id', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookuplink/{id}/version/{versionNumber}/sign'.replace('{id}', id).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'ArchiveLookupLinkVersion': id = base.getNodeParameter('id', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupcommand/api/lookuplink/{id}/version/{versionNumber}/archive'.replace('{id}', id).replace('{versionNumber}', versionNumber);

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
    FenergoNebulaLookupCommandv10Properties,
    ExecuteFenergoNebulaLookupCommandv10
}
