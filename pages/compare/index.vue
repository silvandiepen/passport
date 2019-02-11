<template>
	<div class="page page--compare">
		<section v-if="compareCountries.length > 0">
			<compare-visas />
		</section>
		<section v-else class="content background--offwhite">
			<div class="row">
				<div class="column small-full">
					<h3>There are no countries selected (yet)</h3>
					<p>Please add countries from the country list by clicking on "add to compare"</p>
				</div>
			</div>
		</section>
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
