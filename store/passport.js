import api from './api';

export const state = () => ({
	countryList: {},
	currentCountry: 'NL',
	compareCountries: []
});

export const mutations = {
	setCountryList(state, value) {
		state.countryList = value;
	},
	setCountry(state, value) {
		state.countryList.find((o) => o.id === value.id).data = value.data;
	},
	setCurrentCountry(state, name) {
		state.currentCountry = name;
	},
	toggleCompare(state, value) {
		if (state.compareCountries.includes(value)) {
			state.compareCountries.splice(state.compareCountries.indexOf(value), 1);
		} else {
			state.compareCountries.push(value);
		}
	},
	resetCompare(state) {
		state.compareCountries = [];
	}
};

export const actions = {
	setCountry({ commit }, value) {
		commit('setCurrentCountry', value);
	},
	setCountryList({ state, commit }) {
		// Populate the CountryList if its not done already.
		if (Object.keys(state.countryList).length < 1) {
			api.getCountryList().then(({ data }) => {
				commit('setCountryList', data);
			});
		}
	},
	setCurrentCountry({ commit }, value) {
		commit('setCurrentCountry', value);
	},
	getCountryList: (store) => {
		if (Object.keys(store.state.countryList).length < 1) {
			store.dispatch('setCountryList');
		}
	},
	resetCompare({ commit }) {
		commit('resetCompare');
	}
};

export const getters = {
	getCurrentCountry(state) {
		return state.countryList.find((item) => {
			return item.id === state.currentCountry;
		});
	}
};
