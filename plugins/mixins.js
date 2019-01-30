import Vue from 'vue';

import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		count: 1
	}
});

Vue.mixin({
	methods: {
		capitalizeFirstLetter: (str) => str.charAt(0).toUpperCase() + str.slice(1)
	},
	getTitle(ID) {
		let countryName = '';
		let countryList = this.$store.state.countryList;
		Object.keys(countryList).forEach(function(country) {
			if (countryList[country].id === ID) {
				// console.log(countryList[country].title);
				countryName = countryList[country].title;
			}
		});
		return countryName;
	}
});

export default store;
