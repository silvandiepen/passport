export const getters = {
	getCountry(state) {
		return (keyword) =>
			state.passport.countryList.find((item) => {
				return item.id === keyword;
			});
	},
	getCurrentCountry(state) {
		return state.passport.countryList.find((item) => {
			return item.id === state.passport.currentCountry;
		});
	}
};
