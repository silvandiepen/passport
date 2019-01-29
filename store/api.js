// api.js
import axios from 'axios';

// create an axios instance with default options
const http = axios.create({ baseURL: 'https://raw.githubusercontent.com/silvandiepen/passport-data/master/' });

export default {
	async getCountry(ID) {
		console.log(ID);
		// then return the promise of the axios instance
		return http.get(`/country/${ID}.json`).catch((e) => {
			// catch errors here if you want
			console.log(e);
		});
	},
	async getCountryList() {
		// then return the promise of the axios instance
		return http.get(`/countries.json`).catch((e) => {
			// catch errors here if you want
			console.log(e);
		});
	}
};
