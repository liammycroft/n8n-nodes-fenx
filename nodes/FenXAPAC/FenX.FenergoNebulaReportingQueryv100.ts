import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXAPAC.node';

let FenergoNebulaReportingQueryv100Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Get entities created report', value: 'GetEntityCreatedReport' },{ name: 'Get entities created file report', value: 'GetEntityCreatedFileReport' },{ name: 'Get entities updated report', value: 'GetEntityUpdatedReport' },{ name: 'Get entities updated file report', value: 'GetEntityUpdatedFileReport' },{ name: 'Get report for journey started property', value: 'GetJourneyStartedReport' },{ name: 'Get file report for journey started property', value: 'GetJourneyStartedFileReport' },{ name: 'Get report for journey completed property', value: 'GetJourneyCompletedReport' },{ name: 'Get file report for journey completed property', value: 'GetJourneyCompletedFileReport' },{ name: 'Get report for journey updated property', value: 'GetJourneyUpdatedReport' },{ name: 'Get file report for journey updated property', value: 'GetJourneyUpdatedFileReport' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaReportingQueryv100',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2276785+00:00", "endDate": "2023-11-07T11:29:18.2276894+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetEntityCreatedReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2277272+00:00", "endDate": "2023-11-07T11:29:18.2277298+00:00", "fileFormat": "csv" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetEntityCreatedFileReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2277457+00:00", "endDate": "2023-11-07T11:29:18.2277474+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetEntityUpdatedReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2277592+00:00", "endDate": "2023-11-07T11:29:18.2277609+00:00", "fileFormat": "csv" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetEntityUpdatedFileReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2277736+00:00", "endDate": "2023-11-07T11:29:18.2277754+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetJourneyStartedReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2277871+00:00", "endDate": "2023-11-07T11:29:18.2277888+00:00", "fileFormat": "csv" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetJourneyStartedFileReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2278022+00:00", "endDate": "2023-11-07T11:29:18.2278038+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetJourneyCompletedReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2278203+00:00", "endDate": "2023-11-07T11:29:18.2278222+00:00", "fileFormat": "csv" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetJourneyCompletedFileReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2278395+00:00", "endDate": "2023-11-07T11:29:18.2278429+00:00" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetJourneyUpdatedReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "startDate": "2023-11-07T11:29:18.2278649+00:00", "endDate": "2023-11-07T11:29:18.2278673+00:00", "fileFormat": "csv" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GetJourneyUpdatedFileReport' ], domain: [ 'FenergoNebulaReportingQueryv100' ] } } }
];

async function ExecuteFenergoNebulaReportingQueryv100(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    
switch(endpoint){ case 'GetEntityCreatedReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/entity-report/entity-created-report';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetEntityCreatedFileReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/entity-report/entity-created-report/file';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetEntityUpdatedReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/entity-report/entity-updated-report';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetEntityUpdatedFileReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/entity-report/entity-updated-report/file';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetJourneyStartedReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/journey-report/journey-started-report';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetJourneyStartedFileReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/journey-report/journey-started-report/file';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetJourneyCompletedReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/journey-report/journey-completed-report';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetJourneyCompletedFileReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/journey-report/journey-completed-report/file';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetJourneyUpdatedReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/journey-report/journey-updated-report';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'GetJourneyUpdatedFileReport': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.apac1.fenergox.com/reportingquery/api/journey-report/journey-updated-report/file';

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
    FenergoNebulaReportingQueryv100Properties,
    ExecuteFenergoNebulaReportingQueryv100
}
