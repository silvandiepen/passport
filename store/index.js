import api from './api';

export const state = () => ({
	countryList: {},
	countries: {},
	compareCountries: [],
	stats: {}
});

export const mutations = {
	setCountries(state, value) {
		state.countryList = value;
	},
	setStats(state, value) {
		state.stats = value;
	},
	setCountry(state, value) {
		state.countries = Object.assign({}, state.countries, value);
	},
	toggleCompare(state, value) {
		if (state.compareCountries.includes(value)) {
			state.compareCountries.splice(state.compareCountries.indexOf(value), 1);
		} else {
			state.compareCountries.push(value);
		}
	}
};

export const actions = {
	setCountry(store, value) {
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
	setStats({ commit }) {
		api.getCountryStats().then(({ data }) => {
			commit('setStats', data);
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
	},
	getStats: (store) => {
		if (Object.keys(store.state.stats).length < 1) {
			store.dispatch('setStats');
		}
	}
};

export const getters = {
	countryName: (store) => (index) => Object.keys(store.state.countryList)[index]
};
