// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
	window.onNuxtReady(() => {
		new VuexPersistence({
			key: 'passport'
		}).plugin(store);
	});
};
