import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXAPAC.node';

let FenergoNebulaDashboardsQueryv100Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get in progress journeys assigned to the specified team.', value: 'GetTeamJourneyDashboard' },{ name: 'Get in progress journeys assigned to the specified team without tasks.', value: 'GetTeamJourneyDashboardLite' },{ name: 'Get in progress journeys assigned to the specified team without tasks.', value: 'GetTeamJourneyDashboardPreview' },{ name: 'Get in progress journeys assigned to the specified team without tasks.', value: 'GetTeamJourneys' },{ name: 'Get all journeys for a given entity', value: 'GetEntityJourneys' },{ name: 'Get tasks for given journey', value: 'GetJourneyTasks' },{ name: 'Get journey milestones with tasks for given journey', value: 'getJourneyMilestonesTasks' },{ name: 'Get journey stats like number of journeys completed or average journey time.', value: 'GetJourneyStatsDashboard' },{ name: 'Get tasks assigned to the specified user.', value: 'GetUserTasksDashboard' },{ name: 'Get favourite tasks assigned to the specified user.', value: 'GetFavouriteTasksDashboard' },{ name: 'Get team tasks dashboard', value: 'GetTeamTasksDashboard' },{ name: 'Get unassigned tasks assigned to the specified team.', value: 'GetUnassignedTasksDashboard' },{ name: 'Get unassigned tasks assigned to the specified team.', value: 'GetUnassignedTasksDashboardPreview' },{ name: 'Get unassigned tasks assigned to the specified team.', value: 'GetUserUnassignedTasks' },{ name: 'Get journeys with tasks assigned to the specified user.', value: 'GetUserJourneyDashboard' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaDashboardsQueryv100',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'entityId', name: 'entityId', type: 'string', required: true, default: '', description: 'The UiD of the entity', displayOptions: { show: { endpoint: [ 'GetEntityJourneys' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetJourneyTasks' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'journeyId', name: 'journeyId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'getJourneyMilestonesTasks' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'userId', name: 'userId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetUserTasksDashboard' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'userId', name: 'userId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetFavouriteTasksDashboard' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'userId', name: 'userId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetUserJourneyDashboard' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetTeamJourneyDashboard' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetTeamJourneyDashboardLite' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetTeamJourneyDashboardPreview' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetTeamJourneys' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetJourneyTasks' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'getJourneyMilestonesTasks' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "teamIds": [ "" ], "dashboardRange": "Daily" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetJourneyStatsDashboard' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetTeamTasksDashboard' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetUnassignedTasksDashboard' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetUnassignedTasksDashboardPreview' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": [ "" ] }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetUserUnassignedTasks' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } },{ displayName: 'status', name: 'status', type: 'string', required: true, default: '', description: 'Task status', displayOptions: { show: { endpoint: [ 'GetUserUnassignedTasks' ], domain: [ 'FenergoNebulaDashboardsQueryv100' ] } } }
];

async function ExecuteFenergoNebulaDashboardsQueryv100(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let entityId=''; let journeyId=''; let userId='';
switch(endpoint){ case 'GetTeamJourneyDashboard': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/journey-dashboard';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetTeamJourneyDashboardLite': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/journey-dashboard/lite';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetTeamJourneyDashboardPreview': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/journey-dashboard/preview';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetTeamJourneys': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/journey-dashboard/journeys';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetEntityJourneys': entityId = base.getNodeParameter('entityId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/journey-dashboard/journeys/entity/{entityId}'.replace('{entityId}', entityId);

break;
case 'GetJourneyTasks': journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/journey-dashboard/tasks/{journeyId}'.replace('{journeyId}', journeyId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'getJourneyMilestonesTasks': journeyId = base.getNodeParameter('journeyId', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/journey-dashboard/journeyMilestonesTasks/{journeyId}'.replace('{journeyId}', journeyId);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetJourneyStatsDashboard': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/journey-stats';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetUserTasksDashboard': userId = base.getNodeParameter('userId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/task-queue/{userId}'.replace('{userId}', userId);

break;
case 'GetFavouriteTasksDashboard': userId = base.getNodeParameter('userId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/task-queue/favourites/{userId}'.replace('{userId}', userId);

break;
case 'GetTeamTasksDashboard': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/team-tasks';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetUnassignedTasksDashboard': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/unassigned-task';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetUnassignedTasksDashboardPreview': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/unassigned-task/preview';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetUserUnassignedTasks': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/unassigned-task/tasks';
requestOptions.qs = { status: base.getNodeParameter('status', 0) as string };
requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetUserJourneyDashboard': userId = base.getNodeParameter('userId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.apac1.fenergox.com/dashboardsquery/api/user-journey-dashboard/{userId}'.replace('{userId}', userId);

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
    FenergoNebulaDashboardsQueryv100Properties,
    ExecuteFenergoNebulaDashboardsQueryv100
}
