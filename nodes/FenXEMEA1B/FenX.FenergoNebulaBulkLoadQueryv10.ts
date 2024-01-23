import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let FenergoNebulaBulkLoadQueryv10Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: '', value: 'GetAllJobs' },{ name: '', value: 'GetAllActiveJobs' },{ name: 'Get Bulk Load Job by id', value: 'GetJob' },{ name: '', value: 'GetInputTemplateSignedUrl' },{ name: '', value: 'GetErrorFileSignedUrl' },{ name: '', value: 'GetDataSourceUploadSignedUrl' },{ name: '', value: 'GetIngestionReportSignedUrl' },{ name: '', value: 'GetIngestionReport' },{ name: '', value: 'GetUpserts' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaBulkLoadQueryv10',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'Id of an existing migration', displayOptions: { show: { endpoint: [ 'GetJob' ], domain: [ 'FenergoNebulaBulkLoadQueryv10' ] } } },{ displayName: 'jobId', name: 'jobId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetInputTemplateSignedUrl' ], domain: [ 'FenergoNebulaBulkLoadQueryv10' ] } } },{ displayName: 'jobId', name: 'jobId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetErrorFileSignedUrl' ], domain: [ 'FenergoNebulaBulkLoadQueryv10' ] } } },{ displayName: 'jobId', name: 'jobId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetDataSourceUploadSignedUrl' ], domain: [ 'FenergoNebulaBulkLoadQueryv10' ] } } },{ displayName: 'type', name: 'type', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetDataSourceUploadSignedUrl' ], domain: [ 'FenergoNebulaBulkLoadQueryv10' ] } } },{ displayName: 'jobId', name: 'jobId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetIngestionReportSignedUrl' ], domain: [ 'FenergoNebulaBulkLoadQueryv10' ] } } },{ displayName: 'jobId', name: 'jobId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetIngestionReport' ], domain: [ 'FenergoNebulaBulkLoadQueryv10' ] } } },{ displayName: 'jobId', name: 'jobId', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetUpserts' ], domain: [ 'FenergoNebulaBulkLoadQueryv10' ] } } },{ displayName: 'name', name: 'name', type: 'string', required: true, default: '', description: '', displayOptions: { show: { endpoint: [ 'GetAllJobs' ], domain: [ 'FenergoNebulaBulkLoadQueryv10' ] } } }
];

async function ExecuteFenergoNebulaBulkLoadQueryv10(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let id=''; let jobId=''; let type='';
switch(endpoint){ case 'GetAllJobs': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/bulkloadquery/api/jobs';
requestOptions.qs = { name: base.getNodeParameter('name', 0) as string };
break;
case 'GetAllActiveJobs': 
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/bulkloadquery/api/jobs/active';

break;
case 'GetJob': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/bulkloadquery/api/jobs/{id}'.replace('{id}', id);

break;
case 'GetInputTemplateSignedUrl': jobId = base.getNodeParameter('jobId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/bulkloadquery/api/jobs/{jobId}/input-template-signed-url'.replace('{jobId}', jobId);

break;
case 'GetErrorFileSignedUrl': jobId = base.getNodeParameter('jobId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/bulkloadquery/api/jobs/{jobId}/error-file-signed-url'.replace('{jobId}', jobId);

break;
case 'GetDataSourceUploadSignedUrl': jobId = base.getNodeParameter('jobId', 0) as string;
type = base.getNodeParameter('type', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/bulkloadquery/api/jobs/{jobId}/data-source-upload-signed-url/{type}'.replace('{jobId}', jobId).replace('{type}', type);

break;
case 'GetIngestionReportSignedUrl': jobId = base.getNodeParameter('jobId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/bulkloadquery/api/jobs/{jobId}/ingestion-report-signed-url'.replace('{jobId}', jobId);

break;
case 'GetIngestionReport': jobId = base.getNodeParameter('jobId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/bulkloadquery/api/jobs/{jobId}/ingestion-report'.replace('{jobId}', jobId);

break;
case 'GetUpserts': jobId = base.getNodeParameter('jobId', 0) as string;
requestOptions.method = 'GET';
requestOptions.uri = 'https://api.emea1b.fenergox.com/bulkloadquery/api/jobs/{jobId}/upserts'.replace('{jobId}', jobId);

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
    FenergoNebulaBulkLoadQueryv10Properties,
    ExecuteFenergoNebulaBulkLoadQueryv10
}
