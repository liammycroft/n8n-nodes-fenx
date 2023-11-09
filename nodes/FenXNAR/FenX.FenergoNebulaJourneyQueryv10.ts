import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXNAR.node';

let FenergoNebulaJourneyQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get journey instance by id', value: 'GetJourneyInstanceById' },{ name: 'Get journey instance task by id', value: 'GetTaskById' },{ name: 'Get journey instances by entity id', value: 'GetInstancesByEntityId' },{ name: 'Get linked journeys by main journey id', value: 'GetLinkedJourneysById' },{ name: 'Get lifecycle status of all journey instances by entity id', value: 'GetLifecycleStatusByEntityId' },{ name: 'Get Journey Launch Controls by Id', value: 'GetJourneyLaunchControlsById' },{ name: 'Get All Journey Launch Controls', value: 'GetJourneyLaunchControls' },{ name: 'Get journey Schedules', value: 'GetAllJourneySchedules' },{ name: 'Get journey Schedule by id', value: 'GetJourneyScheduleById' },{ name: 'Get journey Schedule by id and version', value: 'GetJourneyScheduleVersionById' },{ name: 'Search Journey Schedule Date records by the Schedule Date', value: 'GetScheduleDatesByScheduleDate' },{ name: 'Get journey Schedule Date by id', value: 'GetJourneyScheduleDateById' },{ name: 'Get journey schemas (lite)', value: 'GetAllJourneySchemasLite' },{ name: 'Get journey schema by id', value: 'GetJourneySchemaById' },{ name: 'Get journey schema by id and version', value: 'GetJourneySchemaVersionById' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaJourneyQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'journeyInstanceId', name: 'journeyInstanceId', type: 'string', required: true, default: '', description: 'Journey instance id', displayOptions: { show: { endpoint: [ 'GetJourneyInstanceById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'journeyInstanceId', name: 'journeyInstanceId', type: 'string', required: true, default: '', description: 'Journey instance id', displayOptions: { show: { endpoint: [ 'GetTaskById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'taskId', name: 'taskId', type: 'string', required: true, default: '', description: 'Task id', displayOptions: { show: { endpoint: [ 'GetTaskById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'journeyInstanceId', name: 'journeyInstanceId', type: 'string', required: true, default: '', description: 'Parent Journey instance id', displayOptions: { show: { endpoint: [ 'GetLinkedJourneysById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'Entity id', displayOptions: { show: { endpoint: [ 'GetLifecycleStatusByEntityId' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetJourneyLaunchControlsById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'journeyScheduleId', name: 'journeyScheduleId', type: 'string', required: true, default: '', description: 'Journey Schedule id', displayOptions: { show: { endpoint: [ 'GetJourneyScheduleById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'journeyScheduleId', name: 'journeyScheduleId', type: 'string', required: true, default: '', description: 'Journey Schedule id', displayOptions: { show: { endpoint: [ 'GetJourneyScheduleVersionById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Journey Schedule version number', displayOptions: { show: { endpoint: [ 'GetJourneyScheduleVersionById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'journeyScheduleDateId', name: 'journeyScheduleDateId', type: 'string', required: true, default: '', description: 'Journey Schedule id', displayOptions: { show: { endpoint: [ 'GetJourneyScheduleDateById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'journeySchemaId', name: 'journeySchemaId', type: 'string', required: true, default: '', description: 'Journey schema id', displayOptions: { show: { endpoint: [ 'GetJourneySchemaById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'journeySchemaId', name: 'journeySchemaId', type: 'string', required: true, default: '', description: 'Journey schema id', displayOptions: { show: { endpoint: [ 'GetJourneySchemaVersionById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'versionNumber', name: 'versionNumber', type: 'string', required: true, default: '', description: 'Journey schema version number', displayOptions: { show: { endpoint: [ 'GetJourneySchemaVersionById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'Entity id', displayOptions: { show: { endpoint: [ 'GetInstancesByEntityId' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'onlyActive', name: 'onlyActive', type: 'string', required: true, default: '', description: 'If set to `true` return only linked journeys with Active status otherwise it will return everything including Rejected.', displayOptions: { show: { endpoint: [ 'GetLinkedJourneysById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'applicationType', name: 'applicationType', type: 'string', required: true, default: '', description: 'Name of the initial triggered service', displayOptions: { show: { endpoint: [ 'GetLinkedJourneysById' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } },{ displayName: 'scheduleDate', name: 'scheduleDate', type: 'string', required: true, default: '', description: 'The date the journeys are scheduled for launch e.g. 2019-01-31', displayOptions: { show: { endpoint: [ 'GetScheduleDatesByScheduleDate' ], domain: [ 'FenergoNebulaJourneyQueryv10' ] } } }
];

async function ExecuteFenergoNebulaJourneyQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let journeyInstanceId=''; let taskId=''; let entityId=''; let id=''; let journeyScheduleId=''; let versionNumber=''; let journeyScheduleDateId=''; let journeySchemaId='';
switch(endpoint){ case 'GetJourneyInstanceById': journeyInstanceId = base.getNodeParameter('journeyInstanceId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-instance/{journeyInstanceId}'.replace('{journeyInstanceId}', journeyInstanceId);

break;
case 'GetTaskById': journeyInstanceId = base.getNodeParameter('journeyInstanceId', 0) as string;
taskId = base.getNodeParameter('taskId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-instance/{journeyInstanceId}/task/{taskId}'.replace('{journeyInstanceId}', journeyInstanceId).replace('{taskId}', taskId);

break;
case 'GetInstancesByEntityId': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-instance/search';
requestOptions.qs = { entityId: base.getNodeParameter('entityId', 0) as string };
break;
case 'GetLinkedJourneysById': journeyInstanceId = base.getNodeParameter('journeyInstanceId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-instance/{journeyInstanceId}/linked-journeys'.replace('{journeyInstanceId}', journeyInstanceId);
requestOptions.qs = { onlyActive: base.getNodeParameter('onlyActive', 0) as string,applicationType: base.getNodeParameter('applicationType', 0) as string };
break;
case 'GetLifecycleStatusByEntityId': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-instance/lifecycle-status/entity/{entityId}'.replace('{entityId}', entityId);

break;
case 'GetJourneyLaunchControlsById': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-launch-controls/{id}'.replace('{id}', id);

break;
case 'GetJourneyLaunchControls': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-launch-controls';

break;
case 'GetAllJourneySchedules': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-schedule';

break;
case 'GetJourneyScheduleById': journeyScheduleId = base.getNodeParameter('journeyScheduleId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-schedule/{journeyScheduleId}'.replace('{journeyScheduleId}', journeyScheduleId);

break;
case 'GetJourneyScheduleVersionById': journeyScheduleId = base.getNodeParameter('journeyScheduleId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-schedule/{journeyScheduleId}/version/{versionNumber}'.replace('{journeyScheduleId}', journeyScheduleId).replace('{versionNumber}', versionNumber);

break;
case 'GetScheduleDatesByScheduleDate': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-schedule-date/search';
requestOptions.qs = { scheduleDate: base.getNodeParameter('scheduleDate', 0) as string };
break;
case 'GetJourneyScheduleDateById': journeyScheduleDateId = base.getNodeParameter('journeyScheduleDateId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-schedule-date/{journeyScheduleDateId}'.replace('{journeyScheduleDateId}', journeyScheduleDateId);

break;
case 'GetAllJourneySchemasLite': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-schema/lite';

break;
case 'GetJourneySchemaById': journeySchemaId = base.getNodeParameter('journeySchemaId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-schema/{journeySchemaId}'.replace('{journeySchemaId}', journeySchemaId);

break;
case 'GetJourneySchemaVersionById': journeySchemaId = base.getNodeParameter('journeySchemaId', 0) as string;
versionNumber = base.getNodeParameter('versionNumber', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.nar1.fenergox.com/journeyquery/api/journey-schema/{journeySchemaId}/version/{versionNumber}'.replace('{journeySchemaId}', journeySchemaId).replace('{versionNumber}', versionNumber);

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
    FenergoNebulaJourneyQueryv10Properties,
    ExecuteFenergoNebulaJourneyQueryv10
}
