<template>
	<div v-if="mounted" class="country-map">
		<svg enable_background="new 0 0 2000 1001" version="1.1" viewBox="0 0 2000 1001">
			<path
				v-for="(country, index) in world"
				:id="country.id"
				:key="index"
				:d="country.path"
				:class="getCountryStatus(country.id)"
			></path>
		</svg>
	</div>
</template>

<script>
import worldData from '~/assets/world.json';
export default {
	data() {
		return {
			mounted: false,
			world: worldData.countries
		};
	},
	computed: {
		currentCountry: {
			get() {
				return this.$store.state.passport.countryList.find((item) => {
					return item.id === this.$store.state.passport.currentCountry;
				});
			}
		}
	},
	mounted() {
		this.mounted = true;
	},
	/* eslint-disable */
	methods: {
		getCountryStatus(ID) {
			if (this.currentCountry) {
				let code = this.currentCountry.data[ID];
				if(code === undefined){
					code = 4;
				} else if(code ==  -1){
					code = 'current';
				}
				return 'status-' + code;
			} else {
				return 'fucked';
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.country-map {
	width: 100%;
	// background-color: color(White);
	// border-radius: 50%;
	// position: absolute; top: 0; left: 50%;
	// width: 50%;
	// max-width: 320px;
	// min-width: 240px;
	// transform: translate(-50%,-50%);
	// box-shadow: 0 0 0 20px white;
	svg {
		width: 100%;
	}
	path {
		fill: color(Blue, 0.25);
		&:target {
			animation: popIn 0.5s forwards;
		}
		&.status-3{ fill: color(Green); }
		&.status-2{ fill: mix(color(Green), color(Yellow), 50%); }
		&.status-1{ fill: color(Yellow); }
		&.status-0{ fill: color(Orange); }
		&.status-current{ fill: color(White); }
	}
	@keyframes popIn {
		0% {
			fill: color(Green);
		}
		25% {
			fill: color(Black);
		}
		50% {
			fill: color(Green);
		}
		75% {
			fill: color(Black);
		}
		100% {
			fill: color(Green);
		}
	}
}
</style>
