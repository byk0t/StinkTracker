export const log = (...data) => {
	if(__DEV__) {
		console.log(data);
	}
}