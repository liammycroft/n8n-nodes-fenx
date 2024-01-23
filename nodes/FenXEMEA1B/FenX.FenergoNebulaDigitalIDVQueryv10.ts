import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaDigitalIDVQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get Configuration', value: 'GetConfiguration' },{ name: 'Get provider configuration', value: 'GetProviderConfiguration' },{ name: 'Gets all by journey identifier. Version 0.1 - Under active development', value: 'GetAllByJourneyId' },{ name: 'Gets an Entity In Scope by Journey Id and Entity Id. Version 0.1 - Under active development', value: 'GetByJourneyIdAndEntityId' },{ name: 'Get an Idv Requirement Status Model by Id Version 0.1 - Under active development', value: 'GetIdvRequirementStatusModelById' },{ name: 'Get an Idv Requirement Status Model by Entity Id and Journey Id Version 0.1 - Under active development', value: 'GetIdvRequirementStatusModelByEntityIdAndJourneyId' },{ name: 'Get verification by id', value: 'GetVerification' },{ name: 'Get verifications by entity type and entity id', value: 'GetVerificationsByEntity' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaDigitalIDVQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'providerId', name: 'providerId', type: 'string', required: true, default: '', description: 'The ID of provider', displayOptions: { show: { endpoint: [ 'GetProviderConfiguration' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The journey identifier.', displayOptions: { show: { endpoint: [ 'GetAllByJourneyId' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'The Journey identifier.', displayOptions: { show: { endpoint: [ 'GetByJourneyIdAndEntityId' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The Entity identifier.', displayOptions: { show: { endpoint: [ 'GetByJourneyIdAndEntityId' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetIdvRequirementStatusModelById' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetIdvRequirementStatusModelByEntityIdAndJourneyId' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetIdvRequirementStatusModelByEntityIdAndJourneyId' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetVerification' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } },{ displayName: 'entityType', name: 'entityType', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetVerificationsByEntity' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetVerificationsByEntity' ], domain: [ 'FenergoNebulaDigitalIDVQueryv10' ] } } }
];

async function ExecuteFenergoNebulaDigitalIDVQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let providerId=''; let journeyId=''; let entityId=''; let id='';
switch(endpoint){ case 'GetConfiguration': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/digitalidvquery/api/configuration';

break;
case 'GetProviderConfiguration': providerId = base.getNodeParameter('providerId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/digitalidvquery/api/configuration/provider/{providerId}'.replace('{providerId}', providerId);

break;
case 'GetAllByJourneyId': journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/digitalidvquery/api/entity-in-scope/journey/{journeyId}'.replace('{journeyId}', journeyId);

break;
case 'GetByJourneyIdAndEntityId': journeyId = base.getNodeParameter('journeyId', 0) as string;
entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/digitalidvquery/api/entity-in-scope/journey/{journeyId}/entity/{entityId}'.replace('{journeyId}', journeyId).replace('{entityId}', entityId);

break;
case 'GetIdvRequirementStatusModelById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/digitalidvquery/api/idv-requirement-status/{id}'.replace('{id}', id);

break;
case 'GetIdvRequirementStatusModelByEntityIdAndJourneyId': entityId = base.getNodeParameter('entityId', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/digitalidvquery/api/idv-requirement-status/entity/{entityId}/journey/{journeyId}'.replace('{entityId}', entityId).replace('{journeyId}', journeyId);

break;
case 'GetVerification': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/digitalidvquery/api/verification/{id}'.replace('{id}', id);

break;
case 'GetVerificationsByEntity': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/digitalidvquery/api/verification';
requestOptions.qs = { entityType: base.getNodeParameter('entityType', 0) as string,entityId: base.getNodeParameter('entityId', 0) as string };
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
    FenergoNebulaDigitalIDVQueryv10Properties,
    ExecuteFenergoNebulaDigitalIDVQueryv10
}
