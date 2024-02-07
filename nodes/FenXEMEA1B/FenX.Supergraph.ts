import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeProperties,
    NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { FenXToken } from './FenXEMEA1B.node';

let SupergraphProperties: INodeProperties[] = [
    {
        displayName: 'Operation Name',
        name: 'operationName',
        type: 'string',
        required: true,
        default: 'Entity',
        description: 'Operation name',
        displayOptions: {
            show: {
                domain: [
                    'Supergraph',
                ],
            },
        }
    }, {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        required: true,
        default: '',
        description: 'The GraphQL query',
        displayOptions: {
            show: {
                domain: [
                    'Supergraph',
                ],
            },
        }
    }, {
        displayName: 'Variables',
        name: 'variables',
        type: 'json',
        required: true,
        default: '',
        description: 'Variables',
        displayOptions: {
            show: {
                domain: [
                    'Supergraph',
                ],
            },
        }
    }
];

async function ExecuteSupergraph(base: IExecuteFunctions): Promise < INodeExecutionData[][] > {
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

requestOptions.method = 'POST';
requestOptions.uri = 'https://api.emea1b.fenergox.com/supergraph';
requestOptions.body = {};
requestOptions.body.operationName = base.getNodeParameter('operationName',  0) as string;
requestOptions.body.query = base.getNodeParameter('query',  0) as string;
requestOptions.body.variables = JSON.parse(base.getNodeParameter('variables',  0) as string);

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
SupergraphProperties,
    ExecuteSupergraph
}
