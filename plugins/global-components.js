import Vue from 'vue';
import VisaLabel from '~/components/VisaLabel.vue';

const components = { VisaLabel };

Object.entries(components).forEach(([name, component]) => {
	Vue.component(name, component);
});
