export const errorHandler = (() => {
	const message = 'Something went wrong. Refresh this page';
	let instance;

	const getError = () => alert(message);

	const createInstance = () => {
		return {
			getError: getError
		}
	}

	return {
		getInstance: () => {
			return instance || (instance = createInstance());
		}
	}

})();
