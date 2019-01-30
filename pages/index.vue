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
			<ol>
				<li v-for="(stat, index) in sortProperty(stats)" :key="index">
					<h4>
						<nuxt-link :to="'/country/' + stat.id">
							{{ getTitle(stat.id) }}
						</nuxt-link>
						<span class="labels">
							<span class="label visa-free" :data-width="`${Math.round((stat.free / stats.length) * 100)}`">
								{{ stat.free }}
							</span>
							<span class="label visa-eta" :data-width="`${Math.round((stat.eta / stats.length) * 100)}`">
								{{ stat.eta }}
							</span>
							<span class="label visa-on-arrival" :data-width="`${Math.round((stat.arrival / stats.length) * 100)}`">
								{{ stat.arrival }}
							</span>
							<span class="label visa-required" :data-width="`${Math.round((stat.required / stats.length) * 100)}`">
								{{ stat.required }}
							</span>
						</span>
					</h4>
				</li>
			</ol>
			<h3>Scores</h3>
			<p>The scores are based on a way that visa free give 3 points, eta 2 and on arrival 1.</p>
		</div>
	</main>
</template>

<script>
// import axios from 'axios';
export default {
	computed: {
		stats() {
			return this.$store.state.stats;
		}
	},
	created() {
		this.$store.dispatch('setStats');
	},
	methods: {
		sortProperty(obj) {
			console.log(obj);
			return obj;
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
