<template>
	<div class="page compare">
		<div v-if="compareCountries.length > 0">
			<compare-visas />
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
		this.$store.dispatch('passport/getCountryList');
		// this.$router.push({ name: 'compare', params: { id: cr } })
	}
};
</script>
