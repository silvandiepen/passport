<template>
	<div class="page compare">
		<div class="content">
			<div class="row">
				<div class="column small-full medium-half">
					<h3>Compare</h3>
				</div>
			</div>
		</div>
		<div v-if="compareCountries" class="background--offwhite">
			<div class="compare__container">
				<div class="compare__list">
					<div class="compare__item">
						<h4>&nbsp;</h4>
						<ul class="compare-country__list">
							<li v-for="(country, index) in countryList" :key="index" class="compare-country__item">
								<span class="country-name">
									{{ country.title }}
								</span>
							</li>
						</ul>
					</div>
					<div v-for="(country, index) in compareCountries" :key="index" class="compare__item">
						<country-visas :country-id="country" :show-title="false" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const CountryVisas = () => import('@/components/CountryVisas.vue');
export default {
	components: {
		CountryVisas
	},
	computed: {
		compareCountries: {
			get() {
				return this.$store.state.compareCountries;
			}
		},
		countryList: {
			get() {
				return this.$store.state.countryList;
			}
		}
	},
	created() {
		console.log(this.$store.state);
	}
};
</script>

<style lang="scss">
@import '~henris';
.compare {
	&__container {
		width: 100%;
		overflow-x: scroll;
		@media #{$small-only} {
			width: 100vw;
		}
	}
	&__list {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	&__item {
		padding: 0rem;
	}
	&-country {
		&__list {
			position: relative;
			max-width: 50vw;
			overflow: hidden;
			&:after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				display: block;
				width: 3rem;
				height: 100%;
				background-image: linear-gradient(to right, color(Offwhite, 0), color(Offwhite, 1));
			}
		}
		&__item {
			display: block;
			height: 3rem;
			padding: 0 0 0 2rem;
			line-height: 3rem;
			white-space: nowrap;
			&:nth-child(odd) {
				background-color: color(White);
			}
			.country-name {
				line-height: 3rem;
				display: block;
			}
		}
	}

	.country-visas__item {
		display: block;
		height: 3rem;
		line-height: 3rem;
		padding: 0 0.5rem;
		&:nth-child(odd) {
			// background-color: red;
			// opacity: 0.5;
		}
	}
}
</style>
