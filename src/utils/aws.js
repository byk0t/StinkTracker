import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import { createStink } from '../graphql/mutations';
import { log } from "./logger";
import config from '../../aws-exports'

API.configure(config)             // Configure Amplify
PubSub.configure(config)

export async function createNewStink(stink) {
	let result = false;
	try {
		const response = await API.graphql(graphqlOperation(createStink, { input: stink }));
		if(typeof response.data.createStink !== 'undefined') {
			result = true;
		}
	} catch(error) {
		log(error);
	}
	return result;
}