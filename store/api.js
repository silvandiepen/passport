// api.js
import axios from 'axios';

// create an axios instance with default options
const gitPassport = axios.create({ baseURL: 'https://raw.githubusercontent.com/silvandiepen/passport-data/master/' });
const gitFooter = axios.create({
	baseURL: 'https://gist.githubusercontent.com/silvandiepen/d7f712a2eeee1b68154611b2550e93bd/raw/'
});

export default {
	async getCountryList() {
		// then return the promise of the axios instance
		return gitPassport.get(`/all.json`).catch(() => {
			// catch errors here if you want
			// console.log(e);
		});
	},
	async getFooterPackages() {
		// then return the promise of the axios instance
		return gitFooter.get('/packages').catch(() => {
			// catch errors here if you want
			// console.log(e);
		});
	},
	async getFooterProjects() {
		// then return the promise of the axios instance
		return gitFooter.get('/projects').catch(() => {
			// catch errors here if you want
			// console.log(e);
		});
	}
};
