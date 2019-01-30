<template>
	<div class="page">
		<div class="content">
			<div class="row">
				<div class="column small-full">
					<h2>{{ getTitle() }}</h2>
				</div>
			</div>
			<div class="row reverse-mobile">
				<div class="column small-full medium-half">
					<country-visas :country-id="countryID" :show-title="false" />
				</div>
				<div class="column small-full medium-half">
					<country-map />
					<country-stats />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const CountryVisas = () => import('@/components/CountryVisas.vue');
const CountryMap = () => import('@/components/CountryMap.vue');
const CountryStats = () => import('@/components/CountryStats.vue');
export default {
	components: {
		CountryMap,
		CountryVisas,
		CountryStats
	},
	data() {
		return {
			countryID: this.$route.params.id,
			title: this.getTitle(),
			countryData: null
		};
	},
	created() {
		this.$store.dispatch('getCountry', this.$route.params.id);
		this.$store.dispatch('setCurrentCountry', this.$route.params.id);
	},
	methods: {
		getTitle(ID = '') {
			if (ID == '') {
				ID = this.$route.params.id;
			}
			let countryName = '';
			let countryList = this.$store.state.countryList;
			Object.keys(countryList).forEach(function(country) {
				if (countryList[country].id === ID) {
					// console.log(countryList[country].title);
					countryName = countryList[country].title;
				}
			});
			return countryName;
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

.country__stats {
	table {
		width: 100%;
		tr {
			td {
				padding: 0.5rem 1rem;
			}
			&:not(:first-child) {
				td {
					border-top: 1px solid color(Black, 0.25);
				}
			}
		}
	}
}
.reverse-mobile {
	@media #{$small-only} {
		flex-direction: column-reverse;
	}
}

.highlight-on-map:hover {
	color: color(Green);
	&:target {
		fill: color(Green);
	}
}
</style>
