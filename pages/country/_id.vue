<template>
	<div class="page">
		<div class="content">
			<div class="row">
				<div class="column small-full medium-half">
					<h2>{{ getTitle() }}</h2>
					<country-visas :country-id="countryID" :show-title="false" />
				</div>
				<div class="column small-full medium-half">
					<country-map />
					<country-stats :country-id="countryID" />
					<div class="country__stats"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const CountryVisas = () => import('@/components/CountryVisas.vue');
const CountryMap = () => import('@/components/CountryMap.vue');
export default {
	components: {
		CountryMap,
		CountryVisas
	},
	data() {
		return {
			countryID: this.$route.params.id,
			title: this.getTitle(),
			countryData: null,
			orderType: null
		};
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

.highlight-on-map:hover {
	color: color(Green);
	&:target {
		fill: color(Green);
	}
}
</style>
