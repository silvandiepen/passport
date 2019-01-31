<template>
	<div class="layout layout-default">
		<div class="row">
			<div class="column small-full medium-third large-fifth">
				<country-list />
			</div>
			<div class="column small-full medium-two-third large-four-fifth">
				<layout-header />
				<nuxt />
			</div>
		</div>
		<layout-footer />
	</div>
</template>

<script>
const LayoutHeader = () => import('~/components/layout/header.vue');
const LayoutFooter = () => import('@/components/layout/footer.vue');
const CountryList = () => import('@/components/CountryList.vue');

export default {
	components: {
		LayoutHeader,
		LayoutFooter,
		CountryList
	},
	created() {
		this.$store.dispatch('passport/getCountryList');
	}
};
</script>
