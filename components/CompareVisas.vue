<template>
	<div class="country-row">
		<div class="country-row__tools">
			<div class="input-field input-switch input-switch--differences">
				<input id="show-difference" v-model="differences" type="checkbox"/>
				<label for="show-difference">
					<span>differences</span>
				</label>
			</div>
			<div class="input-field input-switch input-switch--merged">
				<input id="show-merged" v-model="showMerged" type="checkbox"  >
				<label for="show-merged">
					<span>merged</span>
				</label>
			</div>
		</div>
		<div ref="list" class="country-row__container country-row__container--titles">
			<ul class="country-cols country-cols--titles">
				<li class="country-cols__column country-cols__column--title">
					<h4></h4>
				</li>
				<li v-for="(country, index) in compareData" :key="index" class="country-cols__column">
					<h4>
						{{ country.title }} <small>({{ country.score.total }})</small>
					</h4>
				</li>
				<li
					v-if="mergedData && showMerged && compareData.length > 1"
					class="country-cols__column country-cols__column--merged"
				>
					<h4>
						{{ mergedData.title.join(' + ') }}
						<small>({{ mergedData.score.total }})</small>
					</h4>
					<div class="labels">
						<visa-label type="free" show-text="false" :count="mergedData.score.free" />
						<visa-label type="eta" show-text="false" :count="mergedData.score.eta" />
						<visa-label type="arrival" show-text="false" :count="mergedData.score.arrival" />
						<visa-label type="required" show-text="false" :count="mergedData.score.required" />
					</div>
				</li>
			</ul>
		</div>
		<div class="country-row__container country-row__container--visas">
			<ul class="country-cols country-cols--countries">
				<li class="country-cols__column country-cols__column--title">
					<ul class="country-cols__list">
						<li v-for="(c, i) in blacklistFilter(countryList)" :key="i" class="country-cols__item">
							<h5 class="sub">
								{{ c.title }}
							</h5>
						</li>
					</ul>
				</li>

				<li v-for="(country, index) in compareData" :key="index" class="country-cols__column">
					<ul class="country-cols__list">
						<li v-for="(c, i) in blacklistFilter(country.data, true)" :key="i" class="country-cols__item">
							<visa-label :type="c" />
						</li>
					</ul>
				</li>

				<!-- Merged Data -->

				<li
					v-if="mergedData && showMerged && compareData.length > 1"
					class="country-cols__column country-cols__column--merged"
				>
					<ul class="country-cols__list">
						<li v-for="(c, i) in blacklistFilter(mergedData.data, true)" :key="i" class="country-cols__item">
							<visa-label :type="c" />
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		countries: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			blacklist: [],
			differences: true,
			showMerged: false,
			mergedData: null
		};
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
		},
		compareData() {
			return this.createCompareData();
		}
	},
	watch: {
		compareCountries: {
			handler() {
				this.mergedData = this.mergeData(this.compareData);
			},
			immediate: true,
			deep: true
		}
	},
	created() {
		this.$store.dispatch('passport/setCountryList');
	},

	mounted() {
		console.log(this.mergedData);
	},
	methods: {
		getSum(total, num) {
			console.log(total, num);
			// return total + num;
			return total;
		},
		blacklistFilter(data, onlyData = false) {
			// console.log(data);
			let _this = this;
			let blacklisted = [];

			if (_this.differences) {
				if (!onlyData) {
					Object.keys(data).forEach((item) => {
						if (!_this.blacklist[data[item].id] && _this.blacklist[data[item].id] !== 0) {
							blacklisted.push(data[item]);
						}
					});
				} else {
					Object.keys(data).forEach((item) => {
						if (!_this.blacklist[item] && _this.blacklist[item] !== 0) {
							blacklisted.push(data[item]);
						}
					});
				}
				return blacklisted;
			} else {
				return data;
			}
		},
		createCompareData() {
			let data = [];

			if (this.$props.countries.length > 0) {
				this.$props.countries.forEach((country) => {
					data.push(this.$store.state.passport.countryList.find((o) => o.id === country));
				});
			} else {
				this.compareCountries.forEach((country) => {
					data.push(this.$store.state.passport.countryList.find((o) => o.id === country));
				});
			}
			this.createBlacklist(data);
			return data;
		},
		createBlacklist(data) {
			const _this = this;
			if (_this.differences) {
				data.forEach((country, i) => {
					if (i == 0) {
						Object.keys(country.data).forEach((item) => {
							_this.blacklist[item] = country.data[item];
						});
					} else {
						Object.keys(country.data).forEach((item) => {
							if (country.data[item] !== _this.blacklist[item]) {
								delete _this.blacklist[item];
							}
						});
					}
					if (i === data.length - 1) {
						return data;
					}
				});
			} else {
				return data;
			}
		},
		mergeData(data) {
			let merged = {
				title: [],
				data: [],
				score: {
					total: 0,
					free: 0,
					required: 0,
					arrival: 0,
					eta: 0
				}
			};

			data.forEach((countryData, index) => {
				merged.title.push(countryData.id);
				if (index === 0) {
					for (let key in countryData.data) {
						merged.data[key] = countryData.data[key];
					}
				} else {
					for (let key in countryData.data) {
						// console.log(key, merged.data);
						if (countryData.data[key] > merged.data[key]) {
							// merged.data.push([key, countryData.data[key]]);
							merged.data[key] = countryData.data[key];
						}
						merged.score.total = merged.score.total + merged.data[key];
						switch (merged.data[key]) {
							case 3:
								merged.score.free++;
								break;
							case 2:
								merged.score.eta++;
								break;
							case 1:
								merged.score.arrival++;
								break;
							case 0:
								merged.score.required++;
								break;
						}
					}
				}
			});
			console.log(merged);
			return merged;
		}
	}
};
</script>

