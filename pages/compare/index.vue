<template>
	<div class="page compare">
		<div class="content">
			<div class="row">
				<div class="column small-full medium-half">
					<h3>Compare</h3>
				</div>
			</div>
		</div>
		<div v-if="compareCountries.length > 0" class="background--offwhite">
			<div class="compare__container">
				<div class="compare__list">
					<div class="compare__item">
						<ul class="compare-country__list">
							<li v-for="(country, index) in countryList" :key="index" class="compare-country__item">
								<span class="country-name">
									{{ country.title }}
								</span>
							</li>
						</ul>
					</div>
					<div v-for="(country, index) in compareCountries" :key="index" class="compare__item">
						<country-visas :country-id="country" :show-country="false" :show-title="true" />
					</div>
				</div>
			</div>
		</div>
		<div v-else class="background--offwhite">
			<div class="content">
				<h3>There are no countries selected (yet)</h3>
				<p>Please add countries from the country list by clicking on "add to compare"</p>
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
				return this.$store.state.passport.compareCountries;
			}
		},
		countryList: {
			get() {
				return this.$store.state.passport.countryList;
			}
		}
	},
	created() {
		console.log(this.$store.state.passport);
	}
};
</script>

<style lang="scss">
@import '~henris';
.compare {
	&__container {
		width: 100%;
		// overflow-x: scroll;
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
	.country-visas {
		&__item {
			display: block;
			height: 3rem;
			line-height: 3rem;
			padding: 0 0.5rem;
			@media #{$small-only} {
				width: 3rem;
				.label {
					font-size: 0;
					display: block;
					width: 1.5rem !important;
					height: 1.5rem;
					border-radius: 50%;
					// padding: 0;
				}
			}
		}
		&__title {
			position: absolute;
			left: 0;
			top: 0;
			padding: 0.5rem 1rem;
			transform: translateY(-100%);
			font-weight: bold;
			@media #{$small-only} {
				transform: rotate(90deg);
				transform-origin: 100% 0;
				white-space: nowrap;
				left: auto;
				right: 0;
				margin: 0;
				line-height: 2rem;
			}
		}
	}
}
</style>
