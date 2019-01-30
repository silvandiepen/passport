<template>
	<div class="countries">
		<div class="input-field input-search">
			<input v-model="searchTerm" type="search" placeholder="Search.."/>
		</div>
		<div class="countries__container">
			<ul v-if="countries" class="countries__list">
				<li v-for="(country, index) in countries" :key="index" class="countries__item">
					<nuxt-link :to="'/country/' + country.id + '#country-' + country.id" class="countries__link">
						<span class="countries__text">
							<small>{{ country.id }}</small> {{ country.title }}
						</span>
					</nuxt-link>
					<span class="to-compare" :class="{ 'is-in-compare': checkCompare(country.id) }" @click="compareThis(country.id)">
						<span v-if="checkCompare(country.id)">
							check
						</span>
						<span v-else>
							Add to compare
						</span>
					</span>
				</li>
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
				return this.filterCountries(this.$store.state.countryList);
			}
		}
	},
	created() {
		this.$store.dispatch('getCountries');
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
			this.$store.commit('toggleCompare', id);
		},
		checkCompare(id) {
			if (this.$store.state.compareCountries.includes(id)) {
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
.countries {
	background-color: color(Black);
	color: color(White);
	height: 100vh;
	@media #{$small-only} {
		max-height: 100vw;
	}

	&__container {
		height: calc(100% - 3rem);
		overflow: scroll;
	}
	&__list {
		width: 100%;
		padding: 2rem 1rem;
	}
	&__item {
		position: relative;
		display: block;
	}
	&__link {
		display: inline-block;
		padding: 0.5rem 1rem 0.5rem 2rem;
		text-decoration: none;
		position: relative;
		&:hover {
			background-color: blue;
		}
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
		right: 0;
		top: 0;
		float: right;
		display: block;
		font-size: 10px;
		&.is-in-compare {
			background-color: color(Green);
		}
	}
}
</style>
