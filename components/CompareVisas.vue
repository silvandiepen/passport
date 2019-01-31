<template>
	<div class="country-row">
		<div class="country-row__container country-row__container--titles">
			<ul class="country-cols country-cols--titles">
				<li class="country-cols__column country-cols__column--title">
					<h4></h4>
				</li>
				<li v-for="(country, index) in compareData" :key="index" class="country-cols__column">
					<h4>{{ country.title }}</h4>
				</li>
			</ul>
		</div>
		<div class="country-row__container country-row__container--visas">
			<ul class="country-cols country-cols--countries">
				<li class="country-cols__column country-cols__column--title">
					<ul class="country-cols__list">
						<li v-for="(c, i) in countryList" :key="i" class="country-cols__item">
							<h5 class="sub">
								{{ c.title }}
							</h5>
						</li>
					</ul>
				</li>

				<li v-for="(country, index) in compareData" :key="index" class="country-cols__column">
					<ul class="country-cols__list">
						<li v-for="(c, i) in country.data" :key="i" class="country-cols__item">
							<span class="label" :class="[`visa-${c}`]"></span>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
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
	methods: {
		createCompareData() {
			let data = [];

			this.compareCountries.forEach((country) => {
				data.push(this.$store.state.passport.countryList.find((o) => o.id === country));
			});
			console.log(data);

			return data;
		}
	}
};
</script>

<style lang="scss">
@import '~henris';
.country-row {
	// border: 1px solid red;
	&__container {
		padding: grid(0 1);
		&--titles {
			padding: grid(1);
			@media #{$small-only} {
				padding: 2rem;
			}
			position: absolute;
			width: 100%;
			background-image: linear-gradient(to bottom, color(White) 50%, color(Offwhite, 0));
		}
		&--visas {
			padding: grid(5 1 1 1);
			@media #{$small-only} {
				padding: grid(10) 2rem 2rem 2rem;
			}
			background-color: color(Offwhite);
			height: 100vh;
			overflow: scroll;
		}
	}
}
.country-cols {
	display: flex;
	align-content: stretch;
	&__column {
		// border: 1px solid red;
		width: grid(2);
		flex-grow: 1;
		h4 {
			padding: 1rem 0.5rem;
			writing-mode: vertical-rl;
		}
		&--titles {
			width: 300px;
			flex-grow: 0;
		}
	}
	&--countries {
		.country-cols__item {
			width: 100%;
			display: block;
			padding: 0.5rem;
		}
	}
	&__item {
		display: block;
		width: 100%;
		height: grid(1);
		@media #{$small-only} {
			height: grid(2.5);
		}
		.label {
			// border: 1px solid red;
		}
	}
}
.country-cols__column--title {
	width: grid(4);
	@media #{$small-only} {
		width: grid(8);
	}
}
</style>
