import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';


export class FenXEMEA1B implements ICredentialType {
	name = 'fenXEMEA1B';
	displayName = 'Fen-X EMEA1B API';
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
