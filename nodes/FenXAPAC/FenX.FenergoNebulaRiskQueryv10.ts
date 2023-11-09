import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXAPAC.node';

let FenergoNebulaRiskQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Generate a new Risk Assessment', value: 'RiskAssessment' },{ name: 'Get Risk Assessment by task id', value: 'GetRiskAssessmentByTaskId' },{ name: 'Get all Risk Calculator Option Models', value: 'GetAllRiskCalculatorOptionModels' },{ name: 'Get an existing Risk Calculator Option model', value: 'GetRiskCalculatorOptionModelById' },{ name: 'Get all RiskConfiguration models', value: 'GetAllRiskConfigurationModels' },{ name: 'Get the active version of an existing RiskConfiguration model', value: 'GetRiskConfigurationModelById' },{ name: 'Get the specified version of an existing RiskConfiguration model', value: 'GetRiskConfigurationModelByVersionNumber' },{ name: 'Get the specified risk configuration collection', value: 'GetRiskConfigurationCollectionById' },{ name: 'Get the specified item of a risk configuration collection', value: 'GetRiskConfigurationItemFromCollectionByItemName' },{ name: 'Get all Risk Models', value: 'GetAllRiskModels' },{ name: 'Get the active version of an existing Risk model', value: 'GetRiskModelById' },{ name: 'Get the specified version of an existing Risk model', value: 'GetRiskModelByVersionNumber' },{ name: 'Get all scoping rule sets', value: 'GetAllScopingRuleSetsLite' },{ name: 'Get the current scoping rule set version by scopingRuleSetId', value: 'GetCurrentScopingRuleSetVersionByRuleSetId' },{ name: 'Get scoping rule set version by scopingRuleSetId and versionNumber', value: 'GetScopingRuleSetVersionByRuleSetIdAndVersionNumber' },{ name: 'Get all Threshold models', value: 'GetAllThresholdModels' },{ name: 'Get the active version of an existing Threshold model', value: 'GetThresholdModelById' },{ name: 'Get the specified version of an existing Threshold model', value: 'GetThresholdModelByVersionNumber' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaRiskQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'taskId', name: 'taskId', type: 'string', required: true, default: '', description: 'Id of the task for returning risk assessment', displayOptions: { show: { endpoint: [ 'GetRiskAssessmentByTaskId' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetRiskCalculatorOptionModelById' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetRiskConfigurationModelById' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetRiskConfigurationModelByVersionNumber' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number to retrieve', displayOptions: { show: { endpoint: [ 'GetRiskConfigurationModelByVersionNumber' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the collection to get', displayOptions: { show: { endpoint: [ 'GetRiskConfigurationCollectionById' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the collection the item belongs to', displayOptions: { show: { endpoint: [ 'GetRiskConfigurationItemFromCollectionByItemName' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'itemName', name: 'itemName', type: 'string', required: true, default: '', description: 'The name of the item to get', displayOptions: { show: { endpoint: [ 'GetRiskConfigurationItemFromCollectionByItemName' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetRiskModelById' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetRiskModelByVersionNumber' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number to retrieve', displayOptions: { show: { endpoint: [ 'GetRiskModelByVersionNumber' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'scopingRuleSetId', name: 'scopingRuleSetId', type: 'string', required: true, default: '', description: 'Scoping rule set id', displayOptions: { show: { endpoint: [ 'GetCurrentScopingRuleSetVersionByRuleSetId' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'scopingRuleSetId', name: 'scopingRuleSetId', type: 'string', required: true, default: '', description: 'Scoping rule set id', displayOptions: { show: { endpoint: [ 'GetScopingRuleSetVersionByRuleSetIdAndVersionNumber' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Scoping rule set version number', displayOptions: { show: { endpoint: [ 'GetScopingRuleSetVersionByRuleSetIdAndVersionNumber' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetThresholdModelById' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the existing model', displayOptions: { show: { endpoint: [ 'GetThresholdModelByVersionNumber' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'The version number to retrieve', displayOptions: { show: { endpoint: [ 'GetThresholdModelByVersionNumber' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "riskModelId": "riskModelId", "riskModelVersionNumber": 0, "thresholdModelId": "thresholdModelId", "thresholdModelVersionNumber": 0, "riskConfigurationModelId": "riskConfigurationModelId", "riskConfigurationModelVersionNumber": 0, "inputData": [ { "name": "name", "value": "value", "weight": 0.0 } ], "overrideScores": [ { "name": "name", "score": 0.0 } ], "riskFactorSelectedAlgorithms": [ { "factorName": "factorName", "riskLevelCalculationAlgorithm": "riskLevelCalculationAlgorithm" } ] } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'RiskAssessment' ], domain: [ 'FenergoNebulaRiskQueryv10' ] } } }
];

async function ExecuteFenergoNebulaRiskQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let taskId=''; let id=''; let versionNumber=''; let itemName=''; let scopingRuleSetId='';
switch(endpoint){ case 'RiskAssessment': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-assessment';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetRiskAssessmentByTaskId': taskId = base.getNodeParameter('taskId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-assessment/{taskId}'.replace('{taskId}', taskId);

break;
case 'GetAllRiskCalculatorOptionModels': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-calculator-options';

break;
case 'GetRiskCalculatorOptionModelById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-calculator-options/{id}'.replace('{id}', id);

break;
case 'GetAllRiskConfigurationModels': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-configuration';

break;
case 'GetRiskConfigurationModelById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-configuration/{id}'.replace('{id}', id);

break;
case 'GetRiskConfigurationModelByVersionNumber': id = base.getNodeParameter('id', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-configuration/{id}/version/{versionNumber}'.replace('{id}', id).replace('{versionNumber}', versionNumber);

break;
case 'GetRiskConfigurationCollectionById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-configuration/configuration-collection/{id}'.replace('{id}', id);

break;
case 'GetRiskConfigurationItemFromCollectionByItemName': id = base.getNodeParameter('id', 0) as string;
itemName = base.getNodeParameter('itemName', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-configuration/configuration-collection/{id}/configuration-item/{itemName}'.replace('{id}', id).replace('{itemName}', itemName);

break;
case 'GetAllRiskModels': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-model';

break;
case 'GetRiskModelById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-model/{id}'.replace('{id}', id);

break;
case 'GetRiskModelByVersionNumber': id = base.getNodeParameter('id', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/risk-model/{id}/version/{versionNumber}'.replace('{id}', id).replace('{versionNumber}', versionNumber);

break;
case 'GetAllScopingRuleSetsLite': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/scoping-rule-set';

break;
case 'GetCurrentScopingRuleSetVersionByRuleSetId': scopingRuleSetId = base.getNodeParameter('scopingRuleSetId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/scoping-rule-set/{scopingRuleSetId}'.replace('{scopingRuleSetId}', scopingRuleSetId);

break;
case 'GetScopingRuleSetVersionByRuleSetIdAndVersionNumber': scopingRuleSetId = base.getNodeParameter('scopingRuleSetId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/scoping-rule-set/{scopingRuleSetId}/version/{versionNumber}'.replace('{scopingRuleSetId}', scopingRuleSetId).replace('{versionNumber}', versionNumber);

break;
case 'GetAllThresholdModels': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/threshold-model';

break;
case 'GetThresholdModelById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/threshold-model/{id}'.replace('{id}', id);

break;
case 'GetThresholdModelByVersionNumber': id = base.getNodeParameter('id', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/riskquery/api/threshold-model/{id}/version/{versionNumber}'.replace('{id}', id).replace('{versionNumber}', versionNumber);

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
    FenergoNebulaRiskQueryv10Properties,
    ExecuteFenergoNebulaRiskQueryv10
}
