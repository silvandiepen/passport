<template>
	<div class="page">
		<div class="content">
			<div class="row">
				<div class="column small-full medium-half">
					<h3>{{ getTitle() }}</h3>
					<div class="country-list">
						<div class="country-list__order">
							<div class="input-field input-select">
								<select v-model="orderType">
									<option value="name">
										by Name
									</option>
									<option value="status">
										by Status
									</option>
								</select>
							</div>
						</div>
						<table>
							<tr v-for="(value, key) in countryData" :key="key">
								<td>
									{{ getTitle(key) }}
								</td>
								<td>
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
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="column small-full medium-half">
					<country-map />

					<div class="country__stats">
						<table>
							<tbody>
								<tr>
									<td>Visa free</td>
									<td>{{ totalVisa(3) }}</td>
								</tr>
								<tr>
									<td>Visa eta</td>
									<td>{{ totalVisa(2) }}</td>
								</tr>
								<tr>
									<td>Visa on arrival</td>
									<td>{{ totalVisa(1) }}</td>
								</tr>
								<tr>
									<td>Visa required</td>
									<td>{{ totalVisa(0) }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const CountryMap = () => import('@/components/CountryMap.vue');
export default {
	components: {
		CountryMap
	},
	data() {
		return {
			title: this.getTitle(),
			countryData: null,
			orderType: null
		};
	},
	created() {
		let _this = this;
		_this.$store.dispatch('getCountry', _this.$route.params.id);

		if (_this.$store.state.countries[_this.$route.params.id]) {
			_this.countryData = this.$store.state.countries[_this.$route.params.id];
		} else {
			setTimeout(() => {
				_this.countryData = _this.$store.state.countries[_this.$route.params.id];
			}, 500);
		}

		// _this.$store.dispatch('getCountry', _this.$route.params.id);
		//   const promise = new Promise((resolve, reject) => {
		//     if (_this.$store.dispatch('getCountry', _this.$route.params.id)) {
		//       resolve();
		//     } else {
		//       reject(Error('it broke'));
		//     }
		//   });
		//  promise.then(result => {
		// 	 _this.countryData = _this.$store.state.countries[_this.$route.params.id];

		//   }, err => {
		//     console.log(err);
		//   });
	},
	methods: {
		getTitle(ID = '') {
			if (ID == '') {
				ID = this.$route.params.id;
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
		},
		totalVisa(visa) {
			// console.log(this.countryData);
			if (this.countryData) {
				return Object.keys(this.countryData).filter((x) => this.countryData[x] === visa).length;
			} else {
				return '-';
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.content {
	padding: grid(1);
}
.country__stats {
	table {
		width: 100%;
		tr {
			td {
				padding: 0.5rem 1rem;
			}
			&:not(:first-child) {
				td {
					border-top: 1px solid color(Black, 0.25);
				}
			}
		}
	}
}

.label {
	color: color(White);
	border-radius: 3px;
	font-size: 12px;
	font-weight: bold;
	display: inline-block;
	padding: 0.25rem 0.5rem;
	&.visa-free {
		background-color: color(Green);
	}
	&.visa-eta {
		background-color: mix(color(Green), color(Yellow), 50%);
	}
	&.visa-on-arrival {
		background-color: color(Yellow);
	}
	&.visa-required {
		background-color: color(Orange);
	}
	&.banned {
		background-color: color(Red);
	}
}
.highlight-on-map:hover {
	color: color(Green);
	&:target {
		fill: color(Green);
	}
}
</style>
