<template>
	<div class="layout layout-default" :class="{ 'is-folded': folded }">
		<country-list class="panel--left" />
		<layout-header />
		<main class="page panel--main">
			<nuxt />
		</main>
		<layout-footer />
	</div>
</template>

<script>
const LayoutHeader = () => import('~/components/layout/header.vue');
const LayoutFooter = () => import('@/components/layout/temp-footer.vue');
const CountryList = () => import('@/components/CountryList.vue');

export default {
	components: {
		LayoutHeader,
		LayoutFooter,
		CountryList
	},
	computed: {
		folded: {
			get() {
				return this.$store.state.foldedList;
			}
		}
	},
	created() {
		this.$store.dispatch('passport/getCountryList');
	}
};
</script>

<style lang="scss">
@import '~henris';
.medium-0 {
	@media #{$medium-up} {
		width: 0px !important;
		overflow: hidden;
	}
}
.panel {
	&--left {
		position: fixed;
		top: 0;
		left: 0;
		width: grid(4);
		height: 100%;
		pointer-events: all;
		@include min-('width', 4, 240);
		.is-folded & {
			pointer-events: none;
		}
		@media #{$small-only}{
			width: 100vw;
		}
	}
	&--main {
		position: absolute;
		top: 0;
		left: grid(4);
		width: calc(100vw - #{grid(4)});
		min-height: 100%;
		transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
		.is-folded & {
			left: 0;
			width: 100vw;
		}
		@include min-('left', 4, 240) {
			left: 240px;
			width: calc(100vw - 240px);
		}
		@media #{$small-only} {
			position: relative;
			left: 0;
			width: 100vw;
		}
	}
}
.column {
	transition: width 0.5s;
}
</style>
