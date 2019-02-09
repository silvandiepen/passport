<template>
	<div class="compare-visas" :data-total="compareData.length">
		<span v-if="compareData" v-show="compareData.length > 4" class="compare-visas__shadow"></span>
		<div class="compare-visas__container">
			<div class="country-row">
				<div v-if="compareData.length > 1" class="country-row__tools">
					<div class="input-field input-switch input-switch--differences">
						<input id="show-difference" v-model="differences" type="checkbox"/>
						<label for="show-difference">
							<span>differences</span>
						</label>
					</div>
					<div class="input-field input-switch input-switch--merged">
						<input id="show-merged" v-model="showMerged" type="checkbox" >
						<label for="show-merged">
							<span>merged</span>
						</label>
					</div>
				</div>
				<div ref="list" class="country-row__container country-row__container--titles">
					<ul class="country-cols country-cols--titles">
						<li class="country-cols__column country-cols__column--title">
							<h4></h4>
						</li>	<li
							v-if="mergedData && showMerged && compareData.length > 1"
							class="country-cols__column country-cols__column--merged"
						>
							<h4>
								{{ mergedData.title.join(' + ') }}
							</h4>
							<div class="labels">
								<visa-label type="total" :show-text="false" :count="mergedData.score.total" />
								<visa-label type="free" :show-text="false" :count="mergedData.score.free" />
								<visa-label type="eta" :show-text="false" :count="mergedData.score.eta" />
								<visa-label type="arrival" :show-text="false" :count="mergedData.score.arrival" />
								<visa-label type="required" :show-text="false" :count="mergedData.score.required" />
							</div>
						</li>
						<li v-for="(country, index) in compareData" :key="index" class="country-cols__column">
							<h4>
								<span class="icon remove" @click="removeCountry(country.id)">
									remove
								</span>
								{{ country.title }}
							</h4>
							<div class="labels">
								<visa-label type="total" :show-text="false" :count="country.score.total" />
								<visa-label type="free" :show-text="false" :count="country.score.free" />
								<visa-label type="eta" :show-text="false" :count="country.score.eta" />
								<visa-label type="arrival" :show-text="false" :count="country.score.arrival" />
								<visa-label type="required" :show-text="false" :count="country.score.required" />
							</div>
						</li>
					
					</ul>
				</div>

				<div class="country-row__container country-row__container--visas">
					<ul class="country-cols country-cols--countries">
						<li class="country-cols__column country-cols__column--title">
							<ul class="country-cols__list">
								<li v-for="(c, i) in blacklistFilter(countryList, false, 'titles')" :key="i" class="country-cols__item">
									<h5 class="sub">
										{{ c.title }}
									</h5>
								</li>
							</ul>
						</li>
						
						<li
							v-if="mergedData && showMerged && compareData.length > 1"
							class="country-cols__column country-cols__column--merged"
						>
							<ul class="country-cols__list">
								<li v-for="(c, i) in blacklistFilter(mergedData.data, true, 'merged')" :key="i" class="country-cols__item">
									<visa-label :type-number="c" />
								</li>
							</ul>
						</li>
						<li v-for="(country, index) in compareData" :key="index" class="country-cols__column">
							<ul class="country-cols__list">
								<li v-for="(c, i) in blacklistFilter(country.data, true, 'list')" :key="i" class="country-cols__item">
									<visa-label :type-number="c" />
								</li>
							</ul>
						</li>

						<!-- Merged Data -->

					</ul>
				</div>
			</div>
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
		},
		showMerged: {
			handler() {
				if (this.showMerged) {
					this.differences = true;
				}
			}
		},
		differences: {
			handler() {
				if (!this.differences) {
					this.showMerged = false;
				}
			}
		},
		mergedData: {
			handler() {
				if (this.mergedData.data.length < 2) {
					this.differences = false;
					this.showMerged = false;
				}
			},
			deep: true
		}
	},
	created() {
		this.$store.dispatch('passport/setCountryList');
	},

	mounted() {
		// console.log(this.mergedData);
	},
	methods: {
		removeCountry(ID) {
			this.$store.dispatch('passport/removeFromCompare', ID);
		},
		blacklistFilter(data, onlyData = false, extra = null) {
			console.log(extra);
			// console.log(extra, data);
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
				console.log(extra, data);
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
						if (index == data.length - 1) {
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
				}
			});
			return merged;
		}
	}
};
</script>

<style lang="scss">
@import '~henris';
@import '~silicons';

