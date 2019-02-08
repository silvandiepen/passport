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
const LayoutFooter = () => import('@/components/layout/footer.vue');
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
		width: grid(4);
		@include min-('width', 4, 240);
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		pointer-events: all;
		.is-folded & {
			pointer-events: none;
		}
	}
	&--main {
		width: calc(100vw - #{grid(4)});
		position: absolute;
		left: grid(4);
		top: 0;
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
			width: 100vw;
			left: 0;
		}
	}
}
.column {
	transition: width 0.5s;
}
</style>
