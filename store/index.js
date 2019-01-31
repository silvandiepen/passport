export const state = () => ({
	test: 1
});

export const getters = {
	getCountry(state) {
		return (keyword) =>
			state.passport.countryList.find((item) => {
				return item.id === keyword;
			});
	}
};
