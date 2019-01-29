import api from './api';

export const state = () => ({
	countryList: {},
	countries: {}
});

export const mutations = {
	setCountries(state, value) {
		state.countryList = value;
	},
	setCountry(state, value) {
		state.countries = Object.assign({}, state.countries, value);
	}
};

export const actions = {
	setCountry(store, value) {
		console.log(value);
		api.getCountry(value).then(({ data }) => {
			let countryData = {};
			countryData[value] = data;
			store.commit('setCountry', countryData);
		});
	},
	setCountries({ commit }) {
		api.getCountryList().then(({ data }) => {
			commit('setCountries', data);
		});
	},
	getCountry: (store, value) => {
		if (!store.state.countries[value]) {
			store.dispatch('setCountry', value);
		}
	},
	getCountries: (store) => {
		if (Object.keys(store.state.countryList).length < 1) {
			store.dispatch('setCountries');
		}
	}
};

export const getters = {
	countryName: (state) => (index) => Object.keys(state.countryList)[index]
};