<style lang="scss">
@import '~henris';
@import '~silicons';
.hide-for-small-only {
	@media #{$small-only} {
		display: none;
	}
}
.button--scroll {
	@include silicon-go-up('span');
}
.country-row {
	&__tools {
		--form-border-color: #{color(Dark)};
		--form-accent: #{color(Yellow)};
		position: absolute;
		top: left;
		top: 0;
		padding: 3rem;
		z-index: 1;
		display: flex;
		flex-direction: column;
		@media #{$small-only} {
			padding: 1rem;
		}
	}
	&__container {
		&--titles {
			width: 100%;
			background-image: linear-gradient(to bottom, color(White) 50%, color(Offwhite, 0));
		}
		&--visas {
			background-color: color(Offwhite);
		}
	}
}
.country-cols {
	display: flex;
	align-content: stretch;
	&__column {
		border-right: 1px solid color(Black, 0.1);
		width: grid(2);
		flex-grow: 1;
		h4 {
			padding: 4rem 0.5rem 1rem 0.5rem;
			writing-mode: vertical-rl;
			max-height: 20rem;
			small {
				display: block;
				font-size: 1rem;
				opacity: 0.5;
			}
		}
		&--titles {
			width: 300px;
			flex-grow: 0;
		}
		&--merged {
			position: relative;
			background-color: color(Black);
			color: color(White);
			.country-cols__item {
				&:nth-child(even) {
					background-color: color(White, 0.1);
				}
			}
			// .labels {
			// 	border: 1px solid red;
			// 	position: absolute;
			// 	right: 0;
			// 	top: 0;
			// }
		}
	}
	&--countries {
		.country-cols__item {
			width: 100%;
			display: block;
			padding: 0.5rem;
		}
	}
	&__list {
		// border-right: 1px solid color(Black, 0.1);
		width: 100%;
	}
	&__item {
		display: block;
		width: 100%;
		height: grid(1);
		line-height: grid(0.75);
		&:nth-child(even) {
			background-color: color(White, 1);
		}
		@media #{$small-only} {
			height: grid(2.5);
			line-height: grid(2);
		}
		.label {
			line-height: 1;
		}
		h5 {
			line-height: grid(1);
			@media #{$small-only} {
				font-size: 14px;
				line-height: 1;
			}
		}
	}
}
.country-cols__column--title {
	width: grid(4);
	@media #{$small-only} {
		width: grid(8);
	}
	.country-cols__item {
		padding-left: grid(1);
		@include min-('padding-left', 1, 30);
	}
}
</style>
