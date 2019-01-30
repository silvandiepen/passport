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
				return this.$store.state.compareCountries;
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

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
		display: block;
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
</style>
