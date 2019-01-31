// api.js
import axios from 'axios';

// create an axios instance with default options
const http = axios.create({ baseURL: 'https://raw.githubusercontent.com/silvandiepen/passport-data/master/' });

export default {
	async getCountryList() {
		// then return the promise of the axios instance
		return http.get(`/all.json`).catch(() => {
			// catch errors here if you want
			// console.log(e);
		});
	}
};
