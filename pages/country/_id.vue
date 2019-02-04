<template>
	<div class="page">
		<div v-if="mounted" class="content">
			<div class="row">
				<div class="column small-full">
					<div class="intro">
						<h2>{{ currentCountry.title }}</h2>
						<div class="expand-data">
							<input id="expand-data" type="checkbox" class="expand-data__toggle"  >
							<div class="expand-data__content">
								{{ wikiData }}
							</div>
							<label for="expand-data" class="expand-data__button">
								Show more
								<span></span>
							</label>
						</div>
					</div>
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
import axios from 'axios';
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
			countryId: this.$route.params.id,
			mounted: false,
			wikiData: ''
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
		this.$store.dispatch('passport/setCurrentCountry', this.$route.params.id).then(() => {});
		this.getWikiData();
	},
	mounted() {
		this.mounted = true;
		console.log(this.wikiData);
	},
	methods: {
		getWikiData() {
			const _this = this;
			const pageTitle = this.$store.getters.getCountry(this.countryId).title;
			axios
				.get(
					'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=' +
						pageTitle,
					{
						params: {
							origin: '*'
						}
					}
				)
				.then(function(response) {
					let responseData = response.data.query.pages;
					Object.keys(responseData).forEach((page) => {
						if (responseData[page].title == pageTitle) {
							_this.wikiData = responseData[page].extract;
						}
					});
				});
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
@import '~silicons';
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
.expand-data {
	margin-top: 1rem;
	&__content {
		max-height: 200px;
		overflow: hidden;
		transition: max-height 0.5s ease-in-out;
	}
	&__toggle {
		position: absolute;
		opacity: 0;
		pointer-events: none;
		&:checked {
			& + .expand-data__content {
				max-height: 5000px;
				overflow: scroll;
			}
			& ~ .expand-data__button {
				@include silicon-arrow-basic-up('span');
			}
		}
	}
	&__button {
		display: block;
		width: 100%;
		text-align: center;
		position: relative;
		&:before {
			content: '';
			width: 100%;
			height: grid(1);
			@include min-('height', 1, 60);
			display: block;
			position: absolute;
			bottom: 100%;
			left: 0;
			background-image: linear-gradient(to bottom, color(White, 0), color(White, 1));
		}
		span {
			display: inline-block !important;
			--stroke: 2px;
			font-size: 14px;
		}
		@include silicon-arrow-basic-down('span');
	}
}

.intro {
	.wiki-data {
		max-height: 200px;
	}
	h2 + .wiki-data {
		margin-top: 2rem;
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
