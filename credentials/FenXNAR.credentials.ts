import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';


export class FenXNAR implements ICredentialType {
	name = 'fenXNAR';
	displayName = 'Fen-X NAR API';
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'Tenant Id',
			name: 'tenant',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Client Id',
			name: 'clientId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Client Secret',
			name: 'secret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
