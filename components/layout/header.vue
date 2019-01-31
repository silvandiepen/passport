<template>
	<header id="header" class="header">
		<nav class="navigation">
			<ul class="navigation__list">
				<li class="navigation__item">
					<nuxt-link class="navigation__link" to="/">
						<span class="navigation__text">
							Ranking
						</span>
					</nuxt-link>
				</li>
				<li class="navigation__item">
					<nuxt-link
						class="navigation__link"
						to="/compare"
						:class="{ 'navigation__link--total': compareCountries.length > 0 }"
					>
						<span class="navigation__text">
							Compare
							<span class="total" :class="{ 'total--active': compareCountries.length > 0 }">
								{{ compareCountries.length }}
							</span>
						</span>
					</nuxt-link>
					<span v-if="compareCountries.length > 0" class="compare-list">
						<ul class="compare-list__list">
							<li v-for="(country, index) in compareCountries" :key="index" class="compare-list__item">
								<a class="compare-list__link" @click="removeCountry(country, $event)">
									{{ getTitle(country) }}
									<span class="icon"></span>
								</a>
							</li>
						</ul>
					</span>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	computed: {
		compareCountries: {
			get() {
				return this.$store.state.passport.compareCountries;
			}
		}
	},
	methods: {
		getTitle(ID = 1) {
			if (isNaN(ID) && ID.length == 2) {
				return this.$store.getters.getCountry(ID).title;
			} else if (!isNaN(ID)) {
				return this.$store.state.passport.countryList[ID].title;
			} else {
				return 'Not Set';
			}
		},
		removeCountry(ID, e) {
			e.preventDefault();
			this.$store.dispatch('passport/removeFromCompare', ID);
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
@import '~silicons';

.header {
	// Header styles
	position: fixed;
	top: 0;
	right: grid(1);
	@media #{$small-only} {
		right: 0;
	}
	z-index: 10;
}
.navigation {
	background-color: color(Black);
	&__list {
		display: flex;
	}
	&__item {
		position: relative;
		display: block;
		&:hover {
			.compare-list {
				clip-path: inset(0 0 0 0);
			}
		}
	}
	&__link {
		display: block;
		padding: 1rem;
		&.nuxt-link-exact-active {
			background-color: color(Purple);
		}
		&--total {
			padding-right: 3rem;
		}
	}
	&__text {
		color: color(White);
	}
	.total {
		display: inline-block;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: scale(0) translateY(-50%);
		font-size: 12px;
		font-weight: bold;
		box-shadow: 0 0 0 2px color(White, 0.5);
		color: color(White);
		border-radius: 1rem;
		padding: 0 0.25rem;
		text-align: center;
		line-height: 1.5rem;
		text-decoration: none;
		height: 1.5rem;
		min-width: 1.5rem;
		&--active {
			transform: scale(1) translateY(-50%);
		}
	}
}
.compare-list {
	position: absolute;
	left: 0;
	width: 100%;
	top: 100%;
	clip-path: inset(0 0 100% 0);
	transition: clip-path 0.3s ease-in-out;
	&__list {
		width: 100%;
	}
	&__item {
		position: relative;
		background-color: darken(Purple, 20%);
		color: color(White);
		display: block;
		font-weight: bold;
		padding: 0.75rem 1rem;
		font-size: 12px;
	}
	&__link {
		@include silicon-math-times('.icon');
		.icon {
			--stroke: 2px;
			color: color(Red);
			position: absolute;
			top: 50%;
			right: 0.5rem;
			transform: translateY(-50%) rotate(45deg);
		}
	}
}
</style>
