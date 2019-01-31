<template>
	<div class="country-visas">
		<div class="input-field">
			<select v-model="order">
				<option value="title">
					Country name
				</option>
				<option value="visa">
					Visa status
				</option>
			</select>
		</div>
		<ul class="country-visas__list">
			<li v-for="(value, key) in orderedCountriesData" :key="key" class="country-visas__item">
				<span class="country-name">
					{{ getTitle(key) }}
				</span>
				<span class="country-visas__labels">
					<span v-if="value === 3" class="label visa-free">
						Visa free
					</span>
					<span v-if="value === 2" class="label visa-eta">
						ETA required
					</span>
					<span v-if="value === 1" class="label visa-on-arrival">
						Visa on arrival
					</span>
					<span v-if="value === 0" class="label visa-required">
						Visa required
					</span>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { orderBy } from 'lodash';
export default {
	props: {
		countryId: {
			type: String,
			default: null
		},
		showTitle: {
			type: Boolean,
			default: false
		},
		showCountry: {
			type: Boolean,
			default: true
		},
		showOrder: {
			type: Boolean,
			default: false
		},
		isSingle: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			order: 'title',
			countryData: null
		};
	},

	computed: {
		currentCountry() {
			if (this.$props.countryId) {
				return this.$store.state.passport.countryList.find((o) => o.id === this.$props.countryId).data;
			} else {
				return this.$store.getters.getCurrentCountry.data;
			}
		},
		orderedCountriesData() {
			return this.orderCountries();
		}
	},
	methods: {
		orderCountries() {
			return orderBy(this.currentCountry, this.order);
		},
		getTitle(ID = 1) {
			if (isNaN(ID) && ID.length == 2) {
				return this.$store.getters.getCountry(ID).title;
			} else if (!isNaN(ID)) {
				return this.$store.state.passport.countryList[ID].title;
			} else {
				return 'Not Set';
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

.country-visas {
	position: relative;
	width: 100%;
	&__list {
		width: 100%;
	}
	&__item {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	&__labels {
		&:only-child {
			width: 100%;
			.label {
				line-height: 1rem;
				display: inline-block;
				white-space: nowrap;
				width: 100%;
				text-align: center;
			}
		}
	}
}
</style>
