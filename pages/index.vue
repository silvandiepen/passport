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

			<ol>
				<li v-for="(stat, index) in orderedStats" :key="index">
					<h4>
						<nuxt-link :to="'/country/' + stat.id">
							{{ getTitle(stat.id) }}
						</nuxt-link>
						<span class="labels">
							<span class="label visa-free" :data-width="`${Math.round((stat.free / orderedStats.length) * 100)}`">
								{{ stat.free }}
							</span>
							<span class="label visa-eta" :data-width="`${Math.round((stat.eta / orderedStats.length) * 100)}`">
								{{ stat.eta }}
							</span>
							<span class="label visa-on-arrival" :data-width="`${Math.round((stat.arrival / orderedStats.length) * 100)}`">
								{{ stat.arrival }}
							</span>
							<span class="label visa-required" :data-width="`${Math.round((stat.required / orderedStats.length) * 100)}`">
								{{ stat.required }}
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
	computed: {
		orderedStats() {
			return orderBy(this.$store.state.stats, 'total', 'desc');
		}
	},
	created() {
		this.$store.dispatch('setStats');
	},
	methods: {
		getTitle(ID = '') {
			if (ID == '') {
				ID = this.countryId;
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

ol li {
	& + li {
		margin-top: 40px;
	}
	li {
		&:before {
			border: 1px solid red;
		}
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
