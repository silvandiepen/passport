<template>
	<div class="country-visas">
		<span class="country-visas__title">
			{{ getTitle() }}
		</span>
		<ul class="country-visas__list">
			<li v-for="(value, key) in countryData" :key="key" class="country-visas__item">
				<span v-if="showTitle" class="country-name">
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
export default {
	props: {
		countryId: {
			type: String,
			default: null
		},
		showTitle: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			countryData: null
		};
	},

	created() {
		console.log(this.$props);
		let _this = this;
		_this.$store.dispatch('getCountry', _this.countryId);
		if (_this.$store.state.countries[_this.countryId]) {
			_this.countryData = this.$store.state.countries[_this.countryId];
		} else {
			setTimeout(() => {
				_this.countryData = _this.$store.state.countries[_this.countryId];
			}, 500);
		}
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
