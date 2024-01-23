import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaCovenantsConditionsQueryAPIv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get a Covenant Condition Set of specified Id with all Version data', value: 'GetCovenantConditionSetById' },{ name: 'Get Covenant Condition Details for specified Parent Id, Journey and Task Id, with all and latest version.', value: 'GetCovenantConditionDataByParentJourneyTaskId' },{ name: 'Get a full Covenant Condition Version of specified Id', value: 'GetCovenantConditionVersionById' },{ name: 'Get a Covenant Condition Set with all versions of specified Parent Id', value: 'GetCovenantConditionSetByParentId' },{ name: 'Get a policy snapshot for Covenant Condition by version number', value: 'GetCovenantConditionConfigurationSnapshotBySetVersionId' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaCovenantsConditionsQueryAPIv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'The Id of the Covenant Condition Set', displayOptions: { show: { endpoint: [ 'GetCovenantConditionSetById' ], domain: [ 'FenergoNebulaCovenantsConditionsQueryAPIv10' ] } } },{ displayName: 'parentId', name: 'parentId', type: 'string', required: true, default: '', description: 'The Parent Id of the Covenant Condition Set', displayOptions: { show: { endpoint: [ 'GetCovenantConditionDataByParentJourneyTaskId' ], domain: [ 'FenergoNebulaCovenantsConditionsQueryAPIv10' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: 'Journey Id', displayOptions: { show: { endpoint: [ 'GetCovenantConditionDataByParentJourneyTaskId' ], domain: [ 'FenergoNebulaCovenantsConditionsQueryAPIv10' ] } } },{ displayName: 'taskId', name: 'taskId', type: 'string', required: true, default: '', description: 'Task Id', displayOptions: { show: { endpoint: [ 'GetCovenantConditionDataByParentJourneyTaskId' ], domain: [ 'FenergoNebulaCovenantsConditionsQueryAPIv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The id of the Covenant Condition Version to retrieve', displayOptions: { show: { endpoint: [ 'GetCovenantConditionVersionById' ], domain: [ 'FenergoNebulaCovenantsConditionsQueryAPIv10' ] } } },{ displayName: 'parentId', name: 'parentId', type: 'string', required: true, default: '', description: 'The Parent Id of the Covenant Condition Sets', displayOptions: { show: { endpoint: [ 'GetCovenantConditionSetByParentId' ], domain: [ 'FenergoNebulaCovenantsConditionsQueryAPIv10' ] } } },{ displayName: 'setId', name: 'setId', type: 'string', required: true, default: '', description: 'The set id of the policy snapshot for Covenant Condition to retrieve', displayOptions: { show: { endpoint: [ 'GetCovenantConditionConfigurationSnapshotBySetVersionId' ], domain: [ 'FenergoNebulaCovenantsConditionsQueryAPIv10' ] } } },{ displayName: 'versionId', name: 'versionId', type: 'string', required: true, default: '', description: 'The version Id of the policy snapshot for Covenant Condition to retrieve', displayOptions: { show: { endpoint: [ 'GetCovenantConditionConfigurationSnapshotBySetVersionId' ], domain: [ 'FenergoNebulaCovenantsConditionsQueryAPIv10' ] } } }
];

async function ExecuteFenergoNebulaCovenantsConditionsQueryAPIv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let setId=''; let parentId=''; let journeyId=''; let taskId=''; let id=''; let versionId='';
switch(endpoint){ case 'GetCovenantConditionSetById': setId = base.getNodeParameter('setId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/covenantsconditionsquery/api/covenantcondition/set/{setId}'.replace('{setId}', setId);

break;
case 'GetCovenantConditionDataByParentJourneyTaskId': parentId = base.getNodeParameter('parentId', 0) as string;
journeyId = base.getNodeParameter('journeyId', 0) as string;
taskId = base.getNodeParameter('taskId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/covenantsconditionsquery/api/covenantcondition/data/parent/{parentId}/journey/{journeyId}/task/{taskId}'.replace('{parentId}', parentId).replace('{journeyId}', journeyId).replace('{taskId}', taskId);

break;
case 'GetCovenantConditionVersionById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/covenantsconditionsquery/api/covenantcondition/version/{id}'.replace('{id}', id);

break;
case 'GetCovenantConditionSetByParentId': parentId = base.getNodeParameter('parentId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/covenantsconditionsquery/api/covenantcondition/set/parent/{parentId}'.replace('{parentId}', parentId);

break;
case 'GetCovenantConditionConfigurationSnapshotBySetVersionId': setId = base.getNodeParameter('setId', 0) as string;
versionId = base.getNodeParameter('versionId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/covenantsconditionsquery/api/covenantcondition/set/{setId}/version/{versionId}/snapshot'.replace('{setId}', setId).replace('{versionId}', versionId);

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
    FenergoNebulaCovenantsConditionsQueryAPIv10Properties,
    ExecuteFenergoNebulaCovenantsConditionsQueryAPIv10
}
