<template>
	<main class="page page--home">
		<div class="content">
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
				<h5 v-if="order.direction === 'desc'" class="sub">
					Ordered from best to worst
				</h5>
				<h5 v-else class="sub">
					Ordered from worst to best
				</h5>
			</div>
			<div v-else-if="order.type === 'score.free'">
				<h3 v-if="order.direction === 'desc'">
					Passport with the most visa free countries.
				</h3>
				<h3 v-if="order.direction === 'asc'">
					Passport with the least visa free countries.
				</h3>
			</div>
			<div v-else-if="order.type === 'score.required'">
				<h3 v-if="order.direction === 'desc'">
					Passport with the most visa required countries.
				</h3>
				<h3 v-if="order.direction === 'asc'">
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
							{{ country.title }}
						</nuxt-link>
						<span class="labels">
							<span class="label visa-free" :data-width="`${Math.round((country.score.free / orderedStats.length) * 100)}`">
								{{ country.score.free }}
							</span>
							<span class="label visa-eta" :data-width="`${Math.round((country.score.eta / orderedStats.length) * 100)}`">
								{{ country.score.eta }}
							</span>
							<span
								class="label visa-on-arrival"
								:data-width="`${Math.round((country.score.arrival / orderedStats.length) * 100)}`"
							>
								{{ country.score.arrival }}
							</span>
							<span
								class="label visa-required"
								:data-width="`${Math.round((country.score.required / orderedStats.length) * 100)}`"
							>
								{{ country.score.required }}
							</span>
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
		right: 100%;
		top: 0;
		padding: 0 1rem;
		opacity: 0.5;
	}
}
.labels {
	width: 40vw;
	@media #{$small-only} {
		width: 100%;
	}
	font-size: 0;
	display: flex;
	float: right;
	.label {
		display: block;
		@for $i from 1 through 100 {
			&[data-width='#{$i}'] {
				width: #{percentage($i)};
			}
		}
		border-radius: 0;
		text-shadow: 1px 1px 0 color(Black, 0.25);
		&:first-child {
			border-radius: 1rem 0 0 1rem;
		}
		&:last-child {
			border-radius: 0 1rem 1rem 0;
			&:first-child {
				border-radius: 1rem;
			}
		}
		& + .label {
			margin: 0;
		}
	}
}
h4 {
	a {
		text-decoration: none;
	}
}
</style>
