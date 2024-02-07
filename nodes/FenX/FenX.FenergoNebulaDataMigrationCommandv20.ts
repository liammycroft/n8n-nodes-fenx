import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenX.node';

let FenergoNebulaDataMigrationCommandv20Properties: INodeProperties[] = [
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            { name: 'Adds the information about the file data source and generate a signed url to upload the file', value: 'GenerateSignedUrlToUploadFile' },{ name: 'Creates a migration instance that holds and control the data flow.', value: 'CreateMigration' },{ name: 'Starts a migration', value: 'StartMigration' },{ name: 'Starts only an association migration', value: 'StartAssociationMigration' },{ name: 'Deletes a file previously added to a migration instance', value: 'DeleteMigrationFile' },{ name: 'Generates a signed url for the migration records csv file.', value: 'GenerateMigrationRecordsFileSignedUrl' },{ name: 'Creates an ingestion process that allows users to create or overwrite record references using the response pre-signed url.', value: 'CreateRecordReferenceIngestion' },{ name: 'Create an execution for the ingestion process that will start immediately and which purpose is to ingest the record reference file.', value: 'CreateRecordReferenceIngestionExecution' },{ name: 'Create an execution for jurisdiction evaluation', value: 'CreateJurisdictionEvaluationWithExecutionHandler' },{ name: 'Create an execution for the jurisdiction evaluation that will start immediately and which purpose is to re-evaluate the jurisdictions of migrated entities.', value: 'CreateJurisdictionEvaluationExecution' },{ name: 'Create an execution for Access Layer Propagation', value: 'CreateAccessLayerPropagationWithExecutionHandler' },{ name: 'Create an execution for the Access Layer propagation that will start immediately and which purpose is to propagate the access layers of migrated entities.', value: 'CreateAccessLayerPropagationExecution' },{ name: 'Deletes all the files in the migration', value: 'CleanUpInputFiles' }
        ],
        displayOptions: {
            show: {
                domain: [
                    'FenergoNebulaDataMigrationCommandv20',
                ],
            },
        },
        default: '',
        required: true,
        description: 'Operation to execute',
    }, { displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The data migration id to start', displayOptions: { show: { endpoint: [ 'GenerateSignedUrlToUploadFile' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the migration to start', displayOptions: { show: { endpoint: [ 'StartMigration' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The migration Id to start', displayOptions: { show: { endpoint: [ 'StartAssociationMigration' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The id of the migration', displayOptions: { show: { endpoint: [ 'DeleteMigrationFile' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'tableName', name: 'tableName', type: 'string', required: true, default: '', description: 'Table name related with the file', displayOptions: { show: { endpoint: [ 'DeleteMigrationFile' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The id of the migration', displayOptions: { show: { endpoint: [ 'GenerateMigrationRecordsFileSignedUrl' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the record-reference-ingestion process returned provided when requesting pre-signed url.', displayOptions: { show: { endpoint: [ 'CreateRecordReferenceIngestionExecution' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the jurisdiction-evaluation process returned provided when triggering jurisdiction evaluation', displayOptions: { show: { endpoint: [ 'CreateJurisdictionEvaluationExecution' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The Id of the access layer propagation process returned provided when triggering access layer propagation', displayOptions: { show: { endpoint: [ 'CreateAccessLayerPropagationExecution' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'id', name: 'id', type: 'string', required: true, default: '', description: 'The id of the migration', displayOptions: { show: { endpoint: [ 'CleanUpInputFiles' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "fileName": "fileName", "tableName": "tableName" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'GenerateSignedUrlToUploadFile' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "jurisdictions": [ "" ], "jurisdiction": "jurisdiction", "productJurisdiction": "productJurisdiction" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateMigration' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "dataMigrationId": "dataMigrationId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateJurisdictionEvaluationWithExecutionHandler' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "dataMigrationId": "dataMigrationId" } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CreateAccessLayerPropagationWithExecutionHandler' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } },{ displayName: 'Request', name: 'request', type: 'json', required: true, default: '{ "data": { "force": false } }', description: 'Request body', displayOptions: { show: { endpoint: [ 'CleanUpInputFiles' ], domain: [ 'FenergoNebulaDataMigrationCommandv20' ] } } }
];

async function ExecuteFenergoNebulaDataMigrationCommandv20(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

    let id=''; let tableName='';
switch(endpoint){ case 'GenerateSignedUrlToUploadFile': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/migration/{id}/add-file'.replace('{id}', id);

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateMigration': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/migration';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'StartMigration': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/migration/{id}/start'.replace('{id}', id);

break;
case 'StartAssociationMigration': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/migration/{id}/startAssociation'.replace('{id}', id);

break;
case 'DeleteMigrationFile': id = base.getNodeParameter('id', 0) as string;
tableName = base.getNodeParameter('tableName', 0) as string;
requestOptions.method = 'DELETE';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/migration/{id}/{tableName}'.replace('{id}', id).replace('{tableName}', tableName);

break;
case 'GenerateMigrationRecordsFileSignedUrl': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'PUT';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/migration/{id}/migration-records-file-signed-url'.replace('{id}', id);

break;
case 'CreateRecordReferenceIngestion': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/record-reference-ingestion';

break;
case 'CreateRecordReferenceIngestionExecution': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/record-reference-ingestion/{id}/execution'.replace('{id}', id);

break;
case 'CreateJurisdictionEvaluationWithExecutionHandler': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/jurisdiction-evaluation-execution';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateJurisdictionEvaluationExecution': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/jurisdiction-evaluation/{id}/execution'.replace('{id}', id);

break;
case 'CreateAccessLayerPropagationWithExecutionHandler': 
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/access-layer-propagation-execution';

requestOptions.body = base.getNodeParameter('request', 0) as string; requestOptions.json = true;break;
case 'CreateAccessLayerPropagationExecution': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/access-layer-propagation/{id}/execution'.replace('{id}', id);

break;
case 'CleanUpInputFiles': id = base.getNodeParameter('id', 0) as string;
requestOptions.method = 'POST';
requestOptions.uri = 'https://api.fenergox.com/datamigrationcommand/api/v2/migration/{id}/input-files-clean-up'.replace('{id}', id);

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
    FenergoNebulaDataMigrationCommandv20Properties,
    ExecuteFenergoNebulaDataMigrationCommandv20
}
