<template>
	<div class="countries">
		<!-- <div class="input-field input-search">
			<input v-model="searchTerm" type="search" placeholder="Search.."/>
		</div> -->
		<div class="countries__container">
			<ul v-if="countries" class="countries__list">
				<li v-for="(country, index) in countries" :key="index" class="countries__item">
					<nuxt-link :to="'/country/' + country.id" class="countries__link">
						<span class="countries__text">
							<small>{{ country.id }}</small> {{ country.title }}
						</span>
					</nuxt-link>
					<span
						class="to-compare"
						:class="[checkCompare(country.id) ? 'is-in-compare' : 'not-in-compare']"
						@click="compareThis(country.id)"
					>
						<span v-if="checkCompare(country.id)"></span>
						<span v-else></span>
					</span>
				</li>
				<!-- <li class="countries__item countries__item--reset">
					<a class="countries__link" @click="resetCompare">
						<span class="countries__text">
							Reset Compare
						</span>
					</a>
				</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchTerm: ''
		};
	},
	computed: {
		countries: {
			get() {
				return this.filterCountries(this.$store.state.passport.countryList);
			}
		}
	},
	created() {
		this.$store.dispatch('passport/getCountryList');
	},
	methods: {
		filterCountries(list) {
			let _this = this;
			if (_this.searchTerm.length > 1) {
				return Object.keys(list)
					.filter((item) => list[item].title.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > 0)
					.reduce((obj, key) => {
						obj[key] = list[key];
						return obj;
					}, {});
			} else {
				return list;
			}
		},
		compareThis(id) {
			this.$store.commit('passport/toggleCompare', id);
		},
		resetCompare() {
			this.$store.dispatch('passport/resetCompare');
		},
		checkCompare(id) {
			if (this.$store.state.passport.compareCountries.includes(id)) {
				return true;
			} else {
				return false;
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
@import '~silicons';
.countries {
	position: relative;
	background-color: color(Black);
	color: color(White);
	height: 100vh;
	@media #{$small-only} {
		height: auto;
		max-height: 100vw;
		// overflow: scroll;
	}
	&:before {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background-image: linear-gradient(
			to bottom,
			color(Black, 1),
			color(Black, 0) 3rem,
			color(Black, 0) calc(100% - 3rem),
			color(Black, 1)
		);
		pointer-events: none;
		z-index: 3;
	}

	&__container {
		position: relative;
		height: calc(100% - 3rem);
		overflow: scroll;

		@media #{$small-only} {
			height: auto;
			max-height: 100vw;
			overflow: scroll;
		}
	}
	&__list {
		width: 100%;
		padding: 3rem 0;
		// overflow: scroll;
	}
	&__item {
		position: relative;
		display: block;
		&:hover {
			background-color: color(Blue, 0.25);
		}
		&--reset {
			background-color: color(Orange);
		}
	}
	&__link {
		display: inline-block;
		padding: 0.75rem 1rem 0.75rem 2rem;
		text-decoration: none;
		position: relative;
	}
	&__text {
		display: block;
		position: relative;
		small {
			position: absolute;
			right: calc(100% + 0.5rem);
			opacity: 0.25;
			font-weight: bold;
		}
	}
	.input-field {
		height: 3rem;
		background-color: color(Dark);
	}
	.to-compare {
		position: absolute;
		right: 1rem;
		top: 50%;
		display: block;
		font-size: 10px;
		color: color(White);
		transform: translateY(-50%);
		span {
			--stroke: 0.2em;
		}
		&.is-in-compare {
			color: color(Green);
			&:hover {
				color: color(Red);
			}
		}
	}
	@include silicon-math-minus('.to-compare.not-in-compare span');
	@include silicon-check('.to-compare.is-in-compare span');
	@include silicon-math-times('.to-compare.is-in-compare:hover span');
}
</style>
