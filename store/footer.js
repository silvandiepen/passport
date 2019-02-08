import api from './api';

export const state = () => ({
	packages: null,
	projects: null
});

export const mutations = {
	setProjects(state, value) {
		state.projects = value;
		return true;
	},
	setPackages(state, value) {
		state.packages = value;
		return true;
	}
};
export const actions = {
	getData({ state, commit }) {
		// Populate the CountryList if its not done already.
		if (Object.keys(state.projects).length < 1) {
			api.getFooterProjects().then(({ data }) => {
				commit('setProjects', data);
			});
		}
		if (Object.keys(state.packages).length < 1) {
			api.getFooterPackages().then(({ data }) => {
				
		console.log(data);
				commit('setPackages', data);
			});
		} else {
			return true;
		}
	}
};
