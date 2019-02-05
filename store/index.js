export const getters = {
	getCountry(state) {
		return (keyword) => state.passport.countryList.find((item) => item.id === keyword);
	},
	getCurrentCountry(state) {
		return state.passport.countryList.find((item) => item.id === state.passport.currentCountry);
	}
};
