<template>
	<div class="country-stats">
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
</template>

<script>
export default {
	props: {
		countryId: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			countryData: null
		};
	},
	created() {
		console.log(this.$props);
		let _this = this;
		_this.$store.dispatch('getCountry', _this.countryId);
		if (_this.$store.state.countries[_this.countryId]) {
			_this.countryData = this.$store.state.countries[_this.countryId];
		} else {
			setTimeout(() => {
				_this.countryData = _this.$store.state.countries[_this.countryId];
			}, 500);
		}
	},
	methods: {
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

<style></style>
