<template>
	<main class="page page--home">
		<section class="content background--white">
			<div class="row">
				<div class="column small-full medium-half">
					<h3>Combinations</h3>
					<p>
						Combining passports can be interesting, see which passports you can combine with your passport to get the highest
						score.
					</p>
				</div>
			</div>
		</section>
		<section class="background--white">
			<div class="row">
				<div class="column small-full large-half background--purple">
					<div class="content">
						<h4>Your country</h4>
						<p>Every country you select below will add all posibilities of that country.</p>
						<div class="input-field input-select">
							<select v-model="currentCountry">
								<option :value="[]">
									Select a country
								</option>
								<option v-for="(country, index) in countryList" :key="index" :value="country"
@click="startLoader">
									{{ country.title }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div v-if="inList.length > 0" class="column small-full large-half background--black column-list">
					<div class="content">
						<ul>
							<li v-for="country in inList">
								{{ country.title }}
							</li>
						</ul>
						<br  >
						<br  >
						<button v-if="combinations.length > 0" class="button button--dark" @click="reset">
							reset list
							<span class="icon reset"></span>
						</button>
					</div>
				</div>
			</div>
		</section>
		<section class="content background--dark">
			<span v-if="loading" class="loader"></span>
			<div v-if="combinations.length > 0">
				<table>
					<tr v-for="(country, index) in orderByTotal(combinations)" :key="index">
						<td>{{ index + 1 }}</td>
						<td>
							<nuxt-link :to="`compare/${country.ids[0]}-${country.ids[1]}`">
								<strong>{{ country.id }}</strong>
							</nuxt-link>
						</td>
						<td class="labels">
							<visa-label type="total" :count="country.score.total" />
						</td>
					</tr>
				</table>
			</div>
			<div v-else style="text-align: center;">
				<p>Select a country in the list above.</p>
			</div>
			<!--
			<div v-for="(c, i) in restrictedCountryList" :key="i">
				<ul v-for="(country, index) in orderByTotal(getCombination(c))" :key="index" class="list">
					<li v-if="index <= showCountries" class="item">
						<span>{{ country.score }}</span>
						<strong>{{ country.id }}</strong>
					</li>
				</ul>
			</div> -->
		</section>
	</main>
</template>

<script>
import { orderBy } from 'lodash';
export default {
	data() {
		return {
			inList: [],
			countryList: [],
			loading: false,
			currentCountry: null,
			combinations: [],
			showMax: 1000,
			showCountries: 2
		};
	},

	computed: {
		combination() {
			return this.createCombination();
		}
	},
	watch: {
		currentCountry: {
			handler() {
				this.createCombinations();
				this.addToList();
			},
			deep: true
		}
	},

	async mounted() {
		const _this = this;
		await this.$store.dispatch('passport/getCountryList');
		_this.countryList = _this.$store.state.passport.countryList;

		this.restrictedCountryList();
	},
	methods: {
		addToList() {
			this.inList.push(this.currentCountry);
		},
		startLoader() {
			this.loading = true;
		},
		restrictedCountryList() {
			if (this.countryList.length > 0) {
				return this.countryList[0];
			} else {
				return [];
			}
		},
		orderByTotal(data) {
			return orderBy(data, 'score.total', 'desc');
		},
		getCombination(country) {
			return this.createCombinations(country);
		},
		createCombinations(country = null) {
			const _this = this;
			let c1;

			if (this.currentCountry || country) {
				if (this.currentCountry) {
					c1 = this.currentCountry;
				} else {
					c1 = country;
				}

				_this.countryList.forEach((c2, index) => {
					if (c1.id !== c2.id) {
						_this.combinations.push({
							id: `${c1.title} + ${c2.title}`,
							ids: [c1.id, c2.id],
							score: this.makeScore(c1.data, c2.data)
						});
					}
					if (index == _this.countryList.length - 1) {
						_this.loading = false;
					}
				});
			} else {
				return [];
			}
		},
		reset() {
			this.combinations = [];
			this.inList = [];
		},
		makeScore(c1, c2) {
			let score = {
				total: 0
			};
			let scores = [];

			// First build the first Array;
			Object.keys(c1).forEach((primary, pIndex) => {
				scores[pIndex] = c1[primary];

				// console.log(a, Object.keys(c1).length);
				if (pIndex === Object.keys(c1).length - 1) {
					// Compare the made array with the other array;

					Object.keys(c2).forEach((secondary, sIndex) => {
						if (c2[Object.keys(c2)[sIndex]] > scores[sIndex]) {
							scores[sIndex] = c2[Object.keys(c2)[sIndex]];
						}

						if (sIndex === Object.keys(c2).length - 1) {
							for (let s in scores) {
								if (!isNaN(scores[s])) {
									score.total = score.total + parseInt(scores[s]);
								}
							}
						}
					});
					// End compare
				}
			});
			return score;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~tools';

.column-list {
	height: 100%;
	align-self: flex-end;
}
.list {
	display: block;
	.item {
		display: block;
	}
}
table {
	tr {
		td {
			font-size: 1rem;
		}

		&:nth-child(1) td {
			font-size: 2rem;
			&:first-child {
				font-size: 2rem;
			}
		}
		&:nth-child(2) td {
			font-size: 1.75rem;
		}
		&:nth-child(3) td {
			font-size: 1.5rem;
		}
		&:nth-child(4) td {
			font-size: 1.25rem;
		}
		&:nth-child(5) td {
			font-size: 1rem;
		}
	}
}
.labels {
	float: none;
}
.loader {
	$loader-bullet: 0.2em;
	$loader-corner: 15%;
	$loader-color: Yellow;
	display: inline-block;
	width: 1em;
	height: 1em;
	background-image: radial-gradient(closest-side, color($loader-color) 100%, color($loader-color, 0)),
		radial-gradient(closest-side, color($loader-color, 0.75) 100%, color($loader-color, 0)),
		radial-gradient(closest-side, color($loader-color, 0.625) 100%, color($loader-color, 0)),
		radial-gradient(closest-side, color($loader-color, 0.5) 100%, color($loader-color, 0)),
		radial-gradient(closest-side, color($loader-color, 0.375) 100%, color($loader-color, 0)),
		radial-gradient(closest-side, color($loader-color, 0.25) 100%, color($loader-color, 0)),
		radial-gradient(closest-side, color($loader-color, 0.125) 100%, color($loader-color, 0)),
		radial-gradient(closest-side, color($loader-color, 0) 100%, color($loader-color, 0));
	background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat,
		no-repeat;
	background-position: center top, top $loader-corner right $loader-corner, right center,
		bottom $loader-corner right $loader-corner, center bottom, left $loader-corner bottom $loader-corner, left center,
		left $loader-corner top $loader-corner;
	background-size: $loader-bullet $loader-bullet, $loader-bullet $loader-bullet, $loader-bullet $loader-bullet,
		$loader-bullet $loader-bullet, $loader-bullet $loader-bullet, $loader-bullet $loader-bullet,
		$loader-bullet $loader-bullet, $loader-bullet $loader-bullet;
	font-size: 3rem;
	animation: loader 1s steps(8) infinite;

	@at-root {
		@keyframes loader {
			to {
				transform: rotate(-360deg);
			}
		}
	}
}
</style>
