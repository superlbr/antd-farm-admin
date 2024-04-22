export default (config: { mock?: boolean; setup: () => void }) => {
	const { NODE_ENV } = typeof process == 'undefined' ? import.meta.env : process.env;
	const { mock = NODE_ENV === "development", setup } = config;
	if (mock === false) return;
	setup();
};
