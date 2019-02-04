<template>
	<div class="container">
		<!-- <h1 v-if="error.statusCode === 404">
			Page not found
		</h1>
		<h1 v-else>
			An error occurred
		</h1> -->
		<nuxt-link to="/">
			Home page
		</nuxt-link>
	</div>
</template>

<script>
export default {
	props: ['error'],
	created() {
		console.log('created-route', this.$route);
		console.log('created-props', this.$props);
	},
	mounted() {
		console.log('mounted-route', this.$route);
		console.log('mounted-props', this.$props);
	}
};
</script>
