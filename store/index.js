export const state = () => ({
	foldedList: false
});

export const mutations = {
	toggleList(state) {
		state.foldedList = !state.foldedList;
	},
	setFoldList(state, value) {
		state.foldedList = value;
	}
};
export const actions = {
	setFoldList({ commit }, value) {
		commit('setFoldList', value);
	},
	toggleList({ commit }) {
		commit('toggleList');
	}
};
export const getters = {
	getCountry(state) {
		return (keyword) => state.passport.countryList.find((item) => item.id === keyword);
	},
	getCurrentCountry(state) {
		return state.passport.countryList.find((item) => item.id === state.passport.currentCountry);
	}
};
