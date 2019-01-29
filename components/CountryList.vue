<template>
	<div class="countries">
		<div class="input-field input-search">
			<input v-model="searchTerm" type="search" placeholder="Search.."  >
		</div>
		<ul v-if="countries" class="countries__list">
			<li v-for="(country, index) in countries" :key="index" class="countries__item">
				<nuxt-link :to="'/country/' + country.id + '#country-' + country.id" class="countries__link">
					<span class="countries__text">
						<small>{{ country.id }}</small> {{ country.title }}
					</span>
				</nuxt-link>
			</li>
		</ul>
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
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.countries {
	background-color: color(Black);
	color: color(White);
	max-height: 100vh;
	overflow: scroll;
	@media #{$small-only} {
		max-height: 100vw;
	}
	&__list {
		padding: 2rem 1rem;
	}
	&__item {
		display: block;
	}
	&__link {
		display: block;
		padding: 0.25rem 1rem 0.25rem 2rem;
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
}
</style>
