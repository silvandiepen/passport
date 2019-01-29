<template>
	<div class="page">
		<div class="content">
			<div class="row">
				<div class="column small-full medium-half">
					<h3>{{ title }}</h3>
					<div class="country-list">
						<table>
							<tr v-for="(value, key) in countryData" :key="key">
								<td>
									<a class="highlight-on-map" :href="`#country-${key}`">
										{{ getTitle(key) }}
									</a>
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
									<!-- <span v-if="value === 0" class="label visa-banned">
							banned
						</span> -->
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="column small-full medium-half"></div>
			</div>
						<div class="map">
					<country-map />
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
			countryData: null
		};
	},
	watch: {
		countryData: {
			handler() {
				console.log('hoiiii');
			},
			deep: true
		}
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
					console.log(countryList[country].title);
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
.content {
	padding: grid(1);
}
.page {
	max-height: 100vh;
	overflow: scroll;
	width: 100%;
	position: relative;
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
.map {
	position: fixed;
	right: 0;
	top: 0;
	width: 50%;
	z-index: 0;
	pointer-events: none;
}
</style>
