<template>
	<div class="page">
		<div v-if="mounted" class="content">
			<div class="row">
				<div class="column small-full">
					<h2>{{ currentCountry.title }}</h2>
				</div>
			</div>
			<div class="row reverse-mobile">
				<div class="column small-full medium-half">
					<country-visas :country-id="countryId" :show-title="false" />
				</div>
				<div class="column small-full medium-half">
					<country-map />
					<country-stats :current-country="currentCountry" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CountryVisas from '@/components/CountryVisas.vue';
import CountryMap from '@/components/CountryMap.vue';
import CountryStats from '@/components/CountryStats.vue';
export default {
	components: {
		CountryVisas,
		CountryMap,
		CountryStats
	},
	data() {
		return {
			countryId: this.$route.params.id.toLowerCase(),
			mounted: false
		};
	},
	computed: {
		currentCountry: {
			get() {
				return this.$store.state.passport.countryList.find((item) => {
					return item.id === this.$store.state.passport.currentCountry;
				});
			}
		}
	},
	created() {
		this.$store.dispatch('passport/getCountryList');
		this.$store.dispatch('passport/setCurrentCountry', this.$route.params.id.toLowerCase()).then(() => {});
	},
	mounted() {
		this.mounted = true;
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