@include silicon-math-minus('.icon.remove');
.icon.remove {
	color: red;
	font-size: 1rem;
	text-indent: -999em;
	position: absolute;
	left: 50%;
	top: 0;
	transition: transform 0.3s ease-in-out;
	transform: translate(-50%, -100%) rotate(-45deg) scale(0.5);
	&:hover {
		transform: translate(-50%, -100%) rotate(-45deg) scale(1);
	}
}

.hide-for-small-only {
	@media #{$small-only} {
		display: none;
	}
}
.button--scroll {
	@include silicon-go-up('span');
}

.compare-visas {
	position: relative;
	width: 100%;
	&__shadow {
		display: none;
		width: grid(4);
		height: 100vh;
		position: absolute;
		right: 0;
		top: 0;
		background-image: linear-gradient(to right, color(Black, 0), color(Black, 1));
		z-index: 5;
		pointer-events: none;
	}
	@media #{$small-only} {
		&__shadow {
			display: block;
		}
	}
	&__container {
		width: 100%;
		height: 100%;
		overflow: scroll;
	}
}
.country-row {
	display: grid;
	height: 100vh;
	&__tools {
		--form-border-color: #{color(Dark)};
		--form-body: #{color(Offwhite)};
		--form-accent: #{color(Green)};
		position: absolute;
		top: left;
		top: 0;
		padding: 4rem 0 0 grid(1);
		z-index: 3;
		display: flex;
		flex-direction: column;
		@media #{$small-only} {
			padding: 30px;
			top: 4rem;
		}
		.input-field.input-switch {
			@media #{$small-only} {
				label {
					padding-left: 3rem;
					span {
						font-size: 12px;
					}
				}
			}
		}
	}
	&__container {
		&--titles {
			position: relative;
			z-index: 2;
			// min-height: grid(6);
			width: 100%;
			background-color: color(White);
			// background-image: linear-gradient(to bottom, color(White) 50%, color(Offwhite, 0));

			.country-cols__column {
				padding-top: 4rem;
			}
		}
		&--visas {
			overflow: scroll;
			color: color(White);
			background-color: color(Black);
			.country-cols__column {
				&--merged {
					background-color: darken(Blue, 10%);
				}
			}
		}
	}
}
.country-cols {
	display: flex;
	flex-wrap: nowrap;
	align-content: stretch;
	@media #{$small-only} {
		align-content: flex-start;
	}
	&__column {
		position: relative;
		flex-grow: 1;
		width: grid(2);
		border-right: 1px solid color(Black, 0.1);

		@media #{$small-only} {
			width: grid(4);
			[data-total='2'] & {
				width: grid(8);
			}
			[data-total='3'] & {
				width: grid(6);
			}
		}
		h4 {
			position: relative;
			height: 20rem;
			writing-mode: vertical-rl;
			padding: 0rem 0.5rem 1rem 0.5rem;
			margin-left: 2rem;
			white-space: nowrap;
		}
		.labels {
			position: absolute;
			top: 4rem;
			left: 0.5rem;
			transform: rotate(90deg) translateY(-100%);
			transform-origin: 0 0;
		}
		&--title {
			.country-cols__list,
			.country-cols__item {
				@media #{$small-only} {
					text-align: left;
					width: 100% !important;
				}
			}
		}
		&--titles {
			flex-grow: 0;
			width: 300px;
		}
		&--merged {
			background-color: color(Blue);
			color: color(White);
			.country-cols__item {
				&:nth-child(even) {
					background-color: color(White, 0.1);
				}
			}
		}
	}
	&--countries {
		.country-cols__item {
			display: block;
			width: 100%;
			padding: 0.5rem;
			@media #{$small-only} {
				width: grid(4);
				[data-total='2'] & {
					width: grid(8);
				}
				[data-total='3'] & {
					width: grid(6);
				}
			}
		}
	}
	&__list {
		// border-right: 1px solid color(Black, 0.1);
		width: 100%;

		@media #{$small-only} {
			width: grid(4);
			[data-total='2'] & {
				width: grid(6);
			}
			[data-total='3'] & {
				width: grid(5);
			}
		}
	}
	&__item {
		display: block;
		width: 100%;
		height: grid(1);
		line-height: grid(0.75);
		&:nth-child(even) {
			background-color: color(White, 0.05);
		}
		@media #{$small-only} {
			height: grid(2.5);
			width: grid(3);
			line-height: grid(2);
			text-align: center;
		}
		.label {
			line-height: 1;
		}
		h5 {
			line-height: 1;
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
