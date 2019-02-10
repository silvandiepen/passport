<template>
	<div class="countries" :class="{ 'is-folded': folded }">
		<!-- <div class="input-field input-search">
			<input v-model="searchTerm" type="search" placeholder="Search.." >
		</div> -->
		<div class="countries__container">
			<ul v-if="countries" class="countries__list">
				<li v-for="(country, index) in countries" :key="index" class="countries__item">
					<nuxt-link :to="'/country/' + country.id" class="countries__link">
						<span class="countries__text">
							<small>{{ country.id }}</small> {{ country.short_title }}
						</span>
					</nuxt-link>
					<button
						class="to-compare"
						:class="[checkCompare(country.id) ? 'is-in-compare' : 'not-in-compare']"
						@click="compareThis(country.id)"
					>
						<span> </span>
					</button>
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
			searchTerm: '',
			countries: []
		};
	},
	// computed: {
	// 	countries: {
	// 		get() {
	// 			return this.filterCountries(this.$store.state.passport.countryList);
	// 		}
	// 	}
	// },
	computed: {
		folded: {
			get() {
				return this.$store.state.foldedList;
			}
		}
	},
	watch: {
		$route() {
			// console.log('trigger setFoldList');
			if (window.innerWidth < 750) {
				this.$store.dispatch('setFoldList', true);
			}
		}
	},
	async created() {
		await this.$store.dispatch('passport/getCountryList');
		this.countries = this.$store.state.passport.countryList;
	},
	methods: {
		filterCountries(list) {
			let _this = this;
			if (_this.searchTerm.length > 1) {
				return Object.keys(list)
					.filter((item) => list[item].title.indexOf(_this.searchTerm) > 0)
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
	height: 100vh;
	background-color: color(Black);
	color: color(White);
	clip-path: inset(0 0 0% 0);
	transition: clip-path 0.5s ease-in-out;
	&.is-folded {
		clip-path: inset(0 100% 0 0);
	}
	@media #{$small-only} {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100vw;
		clip-path: inset(0 0 0% 0);
		transition: clip-path 0.5s ease-in-out;
		&.is-folded {
			clip-path: inset(0 100% 0 0);
		}
	}
	&:before {
		content: '';
		position: absolute;
		top: 0;
		z-index: 3;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(
			to bottom,
			color(Black, 1),
			color(Black, 0) 3rem,
			color(Black, 0) calc(100% - 3rem),
			color(Black, 1)
		);
		pointer-events: none;
	}

	&__container {
		position: relative;
		// height: calc(100% - 3rem);
		height: 100%;
		overflow: scroll;

		@media #{$small-only} {
			height: 100vh;
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
		@media (hover: hover) {
			&:hover {
				background-color: color(Blue, 0.25);
			}
		}
		&:active {
			background-color: color(Blue, 0.25);
		}
		&--reset {
			background-color: color(Orange);
		}
		&:nth-child(odd) {
			// background-color: color(White, 0.05);
			background-image: linear-gradient(to left, color(Black), color(White, 0.025));
		}
	}
	&__link {
		position: relative;
		display: inline-block;
		text-decoration: none;
		padding: 0.75rem 1rem 0.75rem 2rem;
	}
	&__text {
		position: relative;
		display: block;
		small {
			position: absolute;
			right: calc(100% + 0.5rem);
			font-weight: bold;
			opacity: 0.25;
		}
	}
	.input-field {
		height: 3rem;
		background-color: color(Dark);
	}
	.to-compare {
		position: absolute;
		top: 50%;
		right: 0;
		display: block;
		width: 3rem;
		height: 100%;
		border: none;
		background-color: color(White, 0.05);
		color: color(White);
		font-size: 10px;
		transform: translateY(-50%);
		span {
			--stroke: 0.2em;
		}
		&.is-in-compare {
			background-color: color(Blue, 0.25);
			color: color(Green);
			@media (hover: hover) {
				&:hover {
					color: color(Red);
				}
			}
		}
	}
	@include silicon-math-minus('.to-compare.not-in-compare span');
	@include silicon-check('.to-compare.is-in-compare span');
	@media (hover: hover) {
		@include silicon-math-times('.to-compare.is-in-compare:hover span');
	}
}
</style>
