<template>
	<div class="container">
		<nuxt-link :to="'/compare/' + routeId">
			Home page
		</nuxt-link>
	</div>
</template>

<script>
export default {
	props: ['error'],
	data() {
		return {
			routeId: null
		};
	},
	created() {
		if (this.$route.id) {
			this.routeId = this.$route.id;
			if (this.$route.id.split('-').length > 0) {
				// this.$route.push('compare', { id: this.$route.id });

				this.$router.push({ name: 'compare', query: { id: this.$route.id } });
			}
		}
		console.log(this.$route);
		this.$store.dispatch('passport/setCountryList');
		console.log('created-route', this.$route);
		console.log('created-props', this.$props);
	},
	mounted() {
		console.log('mounted-route', this.$route);
		console.log('mounted-props', this.$props);
	}
};
</script>
