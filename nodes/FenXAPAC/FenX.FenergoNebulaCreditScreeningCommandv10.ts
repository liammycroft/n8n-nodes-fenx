import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXAPAC.node';

let FenergoNebulaCreditScreeningCommandv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Create a new Credit Screening Enquiry', value: 'CreditScreening' },{ name: 'Delete a Credit Screening Enquiry', value: 'DeleteCreditScreening' },{ name: 'Create a new Credit Screening Provider', value: 'CreateCreditScreeningProvider' },{ name: 'Update an existing Credit Screening Provider', value: 'UpdateCreditScreeningProvider' },{ name: 'Update if a provider is Enabled', value: 'UpdateCreditScreeningProviderEnabled' },{ name: 'Create a new Credit Screening Provider Configuration', value: 'CreateCreditScreeningProviderConfiguration' },{ name: 'Create a new Credit Screening Mapping Configuration', value: 'CreateCreditScreeningMappingConfiguration' },{ name: 'Update an existing Credit Screening Mapping Configuration', value: 'UpdateCreditScreeningMappingConfiguration' },{ name: 'Create a new Adapter Schema', value: 'CreateCreditScreeningAdapterShcema' },{ name: 'Update an existing Adapter Schema', value: 'UpdateCreditScreeningAdapterShcema' },{ name: 'Test mock adapter endpoint', value: 'ProviderTest' },{ name: 'Create a new Manual Credit Screening Set', value: 'CreateManualCreditScreeningSet' },{ name: 'Create a new Manual Credit Screening Version for an existing Manual Credit Screening Set', value: 'CreateManualCreditScreeningVersion' },{ name: 'Update a Manual Credit Screening Version', value: 'UpdateManualCreditScreeningVersion' },{ name: 'Update a Manual Credit Screening Version Status to "Completed".', value: 'UpdateManualCreditVersionScreeningStatusToCompleted' },{ name: 'Update a Manual Credit Screening Version Status to "Rejected".', value: 'UpdateManualCreditVersionScreeningStatusToRejected' },{ name: 'Take a snapshot Manual Credit Screening Version', value: 'SnapshotManualCreditScreeningVersion' },{ name: 'Update a batch of manual credit screening version', value: 'UpdateBatch' },{ name: 'Complete a batch of manual credit screening version', value: 'CompleteBatch' },{ name: 'Take a batch of snapshot for manual credit screening version', value: 'BatchSnapshot' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaCreditScreeningCommandv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The request id that needs to be updated', displayOptions: { show: { endpoint: [ 'DeleteCreditScreening' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningProvider' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningProviderEnabled' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'CreateCreditScreeningProviderConfiguration' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'CreateCreditScreeningMappingConfiguration' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'mappingId', name: 'mappingId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningMappingConfiguration' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningMappingConfiguration' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'CreateCreditScreeningAdapterShcema' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningAdapterShcema' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningAdapterShcema' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'ProviderTest' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Manual Credit Screening Set Id', displayOptions: { show: { endpoint: [ 'CreateManualCreditScreeningVersion' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Manual Credit Screening Set Id', displayOptions: { show: { endpoint: [ 'UpdateManualCreditScreeningVersion' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Manual Credit Screening Version Number', displayOptions: { show: { endpoint: [ 'UpdateManualCreditScreeningVersion' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Manual Credit Screening Set Id', displayOptions: { show: { endpoint: [ 'UpdateManualCreditVersionScreeningStatusToCompleted' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Manual Credit Screening Version Number', displayOptions: { show: { endpoint: [ 'UpdateManualCreditVersionScreeningStatusToCompleted' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Manual Credit Screening Set Id', displayOptions: { show: { endpoint: [ 'UpdateManualCreditVersionScreeningStatusToRejected' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Manual Credit Screening Version Number', displayOptions: { show: { endpoint: [ 'UpdateManualCreditVersionScreeningStatusToRejected' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'Manual Credit Screening Set Id', displayOptions: { show: { endpoint: [ 'SnapshotManualCreditScreeningVersion' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "entityId": "entityId", "id": "id", "journeyId": "journeyId", "taskId": "taskId", "taskName": "taskName", "searchCriteria": null, "enquiryResult": { "providerId": "providerId", "providerName": "providerName", "referenceId": "referenceId", "status": "status", "createdOn": "2023-11-30T11:31:45.2866173+00:00", "completedOn": "2023-11-30T11:31:45.2866221+00:00", "expiry": "2023-11-30T11:31:45.2866244+00:00", "requestedBy": "requestedBy", "errors": [ "" ], "resultOutcome": {}, "isCompleted": false, "isInProgress": false, "isFailed": false } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreditScreening' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "name": "name", "enabled": false, "internalIdentifier": "internalIdentifier" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateCreditScreeningProvider' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "name": "name", "enabled": false, "internalIdentifier": "internalIdentifier" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningProvider' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "enabled": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningProviderEnabled' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "providerId": "providerId", "configurationList": [ { "description": "description", "friendlyName": "friendlyName", "mandatory": false, "name": "name", "type": "type", "value": "value", "maskRequired": false } ], "adapterConfiguration": { "url": "url" }, "providerConfigurationSecurityKeys": { "authenticationKey": "authenticationKey", "encryptionKey": "encryptionKey" } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateCreditScreeningProviderConfiguration' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "providerId": "providerId", "initiateCreditScreeningRequestDto": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": null, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "initiateCreditScreeningResultDto": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": null, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateCreditScreeningMappingConfiguration' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "providerId": "providerId", "initiateCreditScreeningRequestDto": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": null, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "initiateCreditScreeningResultDto": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": { "ruleSets": [ { "mappingRules": [ { "order": 0, "propertyName": "propertyName", "isArrayProperty": false, "includingNestedPath": false } ], "targetProperty": "targetProperty", "targetPropertyFriendlyName": "targetPropertyFriendlyName", "nestedMappingRules": null, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] }, "targetPropertyType": "targetPropertyType", "hiddenIfNoValue": false } ] } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningMappingConfiguration' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "providerId": "providerId", "schema": { "initiateCreditScreeningRequest": { "fields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [] } ] } ] } ] }, "initiateCreditScreeningResult": { "fields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [] } ] } ] } ] } } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateCreditScreeningAdapterShcema' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "providerId": "providerId", "schema": { "initiateCreditScreeningRequest": { "fields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [] } ] } ] } ] }, "initiateCreditScreeningResult": { "fields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [ { "name": "name", "friendlyName": "friendlyName", "isMandatory": false, "type": "type", "description": "description", "nestedFields": [] } ] } ] } ] } } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateCreditScreeningAdapterShcema' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "entityId": "entityId", "journeyId": "journeyId", "taskId": "taskId", "taskDataKey": "taskDataKey", "name": "name", "status": "status", "versions": [ { "id": "id", "versionNumber": 0, "setId": "setId", "status": "status", "screeningOutcome": "screeningOutcome", "manualCreditScreeningGroups": {} } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateManualCreditScreeningSet' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "manualCreditScreeningGroups": {}, "screeningOutcome": "screeningOutcome" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateManualCreditScreeningVersion' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "id": "id", "versionNumber": 0, "setId": "setId", "status": "status", "screeningOutcome": "screeningOutcome", "manualCreditScreeningGroups": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateManualCreditScreeningVersion' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "setId": "setId", "tenantId": "tenantId", "versionNumber": 0, "snapshotGroups": [ { "name": "name", "key": "key", "snapshotPropertyItems": [ { "key": "key", "label": "label", "valueType": "valueType", "order": 0, "isAdditionalField": false, "validationRule": { "id": "id", "setId": "setId", "propertyId": "propertyId", "dataGroupId": "dataGroupId", "isDataGroup": false, "propertyName": "propertyName", "friendlyName": "friendlyName", "validationType": "validationType", "validationData": { "isMandatory": { "active": false, "message": "message" }, "specialCharacters": { "active": false, "message": "message", "excludedCharacters": [ "" ] }, "noNumbers": { "active": false, "message": "message" }, "onlyInteger": { "active": false, "message": "message" }, "noNegative": { "active": false, "message": "message" }, "onlyDecimal": { "active": false, "message": "message" }, "regex": { "active": false, "message": "message", "isCaseSensitive": false, "regexValue": "regexValue" }, "characterLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "numberLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "noFutureDates": { "active": false, "message": "message" }, "noPastDates": { "active": false, "message": "message" }, "dateLimit": { "active": false, "message": "message", "minDate": "2023-11-30T11:31:45.2893587+00:00", "maxDate": "2023-11-30T11:31:45.2893633+00:00" }, "multiSelectLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "collectionMinimumCount": { "active": false, "message": "message", "requiredTypesMinCount": {}, "overallMinimumCount": 0 }, "collectionMaximumCount": { "active": false, "message": "message", "requiredTypesMaxCount": {}, "overallMaximumCount": 0 }, "externalProvider": { "active": false, "message": "message", "providerId": "providerId" } } } } ], "validationRule": { "id": "id", "setId": "setId", "propertyId": "propertyId", "dataGroupId": "dataGroupId", "isDataGroup": false, "propertyName": "propertyName", "friendlyName": "friendlyName", "validationType": "validationType", "validationData": { "isMandatory": { "active": false, "message": "message" }, "specialCharacters": { "active": false, "message": "message", "excludedCharacters": [ "" ] }, "noNumbers": { "active": false, "message": "message" }, "onlyInteger": { "active": false, "message": "message" }, "noNegative": { "active": false, "message": "message" }, "onlyDecimal": { "active": false, "message": "message" }, "regex": { "active": false, "message": "message", "isCaseSensitive": false, "regexValue": "regexValue" }, "characterLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "numberLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "noFutureDates": { "active": false, "message": "message" }, "noPastDates": { "active": false, "message": "message" }, "dateLimit": { "active": false, "message": "message", "minDate": "2023-11-30T11:31:45.2896034+00:00", "maxDate": "2023-11-30T11:31:45.2896066+00:00" }, "multiSelectLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "collectionMinimumCount": { "active": false, "message": "message", "requiredTypesMinCount": {}, "overallMinimumCount": 0 }, "collectionMaximumCount": { "active": false, "message": "message", "requiredTypesMaxCount": {}, "overallMaximumCount": 0 }, "externalProvider": { "active": false, "message": "message", "providerId": "providerId" } } } } ], "screeningOutcome": { "key": "key", "label": "label", "type": "type", "order": 0, "separator": "separator", "category": "category", "validationRule": { "id": "id", "setId": "setId", "propertyId": "propertyId", "dataGroupId": "dataGroupId", "isDataGroup": false, "propertyName": "propertyName", "friendlyName": "friendlyName", "validationType": "validationType", "validationData": { "isMandatory": { "active": false, "message": "message" }, "specialCharacters": { "active": false, "message": "message", "excludedCharacters": [ "" ] }, "noNumbers": { "active": false, "message": "message" }, "onlyInteger": { "active": false, "message": "message" }, "noNegative": { "active": false, "message": "message" }, "onlyDecimal": { "active": false, "message": "message" }, "regex": { "active": false, "message": "message", "isCaseSensitive": false, "regexValue": "regexValue" }, "characterLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "numberLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "noFutureDates": { "active": false, "message": "message" }, "noPastDates": { "active": false, "message": "message" }, "dateLimit": { "active": false, "message": "message", "minDate": "2023-11-30T11:31:45.2898934+00:00", "maxDate": "2023-11-30T11:31:45.2898962+00:00" }, "multiSelectLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "collectionMinimumCount": { "active": false, "message": "message", "requiredTypesMinCount": {}, "overallMinimumCount": 0 }, "collectionMaximumCount": { "active": false, "message": "message", "requiredTypesMaxCount": {}, "overallMaximumCount": 0 }, "externalProvider": { "active": false, "message": "message", "providerId": "providerId" } } } } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SnapshotManualCreditScreeningVersion' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ { "id": "id", "versionNumber": 0, "setId": "setId", "status": "status", "screeningOutcome": "screeningOutcome", "manualCreditScreeningGroups": {} } ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'UpdateBatch' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "requests": [ { "setId": "setId", "versionNumber": 0 } ], "approver": { "id": "id", "role": "role" } } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CompleteBatch' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ { "setId": "setId", "tenantId": "tenantId", "versionNumber": 0, "snapshotGroups": [ { "name": "name", "key": "key", "snapshotPropertyItems": [ { "key": "key", "label": "label", "valueType": "valueType", "order": 0, "isAdditionalField": false, "validationRule": { "id": "id", "setId": "setId", "propertyId": "propertyId", "dataGroupId": "dataGroupId", "isDataGroup": false, "propertyName": "propertyName", "friendlyName": "friendlyName", "validationType": "validationType", "validationData": { "isMandatory": { "active": false, "message": "message" }, "specialCharacters": { "active": false, "message": "message", "excludedCharacters": [ "" ] }, "noNumbers": { "active": false, "message": "message" }, "onlyInteger": { "active": false, "message": "message" }, "noNegative": { "active": false, "message": "message" }, "onlyDecimal": { "active": false, "message": "message" }, "regex": { "active": false, "message": "message", "isCaseSensitive": false, "regexValue": "regexValue" }, "characterLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "numberLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "noFutureDates": { "active": false, "message": "message" }, "noPastDates": { "active": false, "message": "message" }, "dateLimit": { "active": false, "message": "message", "minDate": "2023-11-30T11:31:45.2904093+00:00", "maxDate": "2023-11-30T11:31:45.2904123+00:00" }, "multiSelectLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "collectionMinimumCount": { "active": false, "message": "message", "requiredTypesMinCount": {}, "overallMinimumCount": 0 }, "collectionMaximumCount": { "active": false, "message": "message", "requiredTypesMaxCount": {}, "overallMaximumCount": 0 }, "externalProvider": { "active": false, "message": "message", "providerId": "providerId" } } } } ], "validationRule": { "id": "id", "setId": "setId", "propertyId": "propertyId", "dataGroupId": "dataGroupId", "isDataGroup": false, "propertyName": "propertyName", "friendlyName": "friendlyName", "validationType": "validationType", "validationData": { "isMandatory": { "active": false, "message": "message" }, "specialCharacters": { "active": false, "message": "message", "excludedCharacters": [ "" ] }, "noNumbers": { "active": false, "message": "message" }, "onlyInteger": { "active": false, "message": "message" }, "noNegative": { "active": false, "message": "message" }, "onlyDecimal": { "active": false, "message": "message" }, "regex": { "active": false, "message": "message", "isCaseSensitive": false, "regexValue": "regexValue" }, "characterLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "numberLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "noFutureDates": { "active": false, "message": "message" }, "noPastDates": { "active": false, "message": "message" }, "dateLimit": { "active": false, "message": "message", "minDate": "2023-11-30T11:31:45.2906529+00:00", "maxDate": "2023-11-30T11:31:45.2906565+00:00" }, "multiSelectLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "collectionMinimumCount": { "active": false, "message": "message", "requiredTypesMinCount": {}, "overallMinimumCount": 0 }, "collectionMaximumCount": { "active": false, "message": "message", "requiredTypesMaxCount": {}, "overallMaximumCount": 0 }, "externalProvider": { "active": false, "message": "message", "providerId": "providerId" } } } } ], "screeningOutcome": { "key": "key", "label": "label", "type": "type", "order": 0, "separator": "separator", "category": "category", "validationRule": { "id": "id", "setId": "setId", "propertyId": "propertyId", "dataGroupId": "dataGroupId", "isDataGroup": false, "propertyName": "propertyName", "friendlyName": "friendlyName", "validationType": "validationType", "validationData": { "isMandatory": { "active": false, "message": "message" }, "specialCharacters": { "active": false, "message": "message", "excludedCharacters": [ "" ] }, "noNumbers": { "active": false, "message": "message" }, "onlyInteger": { "active": false, "message": "message" }, "noNegative": { "active": false, "message": "message" }, "onlyDecimal": { "active": false, "message": "message" }, "regex": { "active": false, "message": "message", "isCaseSensitive": false, "regexValue": "regexValue" }, "characterLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "numberLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "noFutureDates": { "active": false, "message": "message" }, "noPastDates": { "active": false, "message": "message" }, "dateLimit": { "active": false, "message": "message", "minDate": "2023-11-30T11:31:45.2909246+00:00", "maxDate": "2023-11-30T11:31:45.2909279+00:00" }, "multiSelectLimit": { "active": false, "message": "message", "minValue": 0, "maxValue": 0 }, "collectionMinimumCount": { "active": false, "message": "message", "requiredTypesMinCount": {}, "overallMinimumCount": 0 }, "collectionMaximumCount": { "active": false, "message": "message", "requiredTypesMaxCount": {}, "overallMaximumCount": 0 }, "externalProvider": { "active": false, "message": "message", "providerId": "providerId" } } } } } ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'BatchSnapshot' ], domain: [ 'FenergoNebulaCreditScreeningCommandv10' ] } } }
];

async function ExecuteFenergoNebulaCreditScreeningCommandv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let id=''; let providerId=''; let mappingId=''; let setId=''; let versionNumber='';
switch(endpoint){ case 'CreditScreening': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/creditscreening';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'DeleteCreditScreening': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/creditscreening/{id}'.replace('{id}', id);

break;
case 'CreateCreditScreeningProvider': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/providers';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateCreditScreeningProvider': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/providers/{providerId}'.replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateCreditScreeningProviderEnabled': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/providers/{providerId}/enabled'.replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateCreditScreeningProviderConfiguration': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/providers/{providerId}/configuration'.replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateCreditScreeningMappingConfiguration': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/providers/{providerId}/mappingconfiguration'.replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateCreditScreeningMappingConfiguration': mappingId = base.getNodeParameter('mappingId', 0) as string;
providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/providers/{providerId}/mappingconfiguration/{mappingId}'.replace('{mappingId}', mappingId).replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateCreditScreeningAdapterShcema': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/providers/{providerId}/adapterSchema'.replace('{providerId}', providerId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateCreditScreeningAdapterShcema': providerId = base.getNodeParameter('providerId', 0) as string;
id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/providers/{providerId}/adapterSchema/{id}'.replace('{providerId}', providerId).replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'ProviderTest': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/providers/{providerId}/test'.replace('{providerId}', providerId);

break;
case 'CreateManualCreditScreeningSet': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/manual/set';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateManualCreditScreeningVersion': setId = base.getNodeParameter('setId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/manual/set/{setId}/version'.replace('{setId}', setId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateManualCreditScreeningVersion': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/manual/set/{setId}/version/{versionNumber}'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateManualCreditVersionScreeningStatusToCompleted': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/manual/set/{setId}/version/{versionNumber}/complete'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

break;
case 'UpdateManualCreditVersionScreeningStatusToRejected': setId = base.getNodeParameter('setId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/manual/set/{setId}/version/{versionNumber}/reject'.replace('{setId}', setId).replace('{versionNumber}', versionNumber);

break;
case 'SnapshotManualCreditScreeningVersion': setId = base.getNodeParameter('setId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/manual/set/{setId}/snapshot'.replace('{setId}', setId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'UpdateBatch': 
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/manual/batch/update';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CompleteBatch': 
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/manual/batch/complete';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'BatchSnapshot': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/creditscreeningcommand/api/manual/batch/snapshot';

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
    FenergoNebulaCreditScreeningCommandv10Properties,
    ExecuteFenergoNebulaCreditScreeningCommandv10
}
