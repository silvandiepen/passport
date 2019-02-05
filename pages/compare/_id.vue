<template>
	<div class="page compare">
		Forwarding you to compare.
	</div>
</template>

<script>
export default {
	async mounted() {
		const _this = this;
		await this.$store.dispatch('passport/getCountryList');
		const data = [...this.$store.state.passport.countryList];
		if (this.$route.params.id.length > -1) {
			let countries = this.$route.params.id.split('-');
			let compareCountries = [];
			countries.forEach((country) => {
				if (data.find((c) => c.id === country.toUpperCase())) {
					compareCountries.push(country.toUpperCase());
				}
			});
			this.$store.dispatch('passport/setCompareCountries', compareCountries).then(() => {
				_this.$router.push({ name: 'compare' });
			});
		}
	}
};
</script>
