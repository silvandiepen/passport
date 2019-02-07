<template>
	<main class="page page--home">
		<div class="content">
			<div>
				<div class="input-field input-select">
					<select v-model="currentCountry">
						<option v-for="(country, index) in countryList" :key="index" :value="country">
							{{ country.title }}
						</option>
					</select>
				</div>
			</div>
			<div v-if="combinations">
				<ul v-for="(country, index) in orderByTotal(combinations)" :key="index" class="list">
					<li v-if="index <= showMax - 1" class="item">
						<nuxt-link :to="{ name: 'compare', params: { id: `${country.ids[0]}-${country.ids[1]}` } }">
							<span>{{ country.score }}</span>
							<strong>{{ country.id }}</strong>
						</nuxt-link>
					</li>
				</ul>
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
		</div>
	</main>
</template>

<script>
import { orderBy } from 'lodash';
export default {
	data() {
		return {
			countryList: [],
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
		restrictedCountryList() {
			if (this.countryList.length > 0) {
				return this.countryList[0];
			} else {
				return [];
			}
		},
		orderByTotal(data) {
			return orderBy(data, 'score', 'desc');
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

				_this.countryList.forEach((c2) => {
					if (c1.id !== c2.id) {
						_this.combinations.push({
							id: `${c1.title}+${c2.title}`,
							ids: [c1.id, c2.id],
							score: this.makeScore(c1.data, c2.data)
						});
					}
				});
			} else {
				return [];
			}
		},
		makeScore(c1, c2) {
			let score = 0;
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
									score = score + parseInt(scores[s]);
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

<style lang="scss">
.list {
	display: block;
	.item {
		display: block;
	}
}
</style>
