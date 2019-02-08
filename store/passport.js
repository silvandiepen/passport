import api from './api';

export const state = () => ({
	countryList: {},
	currentCountry: 'NL',
	compareCountries: []
});

export const mutations = {
	setCountryList(state, value) {
		state.countryList = value;
		return true;
	},
	setCountry(state, value) {
		state.countryList.find((o) => o.id === value.id).data = value.data;
		return true;
	},
	setCurrentCountry(state, name) {
		state.currentCountry = name;
		return true;
	},
	toggleCompare(state, value) {
		if (state.compareCountries.includes(value)) {
			state.compareCountries.splice(state.compareCountries.indexOf(value), 1);
		} else {
			if (state.compareCountries.length < 8) {
				state.compareCountries.push(value);
			} else {
				alert("8 is enough, don't you think?");
			}
		}
		return true;
	},
	setCompareCountries(state, value) {
		state.compareCountries = value;
		return true;
	},
	removeFromCompare(state, value) {
		state.compareCountries.splice(state.compareCountries.indexOf(value), 1);
		return true;
	},
	resetCompare(state) {
		state.compareCountries = [];
		return true;
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
		} else {
			return true;
		}
	},
	setCurrentCountry({ commit }, value) {
		commit('setCurrentCountry', value);
	},
	setCompareCountries({ commit }, value) {
		commit('setCompareCountries', value);
	},
	getCountryList: (store) => {
		if (Object.keys(store.state.countryList).length < 1) {
			store.dispatch('setCountryList').then(() => {
				return true;
			});
		}
	},
	removeFromCompare({ commit }, value) {
		commit('removeFromCompare', value);
	},
	resetCompare({ commit }) {
		commit('resetCompare');
	}
};
