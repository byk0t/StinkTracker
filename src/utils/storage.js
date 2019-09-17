import AsyncStorage from "@react-native-community/async-storage";
import { log} from "./logger";

export async function updateLastRequestTime() {
	try {
		const now = (new Date()).getTime().toString();
		await AsyncStorage.setItem('@last_request_time', now);
	} catch (e) {
		// saving error
		log(e);
	}
}

export async function getLastRequestTime() {
	try {
		const value = await AsyncStorage.getItem('@last_request_time')
		if(value !== null) {
			return parseInt(value);
		}
	} catch(e) {
		log(e);
	}
	return 0;
}