<template>
	<header id="header" class="header">
		<nav class="navigation">
			<ul class="navigation__list">
				<li class="navigation__item">
					<nuxt-link class="navigation__link" to="/" @click="setFoldList">
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
						@click="setFoldList"
					>
						<span class="navigation__text" :data-count="compareCountries.length">
							Compare
						</span>
					</nuxt-link>
					<div v-if="hasCompareCountries" class="compare-list">
						<ul class="compare-list__list">
							<li v-for="(country, index) in compareCountries" :key="index" class="compare-list__item">
								<a class="compare-list__link" @click="removeCountry(country, $event)">
									<span class="compare-list__text">
										{{ getTitle(country) }}
									</span>
									<span class="icon"></span>
								</a>
							</li>
						</ul>
					</div>
				</li>
				<li class="navigation__item navigation__item--listtrigger">
					<button class="navigation__link" :class="[folded ? 'is-not-folded' : 'is-folded']" @click="foldList">
						<span class="navigation__text icon--list"></span>
					</button>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		folded: {
			get() {
				return this.$store.state.foldedList;
			}
		},
		compareCountries: {
			get() {
				return this.$store.state.passport.compareCountries;
			}
		}
	},
	mounted() {
		const _this = this;
		_this.setFoldList();
		window.addEventListener('resize', function() {
			_this.setFoldList();
		});
	},
	methods: {
		setFoldList() {
			if (window.innerWidth < 750) {
				if (!this.$store.state.foldList) {
					this.$store.dispatch('setFoldList', true);
				}
			} else {
				if (this.$store.state.foldList) {
					this.$store.dispatch('setFoldList', false);
				}
			}
		},
		foldList() {
			this.$store.dispatch('toggleList');
		},
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
		},
		hasCompareCountries() {
			if (this.compareCountries.length > 0) {
				return true;
			} else {
				return false;
			}
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
		@media (hover: hover) {
			&:hover {
				.compare-list {
					clip-path: inset(0 0 0 0);
				}
			}
		}
		&--listtrigger {
			width: 3rem;
			height: 3rem;
			.is-not-folded {
				span {
					@include menu();
				}
			}
			.is-folded {
				span {
					@include menu();
					@include menu-close();
				}
			}
		}
	}
	&__link {
		display: block;
		border: none;
		background-color: transparent;
		text-decoration: none;
		padding: 1rem;

		button:focus {
			box-shadow: none !important;
			outline: none !important;
		}
		&.nuxt-link-exact-active {
			background-color: color(Purple);
		}
		&--total {
			padding-right: 3rem;
		}
	}
	&__text {
		color: color(White);

		&[data-count]::before {
			content: attr(data-count);
			position: absolute;
			top: 50%;
			right: 1rem;
			display: inline-block;
			min-width: 1rem;
			height: 1.5rem;
			box-shadow: 0 0 0 2px color(White, 0.5);
			border-radius: 1rem;
			color: color(White);
			font-weight: bold;
			// transform: scale(0) translateY(-50%);
			font-size: 12px;
			line-height: 1.5rem;
			text-align: center;
			text-decoration: none;
			transform: scale(1) translateY(-50%);
			padding: 0 0.25rem;
		}
		&[data-count='0']::before {
			transform: scale(0) translateY(-50%);
		}
	}
}
.compare-list {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	clip-path: inset(0 0 100% 0);
	transition: clip-path 0.3s ease-in-out;
	&__list {
		width: 100%;
	}
	&__item {
		position: relative;
		display: block;
		background-color: darken(Purple, 20%);
		color: color(White);
		font-weight: bold;
		font-size: 12px;
		padding: 0.75rem 1rem;
	}
	&__link {
		@include silicon-math-times('.icon');
		.icon {
			--stroke: 2px;
			position: absolute;
			top: 50%;
			right: 0.5rem;
			color: color(Red);
			transform: translateY(-50%) rotate(45deg);
		}
	}
}
</style>
