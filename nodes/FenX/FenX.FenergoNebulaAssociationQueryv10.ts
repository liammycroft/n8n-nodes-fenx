import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenX.node';

let FenergoNebulaAssociationQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get all associations from a specific source in a Journey', value: 'GetAgencyAssociations' },{ name: 'Get all verified associations from a specific source in a Journey', value: 'GetVerifiedAgencyAssociations' },{ name: 'Get an existing Association', value: 'GetAssociationById' },{ name: 'Get all Associations by Root Entity Id and Journey Id', value: 'GetAssociations' },{ name: 'Get all verified Associations by Root Entity Id', value: 'GetVerifiedAssociations' },{ name: 'Get all verified outbound Associations by Root Entity Id', value: 'GetVerifiedOutboundAssociations' },{ name: 'Get all Association Conflicts by Root Entity Id and Journey Id', value: 'GetAssociationConflicts' },{ name: 'Get all product Associations by Root Journey Id and Entity Id', value: 'GetProductAssociations' },{ name: 'Get all product Associations by Root Entity Id', value: 'GetProductAssociationsByEntityId' },{ name: 'Get all product Associations by Root Entity Id', value: 'GetAllProductAssociationsByEntityId' },{ name: 'Get all product Associations by Product Id', value: 'GetProductAssociationsByProductId' },{ name: 'Get all collateral Associations by Root Journey Id and Entity Id', value: 'GetCollateralAssociations' },{ name: 'Get all collateral Associations by Root Entity Id', value: 'GetCollateralAssociationsByEntityId' },{ name: 'Get all collateral Associations by Collateral Id', value: 'GetCollateralAssociationsByCollateralId' },{ name: 'Get all asset Associations by Root Journey Id and Collateral Id', value: 'GetAssetAssociations' },{ name: 'Get all asset Associations by Root Collateral Id', value: 'GetAssetAssociationsByCollateralId' },{ name: 'Get all Asset to Entity Associations by Root Entity Id', value: 'GetAssetAssociationsByEntityId' },{ name: 'Get all asset Associations by Asset Id', value: 'GetAssetAssociationsByAssetId' },{ name: 'Get a temporal snapshot of the association hierarchy', value: 'GetHierarchySnapShot' },{ name: 'Get all group management Associations by Root Entity Id', value: 'GetGroupManagementAssociations' },{ name: 'Get all verified and unverified group management Associations by Root Entity Id and Journey Id', value: 'GetGroupManagementAssociationsByJourneyId' },{ name: 'Get all verified group management Associations by Root Entity Id', value: 'GetVerifiedGroupManagementAssociations' },{ name: 'Get all unverified group management Associations by Root Entity Id and Journey Id', value: 'GetUnverifiedGroupManagementAssociations' },{ name: 'Get all group management Associations by Source Entity Id', value: 'GetAllGroupsAssociatedBySourceEntityId' },{ name: 'Get all group management Associations by Source Entity Id including any unverified groups by journey id', value: 'GetAllInclUnverifiedGroupsAssociatedBySourceEntityId' },{ name: 'Get all proposed changes for given Source Entity associations', value: 'GetProposedChangesByRelatedParty' },{ name: 'Get all associations for the journey extended with change type that was made during the journey', value: 'GetProposedChangesAssociationsHierarchy' },{ name: 'Get all direct draft and verified outbound Associations by Root Entity Id', value: 'GetAllDirectOutboundAssociations' },{ name: 'Search for verified associations', value: 'SearchForVerifiedAssociations' },{ name: 'Get all Associations by Root Entity Id, Journey Id, and max level', value: 'GetAssociationsWithMaxLevel' },{ name: 'Get all verified Associations by Root Entity Id, and max level', value: 'GetVerifiedAssociationsWithMaxLevel' },{ name: 'Get all verified Deal-Product associations and Deal-Product associations for a Journey', value: 'GetDealProductAssociations' },{ name: 'Get an existing Entity', value: 'GetEntityById' },{ name: 'Get an Unwrapping Requirement Status Model by Id Version 0.1 - Under active development', value: 'GetUnwrappingRequirementStatusModelById' },{ name: 'Get an Unwrapping Requirement Status Model by Entity Id and Journey Id Version 0.1 - Under active development', value: 'GetUnwrappingRequirementStatusModelByEntityIdAndJourneyId' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaAssociationQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The ID of the Entity to find agency associations with this source id', displayOptions: { show: { endpoint: [ 'GetAgencyAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The ID of the Journey to search for agency associations in the specific journey', displayOptions: { show: { endpoint: [ 'GetAgencyAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The ID of the Entity to find agency associations with this source id', displayOptions: { show: { endpoint: [ 'GetVerifiedAgencyAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Association identifier', displayOptions: { show: { endpoint: [ 'GetAssociationById' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The id of the root entity', displayOptions: { show: { endpoint: [ 'GetVerifiedAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The id of the root entity', displayOptions: { show: { endpoint: [ 'GetVerifiedOutboundAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetAssociationConflicts' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetAssociationConflicts' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetProductAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetProductAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The unique identifier of the Entity that associations are required for', displayOptions: { show: { endpoint: [ 'GetProductAssociationsByEntityId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The unique identifier of the Entity that associations are required for', displayOptions: { show: { endpoint: [ 'GetAllProductAssociationsByEntityId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'productId', name: 'productId', type: 'string', required: true, default: '', description: 'The unique identifier of the Product that associations are connected to', displayOptions: { show: { endpoint: [ 'GetProductAssociationsByProductId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetCollateralAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetCollateralAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The unique identifier of the Entity that associations are required for', displayOptions: { show: { endpoint: [ 'GetCollateralAssociationsByEntityId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'collateralId', name: 'collateralId', type: 'string', required: true, default: '', description: 'The unique identifier of the Collateral that associations are connected to', displayOptions: { show: { endpoint: [ 'GetCollateralAssociationsByCollateralId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetAssetAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetAssetAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'collateralId', name: 'collateralId', type: 'string', required: true, default: '', description: 'The unique identifier of the Collateral that associations are required for', displayOptions: { show: { endpoint: [ 'GetAssetAssociationsByCollateralId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The unique identifier of the Entity that associations are required for', displayOptions: { show: { endpoint: [ 'GetAssetAssociationsByEntityId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'assetId', name: 'assetId', type: 'string', required: true, default: '', description: 'The unique identifier of the Asset that associations are connected to', displayOptions: { show: { endpoint: [ 'GetAssetAssociationsByAssetId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The id of a journey that the  associations belong to', displayOptions: { show: { endpoint: [ 'GetHierarchySnapShot' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'taskId', name: 'taskId', type: 'string', required: true, default: '', description: 'The id of a task that the associations belong to', displayOptions: { show: { endpoint: [ 'GetHierarchySnapShot' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The id of the root entity', displayOptions: { show: { endpoint: [ 'GetGroupManagementAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetGroupManagementAssociationsByJourneyId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetGroupManagementAssociationsByJourneyId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The id of the root entity', displayOptions: { show: { endpoint: [ 'GetVerifiedGroupManagementAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetUnverifiedGroupManagementAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetUnverifiedGroupManagementAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'sourceEntityId', name: 'sourceEntityId', type: 'string', required: true, default: '', description: 'The id of the source entity', displayOptions: { show: { endpoint: [ 'GetAllGroupsAssociatedBySourceEntityId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'sourceEntityId', name: 'sourceEntityId', type: 'string', required: true, default: '', description: 'The id of the source entity', displayOptions: { show: { endpoint: [ 'GetAllInclUnverifiedGroupsAssociatedBySourceEntityId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The id of the journey', displayOptions: { show: { endpoint: [ 'GetAllInclUnverifiedGroupsAssociatedBySourceEntityId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The id of the journey', displayOptions: { show: { endpoint: [ 'GetProposedChangesByRelatedParty' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The id of the source entity', displayOptions: { show: { endpoint: [ 'GetProposedChangesByRelatedParty' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetProposedChangesAssociationsHierarchy' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetProposedChangesAssociationsHierarchy' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The id of the root entity', displayOptions: { show: { endpoint: [ 'GetAllDirectOutboundAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'JourneyId', name: 'JourneyId', type: 'string', required: true, default: '', description: 'The UiD of a journey that the associations belong to', displayOptions: { show: { endpoint: [ 'GetAssociationsWithMaxLevel' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetAssociationsWithMaxLevel' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'MaxLevel', name: 'MaxLevel', type: 'string', required: true, default: '', description: 'The number of levels to retrieve', displayOptions: { show: { endpoint: [ 'GetAssociationsWithMaxLevel' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'EntityId', name: 'EntityId', type: 'string', required: true, default: '', description: 'The UiD of the root entity', displayOptions: { show: { endpoint: [ 'GetVerifiedAssociationsWithMaxLevel' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'MaxLevel', name: 'MaxLevel', type: 'string', required: true, default: '', description: 'The number of levels to retrieve', displayOptions: { show: { endpoint: [ 'GetVerifiedAssociationsWithMaxLevel' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The ID of the Entity to search for Product-Deal associations', displayOptions: { show: { endpoint: [ 'GetDealProductAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The ID of the Journey to search for Product-Deal associations', displayOptions: { show: { endpoint: [ 'GetDealProductAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Association Entity identifier', displayOptions: { show: { endpoint: [ 'GetEntityById' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetUnwrappingRequirementStatusModelById' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetUnwrappingRequirementStatusModelByEntityIdAndJourneyId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetUnwrappingRequirementStatusModelByEntityIdAndJourneyId' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "entityId": "entityId", "maxLevels": 0, "includeProducts": false, "associationTypes": [ "" ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'SearchForVerifiedAssociations' ], domain: [ 'FenergoNebulaAssociationQueryv10' ] } } }
];

async function ExecuteFenergoNebulaAssociationQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let entityId=''; let journeyId=''; let id=''; let EntityId=''; let JourneyId=''; let productId=''; let collateralId=''; let assetId=''; let taskId=''; let sourceEntityId=''; let MaxLevel='';
switch(endpoint){ case 'GetAgencyAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/agency/source/{entityId}/journey/{journeyId}'.replace('{entityId}', entityId).replace('{journeyId}', journeyId);

break;
case 'GetVerifiedAgencyAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/agency/source/{entityId}/verified'.replace('{entityId}', entityId);

break;
case 'GetAssociationById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/{id}'.replace('{id}', id);

break;
case 'GetAssociations': EntityId = base.getNodeParameter('EntityId', 0) as string;
JourneyId = base.getNodeParameter('JourneyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/journey/{JourneyId}'.replace('{EntityId}', EntityId).replace('{JourneyId}', JourneyId);

break;
case 'GetVerifiedAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{entityId}'.replace('{entityId}', entityId);

break;
case 'GetVerifiedOutboundAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/outbound/root/{entityId}'.replace('{entityId}', entityId);

break;
case 'GetAssociationConflicts': EntityId = base.getNodeParameter('EntityId', 0) as string;
JourneyId = base.getNodeParameter('JourneyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/journey/{JourneyId}/conflicts'.replace('{EntityId}', EntityId).replace('{JourneyId}', JourneyId);

break;
case 'GetProductAssociations': EntityId = base.getNodeParameter('EntityId', 0) as string;
JourneyId = base.getNodeParameter('JourneyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/journey/{JourneyId}/product'.replace('{EntityId}', EntityId).replace('{JourneyId}', JourneyId);

break;
case 'GetProductAssociationsByEntityId': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{entityId}/product'.replace('{entityId}', entityId);

break;
case 'GetAllProductAssociationsByEntityId': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{entityId}/product/all'.replace('{entityId}', entityId);

break;
case 'GetProductAssociationsByProductId': productId = base.getNodeParameter('productId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/product/{productId}'.replace('{productId}', productId);

break;
case 'GetCollateralAssociations': EntityId = base.getNodeParameter('EntityId', 0) as string;
JourneyId = base.getNodeParameter('JourneyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/journey/{JourneyId}/collateral'.replace('{EntityId}', EntityId).replace('{JourneyId}', JourneyId);

break;
case 'GetCollateralAssociationsByEntityId': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{entityId}/collateral'.replace('{entityId}', entityId);

break;
case 'GetCollateralAssociationsByCollateralId': collateralId = base.getNodeParameter('collateralId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/collateral/{collateralId}'.replace('{collateralId}', collateralId);

break;
case 'GetAssetAssociations': EntityId = base.getNodeParameter('EntityId', 0) as string;
JourneyId = base.getNodeParameter('JourneyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/journey/{JourneyId}/asset'.replace('{EntityId}', EntityId).replace('{JourneyId}', JourneyId);

break;
case 'GetAssetAssociationsByCollateralId': collateralId = base.getNodeParameter('collateralId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{collateralId}/asset'.replace('{collateralId}', collateralId);

break;
case 'GetAssetAssociationsByEntityId': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/entity/{entityId}/asset'.replace('{entityId}', entityId);

break;
case 'GetAssetAssociationsByAssetId': assetId = base.getNodeParameter('assetId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/asset/{assetId}'.replace('{assetId}', assetId);

break;
case 'GetHierarchySnapShot': journeyId = base.getNodeParameter('journeyId', 0) as string;
taskId = base.getNodeParameter('taskId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/snapshot/{journeyId}/task/{taskId}'.replace('{journeyId}', journeyId).replace('{taskId}', taskId);

break;
case 'GetGroupManagementAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{entityId}/groupManagement'.replace('{entityId}', entityId);

break;
case 'GetGroupManagementAssociationsByJourneyId': EntityId = base.getNodeParameter('EntityId', 0) as string;
JourneyId = base.getNodeParameter('JourneyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/journey/{JourneyId}/groupManagement'.replace('{EntityId}', EntityId).replace('{JourneyId}', JourneyId);

break;
case 'GetVerifiedGroupManagementAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{entityId}/groupManagement/verified'.replace('{entityId}', entityId);

break;
case 'GetUnverifiedGroupManagementAssociations': EntityId = base.getNodeParameter('EntityId', 0) as string;
JourneyId = base.getNodeParameter('JourneyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/journey/{JourneyId}/groupManagement/unverified'.replace('{EntityId}', EntityId).replace('{JourneyId}', JourneyId);

break;
case 'GetAllGroupsAssociatedBySourceEntityId': sourceEntityId = base.getNodeParameter('sourceEntityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/groupManagementBySourceId/{sourceEntityId}'.replace('{sourceEntityId}', sourceEntityId);

break;
case 'GetAllInclUnverifiedGroupsAssociatedBySourceEntityId': sourceEntityId = base.getNodeParameter('sourceEntityId', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/allGroupManagementBySourceId/{sourceEntityId}/journey/{journeyId}'.replace('{sourceEntityId}', sourceEntityId).replace('{journeyId}', journeyId);

break;
case 'GetProposedChangesByRelatedParty': journeyId = base.getNodeParameter('journeyId', 0) as string;
entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{entityId}/journey/{journeyId}/proposedChanges/relatedParty'.replace('{journeyId}', journeyId).replace('{entityId}', entityId);

break;
case 'GetProposedChangesAssociationsHierarchy': EntityId = base.getNodeParameter('EntityId', 0) as string;
JourneyId = base.getNodeParameter('JourneyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/journey/{JourneyId}/proposedChanges/hierarchy'.replace('{EntityId}', EntityId).replace('{JourneyId}', JourneyId);

break;
case 'GetAllDirectOutboundAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/outbound/root/{entityId}/alldirect'.replace('{entityId}', entityId);

break;
case 'SearchForVerifiedAssociations': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/searchForVerifiedAssociations';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetAssociationsWithMaxLevel': JourneyId = base.getNodeParameter('JourneyId', 0) as string;
EntityId = base.getNodeParameter('EntityId', 0) as string;
MaxLevel = base.getNodeParameter('MaxLevel', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/journey/{JourneyId}/maxlevel/{MaxLevel}'.replace('{JourneyId}', JourneyId).replace('{EntityId}', EntityId).replace('{MaxLevel}', MaxLevel);

break;
case 'GetVerifiedAssociationsWithMaxLevel': EntityId = base.getNodeParameter('EntityId', 0) as string;
MaxLevel = base.getNodeParameter('MaxLevel', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/association/root/{EntityId}/maxlevel/{MaxLevel}'.replace('{EntityId}', EntityId).replace('{MaxLevel}', MaxLevel);

break;
case 'GetDealProductAssociations': entityId = base.getNodeParameter('entityId', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/deals/root/{entityId}/journey/{journeyId}'.replace('{entityId}', entityId).replace('{journeyId}', journeyId);

break;
case 'GetEntityById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/entity/{id}'.replace('{id}', id);

break;
case 'GetUnwrappingRequirementStatusModelById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/unwrapping-requirement-status/{id}'.replace('{id}', id);

break;
case 'GetUnwrappingRequirementStatusModelByEntityIdAndJourneyId': entityId = base.getNodeParameter('entityId', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.fenergox.com/associationquery/api/unwrapping-requirement-status/entity/{entityId}/journey/{journeyId}'.replace('{entityId}', entityId).replace('{journeyId}', journeyId);

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
    FenergoNebulaAssociationQueryv10Properties,
    ExecuteFenergoNebulaAssociationQueryv10
}
