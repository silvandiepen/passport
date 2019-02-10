<template>
	<div class="country-visas">
		<div class="input-field">
			<select v-model="order">
				<option value="title">
					Country name
				</option>
				<option value="value">
					Visa status
				</option>
			</select>
		</div>
		<ul class="country-visas__list">
			<li
				v-for="(country, key) in orderedCountriesData"
				v-show="country.id !== countryId"
				:key="key"
				class="country-visas__item"
			>
				<span class="country-name" v-html="country.title"></span>
				<span class="country-visas__label">
					<visa-label :type-number="country.value" />
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
			if (this.$store.state.passport.countryList) {
				if (this.$props.countryId) {
					return this.$store.state.passport.countryList.find((item) => {
						return item.id === this.$props.countryId;
					});
				} else {
					return this.$store.state.passport.countryList.find((item) => {
						return item.id === this.$store.state.passport.currentCountry;
					});
				}
			} else {
				return '';
			}
		},
		orderedCountriesData() {
			let ordered = [];
			Object.keys(this.currentCountry.data).forEach((item) => {
				ordered.push({
					title: this.getTitle(item),
					id: item,
					value: this.currentCountry.data[item]
				});
			});
			// console.log(typeof this.orderCountries().data, this.orderCountries().data);
			// return this.orderCountries().data;
			return orderBy(ordered, this.order);
		}
	},
	created() {
		this.$store.dispatch('passport/setCountryList');
		// console.log(this.$store.state.passport.countryList);
	},
	methods: {
		orderCountries() {
			return this.currentCountry;
			// return this.currentCountry.data.sort;
			// console.log(orderBy(this.currentCountry, this.order));
			// return orderBy(this.currentCountry, this.order);
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
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0.25rem 0;
	}
	&__label {
		.label {
			display: inline-block;
			width: 100%;
			border-radius: 1rem;
			line-height: 1rem;
			white-space: nowrap;
			text-align: center;
			span {
				@media #{$medium-up} {
					display: none;
				}
			}
		}
	}
}
</style>
