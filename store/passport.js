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
			if (state.compareCountries.length < 9) {
				state.compareCountries.push(value);
			} else {
				alert("8 is enough, don't you think?");
			}
		}
	},
	removeFromCompare(state, value) {
		state.compareCountries.splice(state.compareCountries.indexOf(value), 1);
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
		// console.log('total length of countryList', Object.keys(state.countryList).length);
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
	removeFromCompare({ commit }, value) {
		commit('removeFromCompare', value);
	},
	resetCompare({ commit }) {
		commit('resetCompare');
	}
};
