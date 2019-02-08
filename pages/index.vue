<template>
	<main class="page page--home">
		<div class="content background--white">
			<h1>Where can you go, with your passport?</h1>
			<h3 class="sub">
				And where will you need a visa?
			</h3>
			<p>Find out which passport is the most powerful, and which passport do do what you want.</p>
		</div>
		<div class="content background--purple">
			<h2>Overal Passport ranking</h2>
			<h4 class="sub">
				Scores
			</h4>
			<p>The scores are based on a way that visa free give 3 points, eta 2 and on arrival 1.</p>

			<div class="input-field input-select">
				<select v-model="order.type">
					<option value="score.total">
						Score
					</option>
					<option value="score.title">
						Country Name
					</option>
					<option value="score.free">
						Visa Free
					</option>
					<option value="score.required">
						Visa Required
					</option>
				</select>
			</div>
			<div class="input-field input-select">
				<select v-model="order.direction">
					<option value="asc">
						Low to high
					</option>
					<option value="desc">
						High to low
					</option>
				</select>
			</div>
		</div>
		<div class="content background--dark">
			<div v-if="order.type === 'score.title'">
				<h3>All countries</h3>
				<h5 class="sub">
					Ordered by name
				</h5>
			</div>
			<div v-else-if="order.type === 'score.total'">
				<h3>Highest scoring countries</h3>
				<h5 v-show="order.direction === 'desc'" class="sub">
					Ordered from best to worst
				</h5>
				<h5 v-show="order.direction === 'asc'" class="sub">
					Ordered from worst to best
				</h5>
			</div>
			<div v-else-if="order.type === 'score.free'">
				<h3 v-show="order.direction === 'desc'">
					Passport with the most visa free countries.
				</h3>
				<h3 v-show="order.direction === 'asc'">
					Passport with the least visa free countries.
				</h3>
			</div>
			<div v-else-if="order.type === 'score.required'">
				<h3 v-show="order.direction === 'desc'">
					Passport with the most visa required countries.
				</h3>
				<h3 v-show="order.direction === 'asc'">
					Passport with the least visa required countries.
				</h3>
			</div>
			<hr >
			<ol>
				<li v-for="(country, index) in orderedStats" :key="index" class="total-list__item">
					<h4 :data-score="country.total">
						<span v-show="order !== ['title', 'desc']" class="total-list__rank">
							<!-- {{ setRank(country.score.total, index) }} -->
						</span>
						<nuxt-link :to="'/country/' + country.id">
							{{ country.title }} <small>({{ country.score.total }})</small>
						</nuxt-link>
						<span class="labels">
							<visa-label
								type="free"
								:show-text="false"
								:width="[country.score.free, orderedStats.length]"
								:count="country.score.free"
							/>
							<visa-label
								type="eta"
								:show-text="false"
								:width="[country.score.eta, orderedStats.length]"
								:count="country.score.eta"
							/>
							<visa-label
								type="arrival"
								:show-text="false"
								:width="[country.score.arrival, orderedStats.length]"
								:count="country.score.arrival"
							/>
							<visa-label
								type="required"
								:show-text="false"
								:width="[country.score.required, orderedStats.length]"
								:count="country.score.required"
							/>
						</span>
					</h4>
				</li>
			</ol>
		</div>
	</main>
</template>

<script>
// import axios from 'axios';
import { orderBy } from 'lodash';
export default {
	data() {
		return {
			countryId: 'NL',
			order: {
				type: 'score.total',
				direction: 'desc'
			},
			rank: {
				number: 1,
				current: -1
			}
		};
	},
	computed: {
		orderedStats() {
			return orderBy(this.$store.state.passport.countryList, this.order.type, this.order.direction);
		},
		countryList: {
			get() {
				return this.$store.state.passport.countryList;
			}
		}
	},
	created() {
		this.$store.dispatch('passport/getCountryList');
	},
	methods: {
		setRank(total, index) {
			if (index == 0) {
				this.rank.number = 0;
			}
			if (parseInt(total) !== this.rank.current) {
				this.rank.number++;
				this.rank.current = parseInt(total);
				// console.log(this.rank.number);
				return this.rank.number;
			} else {
				return '';
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

.total-list {
	&__item {
		position: relative;
		width: 100%;
		& + & {
			margin-top: 40px;
		}
		.label {
			&:before {
				content: none;
			}
		}
	}
	&__rank {
		position: absolute;
		top: 0;
		right: 100%;
		opacity: 0.5;
		padding: 0 1rem;
	}
}

h4 {
	a {
		text-decoration: none;
	}
}
</style>
