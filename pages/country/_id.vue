<template>
	<div class="page">
		<div class="content">
			<div class="row">
				<div class="column small-full medium-half">
					<country-visas :country="countryID" />
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
const CountryVisas = () => import('@/components/CountryVisas.vue');
const CountryMap = () => import('@/components/CountryMap.vue');
export default {
	components: {
		CountryMap,
		CountryVisas
	},
	data() {
		return {
			countryID: this.$route.params.id,
			title: this.getTitle(),
			countryData: null,
			orderType: null
		};
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

.highlight-on-map:hover {
	color: color(Green);
	&:target {
		fill: color(Green);
	}
}
</style>
