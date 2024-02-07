import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaLookupQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Gets all Lookups for the client tenant.', value: 'GetAllLookups' },{ name: 'Gets all Lookups active version for the client tenant.', value: 'GetAllActiveLookups' },{ name: 'Gets all Lookups (lite)', value: 'GetAllLookupsLite' },{ name: 'Get the active version of an existing Lookup by ID', value: 'GetLookupById' },{ name: 'Get a specific version of an existing Lookup', value: 'GetLookupVersionById' },{ name: 'Get the active version of an existing Lookup by Name', value: 'GetLookupByName' },{ name: 'Gets a list of versions', value: 'GetLookupsByIdsAndVersion' },{ name: 'Gets a list of lookups and their active version from a list of names', value: 'GetLookupsByNames' },{ name: 'Retrieves a specific lookup version as a CSV file.', value: 'GetLookupVersionFile' },{ name: 'Get specific columns of an existing Lookup', value: 'GetLookupByIdWithColumnFilter' },{ name: 'Get all lookups and their parent child relationship.', value: 'GetAllLinkLookups' },{ name: 'Gets all Link Lookups active version for the client tenant.', value: 'GetAllActiveLinkLookups' },{ name: 'Gets all Link Lookups (lite)', value: 'GetAllLinkLookupsLite' },{ name: 'Get the current active version of an existing Link Lookup along with its relationships.', value: 'GetLinkLookupById' },{ name: 'Get the specified version of an existing Linked Lookup', value: 'GetLinkLookupVersionById' },{ name: 'Gets a list of versions', value: 'GetLinkLookupsByIdsAndVersion' },{ name: 'Get all Linked Lookup version of a existing Lookup', value: 'GetLinkLookupByLookup' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaLookupQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The id of the lookup to retrieve', displayOptions: { show: { endpoint: [ 'GetLookupById' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetLookupVersionById' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number to retrieve', displayOptions: { show: { endpoint: [ 'GetLookupVersionById' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'lookupName', name: 'lookupName', type: 'string', required: true, default: '', description: 'The name of the lookup to retrieve', displayOptions: { show: { endpoint: [ 'GetLookupByName' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetLookupVersionFile' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number to retrieve', displayOptions: { show: { endpoint: [ 'GetLookupVersionFile' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'lookupId', name: 'lookupId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetLookupByIdWithColumnFilter' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The id of the Linked Lookup to retrieve', displayOptions: { show: { endpoint: [ 'GetLinkLookupById' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing Linked Lookup', displayOptions: { show: { endpoint: [ 'GetLinkLookupVersionById' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number to retrieve', displayOptions: { show: { endpoint: [ 'GetLinkLookupVersionById' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'lookupid', name: 'lookupid', type: 'string', required: true, default: '', description: 'The id of the Lookup', displayOptions: { show: { endpoint: [ 'GetLinkLookupByLookup' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookups": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetLookupsByIdsAndVersion' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "lookupNames": [ "" ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetLookupsByNames' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "columnNames": [ "" ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetLookupByIdWithColumnFilter' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "linkLookups": {} } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetLinkLookupsByIdsAndVersion' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'includeNotes', name: 'includeNotes', type: 'string', required: true, default: '', description: 'Indicates whether the result should contain versions with Notes field value included.', displayOptions: { show: { endpoint: [ 'GetAllLookupsLite' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'getActiveVersionIfNotFound', name: 'getActiveVersionIfNotFound', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetLookupsByIdsAndVersion' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'includeNotes', name: 'includeNotes', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetAllLinkLookupsLite' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } },{ displayName: 'getActiveVersionIfNotFound', name: 'getActiveVersionIfNotFound', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetLinkLookupsByIdsAndVersion' ], domain: [ 'FenergoNebulaLookupQueryv10' ] } } }
];

async function ExecuteFenergoNebulaLookupQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let lookupId=''; let versionNumber=''; let lookupName=''; let id=''; let lookupid='';
switch(endpoint){ case 'GetAllLookups': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup';

break;
case 'GetAllActiveLookups': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup/active';

break;
case 'GetAllLookupsLite': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup/lite';
requestOptions.qs = { includeNotes: base.getNodeParameter('includeNotes', 0) as string };
break;
case 'GetLookupById': lookupId = base.getNodeParameter('lookupId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup/{lookupId}'.replace('{lookupId}', lookupId);

break;
case 'GetLookupVersionById': lookupId = base.getNodeParameter('lookupId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup/{lookupId}/version/{versionNumber}'.replace('{lookupId}', lookupId).replace('{versionNumber}', versionNumber);

break;
case 'GetLookupByName': lookupName = base.getNodeParameter('lookupName', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup/name/{lookupName}'.replace('{lookupName}', lookupName);

break;
case 'GetLookupsByIdsAndVersion': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup/versions';
requestOptions.qs = { getActiveVersionIfNotFound: base.getNodeParameter('getActiveVersionIfNotFound', 0) as string };
requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetLookupsByNames': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup/names';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetLookupVersionFile': lookupId = base.getNodeParameter('lookupId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup/{lookupId}/version/{versionNumber}/file'.replace('{lookupId}', lookupId).replace('{versionNumber}', versionNumber);

break;
case 'GetLookupByIdWithColumnFilter': lookupId = base.getNodeParameter('lookupId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookup/{lookupId}/column-filter'.replace('{lookupId}', lookupId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetAllLinkLookups': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookuplink';

break;
case 'GetAllActiveLinkLookups': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookuplink/active';

break;
case 'GetAllLinkLookupsLite': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookuplink/lite';
requestOptions.qs = { includeNotes: base.getNodeParameter('includeNotes', 0) as string };
break;
case 'GetLinkLookupById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookuplink/{id}'.replace('{id}', id);

break;
case 'GetLinkLookupVersionById': id = base.getNodeParameter('id', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookuplink/{id}/version/{versionNumber}'.replace('{id}', id).replace('{versionNumber}', versionNumber);

break;
case 'GetLinkLookupsByIdsAndVersion': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookuplink/versions';
requestOptions.qs = { getActiveVersionIfNotFound: base.getNodeParameter('getActiveVersionIfNotFound', 0) as string };
requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetLinkLookupByLookup': lookupid = base.getNodeParameter('lookupid', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/lookupquery/api/lookuplink/lookup/{lookupid}'.replace('{lookupid}', lookupid);

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
    FenergoNebulaLookupQueryv10Properties,
    ExecuteFenergoNebulaLookupQueryv10
}
