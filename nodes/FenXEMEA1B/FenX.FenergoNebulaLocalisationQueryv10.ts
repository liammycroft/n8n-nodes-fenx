import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaLocalisationQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get all Localisations for the client tenant without Context data.', value: 'GetAllLocalisations' },{ name: 'Get all Localisations active version for the client tenant.', value: 'GetAllActiveLocalisations' },{ name: 'Get default localisation and language', value: 'GetDefaultLocalisation' },{ name: 'Get the active version of an existing Localisation by ID', value: 'GetLocalisationById' },{ name: 'Get a specific version of an existing Localisation', value: 'GetLocalisationVersionById' },{ name: 'Get the context of a specific version for an existing Localisation', value: 'GetLocalisationContextByVersionAndContextName' },{ name: 'Get Presigned Url of specific version of an existing Localisation context', value: 'GetLocalisationContextSignedUrlByVersionAndContextName' },{ name: 'Get All Supported System Language Code', value: 'GetAllSystemLanguages' },{ name: 'Get Presigned Url and Last Updated time of specific System Language', value: 'GetSystemLanguageByLanguageCode' },{ name: 'Get standard language code list.', value: 'GetLanguageCode' },{ name: 'Get user language preference.', value: 'GetUserPreference' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaLocalisationQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'localisationId', name: 'localisationId', type: 'string', required: true, default: '', description: 'The id of the localisation to retrieve', displayOptions: { show: { endpoint: [ 'GetLocalisationById' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } },{ displayName: 'localisationId', name: 'localisationId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetLocalisationVersionById' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number to retrieve', displayOptions: { show: { endpoint: [ 'GetLocalisationVersionById' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } },{ displayName: 'localisationId', name: 'localisationId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetLocalisationContextByVersionAndContextName' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number to retrieve', displayOptions: { show: { endpoint: [ 'GetLocalisationContextByVersionAndContextName' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } },{ displayName: 'contextName', name: 'contextName', type: 'string', required: true, default: '', description: 'The context name to retrieve', displayOptions: { show: { endpoint: [ 'GetLocalisationContextByVersionAndContextName' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } },{ displayName: 'localisationId', name: 'localisationId', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetLocalisationContextSignedUrlByVersionAndContextName' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number to retrieve', displayOptions: { show: { endpoint: [ 'GetLocalisationContextSignedUrlByVersionAndContextName' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } },{ displayName: 'contextName', name: 'contextName', type: 'string', required: true, default: '', description: 'The context name to retrieve', displayOptions: { show: { endpoint: [ 'GetLocalisationContextSignedUrlByVersionAndContextName' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } },{ displayName: 'languageCode', name: 'languageCode', type: 'string', required: true, default: '', description: 'standard language iso code', displayOptions: { show: { endpoint: [ 'GetSystemLanguageByLanguageCode' ], domain: [ 'FenergoNebulaLocalisationQueryv10' ] } } }
];

async function ExecuteFenergoNebulaLocalisationQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let localisationId=''; let versionNumber=''; let contextName=''; let languageCode='';
switch(endpoint){ case 'GetAllLocalisations': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/localisation';

break;
case 'GetAllActiveLocalisations': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/localisation/active';

break;
case 'GetDefaultLocalisation': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/localisation/default';

break;
case 'GetLocalisationById': localisationId = base.getNodeParameter('localisationId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/localisation/{localisationId}'.replace('{localisationId}', localisationId);

break;
case 'GetLocalisationVersionById': localisationId = base.getNodeParameter('localisationId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/localisation/{localisationId}/version/{versionNumber}'.replace('{localisationId}', localisationId).replace('{versionNumber}', versionNumber);

break;
case 'GetLocalisationContextByVersionAndContextName': localisationId = base.getNodeParameter('localisationId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
contextName = base.getNodeParameter('contextName', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/localisation/{localisationId}/version/{versionNumber}/context/{contextName}'.replace('{localisationId}', localisationId).replace('{versionNumber}', versionNumber).replace('{contextName}', contextName);

break;
case 'GetLocalisationContextSignedUrlByVersionAndContextName': localisationId = base.getNodeParameter('localisationId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
contextName = base.getNodeParameter('contextName', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/localisation/{localisationId}/version/{versionNumber}/context/{contextName}/signedUrl'.replace('{localisationId}', localisationId).replace('{versionNumber}', versionNumber).replace('{contextName}', contextName);

break;
case 'GetAllSystemLanguages': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/localisation/systemLanguages';

break;
case 'GetSystemLanguageByLanguageCode': languageCode = base.getNodeParameter('languageCode', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/localisation/systemLanguage/{languageCode}'.replace('{languageCode}', languageCode);

break;
case 'GetLanguageCode': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/lookup/languageCode';

break;
case 'GetUserPreference': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/localisationquery/api/userpreference';

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
    FenergoNebulaLocalisationQueryv10Properties,
    ExecuteFenergoNebulaLocalisationQueryv10
}
