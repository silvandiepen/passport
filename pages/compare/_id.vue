<template>
	<div class="page compare">
		<div v-if="compareCountries.length > 0">
			<compare-visas :countries="countries" />
		</div>
		<div v-else class="background--offwhite">
			<div class="content">
				<h3>There are no countries selected (yet)</h3>
				<p>Please add countries from the country list by clicking on "add to compare"</p>
			</div>
		</div>
	</div>
</template>

<script>
const CompareVisas = () => import('@/components/CompareVisas.vue');
export default {
	components: {
		CompareVisas
	},
	data() {
		return {
			countries: []
		};
	},
	computed: {
		compareCountries: {
			get() {
				return this.$store.state.passport.compareCountries;
			}
		},
		countryList: {
			get() {
				return this.$store.state.passport.countryList;
			}
		}
	},
	created() {
		if (this.$route.params.id.length > -1) {
			console.log(this);
			console.log(this.$route);
			this.countries = this.$route.params.id.split('-');
			console.log(this.countries);
		}
		this.$store.dispatch('passport/getCountryList');
	}
};
</script>
