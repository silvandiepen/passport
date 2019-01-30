<template>
	<div class="country-stats">
		<table>
			<tbody>
				<tr>
					<td>Visa free</td>
					<td>{{ visa.free }}</td>
				</tr>
				<tr>
					<td>Visa eta</td>
					<td>{{ visa.eta }}</td>
				</tr>
				<tr>
					<td>Visa on arrival</td>
					<td>{{ visa.arrival }}</td>
				</tr>
				<tr>
					<td>Visa required</td>
					<td>{{ visa.required }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	computed: {
		visa() {
			return {
				free: this.getVisa(3),
				eta: this.getVisa(2),
				arrival: this.getVisa(1),
				required: this.getVisa(0)
			};
		}
	},
	methods: {
		getVisa(visa) {
			if (this.$store.state.currentCountry) {
				return Object.keys(this.$store.state.currentCountry).filter((x) => this.$store.state.currentCountry[x] === visa)
					.length;
			}
		}
	}
};
</script>

<style>
table {
	width: 100%;
}
table tr td:nth-child(2) {
	font-weight: bold;
}
.country-stats {
	padding: 30px;
}
</style>
