<template>
	<div class="page">
		<div v-if="mounted" class="content">
			<div class="row">
				<div class="column small-full">
					<div class="intro">
						<h2 v-if="currentCountry">
							{{ currentCountry.title }}
						</h2>
						<div v-if="wikiData" class="expand-data" :class="{ 'expand-data--loaded': wikiData }">
							<input id="expand-data" type="checkbox" class="expand-data__toggle"  >
							<div class="expand-data__content">
								{{ wikiData }}
							</div>
							<label for="expand-data" class="expand-data__button">
								Read more
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
			currentCountry: null,
			wikiData: null
		};
	},
	async mounted() {
		const _this = this;
		await this.$store.dispatch('passport/getCountryList');
		_this.$store.dispatch('passport/setCurrentCountry', _this.$route.params.id).then(() => {
			_this.currentCountry = _this.$store.state.passport.countryList.find((item) => {
				return item.id === _this.$store.state.passport.currentCountry;
			});
		});
		_this.getWikiData();
		_this.mounted = true;
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

.page-enter-active,
.page-leave {
	transform: translate(0, 0);
	opacity: 1;
	transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.page-enter {
	transform: translate(0, #{grid(1)});
	opacity: 0;
	@media #{$small-only} {
		transform: translateX(50%, 0);
	}
}
.page-leave-active {
	transform: translate(0, #{grid(1)});
	opacity: 0;
	@media #{$small-only} {
		transform: translateX(-50%, 0);
	}
}

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
	max-height: 0;
	overflow: hidden;
	opacity: 0;
	transition: max-height 1s ease-in-out, opacity 1.5s ease-in-out;
	&--loaded {
		max-height: 2000px;
		opacity: 1;
	}
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
				span {
					transform: translateY(-50%) rotate(-90deg) !important;
				}
				&::before {
					height: 10px;
				}
			}
		}
	}
	&__button {
		position: relative;
		display: block;
		width: 100%;
		color: color(Dark, 0.25);
		font-weight: bold;
		font-size: 14px;
		text-align: center;
		text-transform: uppercase;
		&:before {
			content: '';
			position: absolute;
			bottom: 100%;
			left: 0;
			display: block;
			width: 100%;
			height: grid(1);
			background-image: linear-gradient(to bottom, color(White, 0), color(White, 1));
			transition: height 0.3s;
			@include min-('height', 1, 60);
		}
		span {
			--stroke: 2px;
			display: inline-block !important;
			transform: translateY(-50%) rotate(90deg) !important;
		}
		@include silicon-arrow-basic-down('span');
	}
}

.intro {
	.wiki-data {
		&--loaded {
			max-height: 200px;
		}
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
