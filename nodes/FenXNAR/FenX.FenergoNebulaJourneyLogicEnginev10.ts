import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaJourneyLogicEnginev10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Allows clearing the Logic Engine API cache. This is an maintenance endpoint and does not need to be used under normal circumstances.', value: 'AllowsclearingtheLogicEngineAPIcache. Thisisanmaintenanceendpointanddoesnotneedtobeusedundernormalcircumstances.' },{ name: 'Evaluates logic condition to retrieve matching Journey Schema(s)', value: 'EvaluateJourneySchema' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaJourneyLogicEnginev10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": {} }', description: 'Request body', displayOptions: { show: { endpoint: [ 'EvaluateJourneySchema' ], domain: [ 'FenergoNebulaJourneyLogicEnginev10' ] } } },{ displayName: 'journeyTypeFilter', name: 'journeyTypeFilter', type: 'string', required: true, default: '', description: 'Optional filter(s) to retrieve matched schemas only for specified journey type.If multiple filters specified (i.e. Client Onboarding and Client Offboarding) both journey types will be returned (if matched).If empty (no filters), all matched journey types will be returned.', displayOptions: { show: { endpoint: [ 'EvaluateJourneySchema' ], domain: [ 'FenergoNebulaJourneyLogicEnginev10' ] } } }
];

async function ExecuteFenergoNebulaJourneyLogicEnginev10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    
switch(endpoint){ case 'AllowsclearingtheLogicEngineAPIcache. Thisisanmaintenanceendpointanddoesnotneedtobeusedundernormalcircumstances.': 
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeylogicengine/api/cache/flush';

break;
case 'EvaluateJourneySchema': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeylogicengine/api/engine/evaluate-journey-schema';
requestOptions.qs = { journeyTypeFilter: base.getNodeParameter('journeyTypeFilter', 0) as string };
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
    FenergoNebulaJourneyLogicEnginev10Properties,
    ExecuteFenergoNebulaJourneyLogicEnginev10
}
