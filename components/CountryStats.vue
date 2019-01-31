<template>
	<div class="country-stats">
		<table>
			<tbody>
				<tr>
					<td>Visa free</td>
					<td>{{ currentCountry.score.free }}</td>
				</tr>
				<tr>
					<td>Visa eta</td>
					<td>{{ currentCountry.score.eta }}</td>
				</tr>
				<tr>
					<td>Visa on arrival</td>
					<td>{{ currentCountry.score.arrival }}</td>
				</tr>
				<tr>
					<td>Visa required</td>
					<td>{{ currentCountry.score.required }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	computed: {
		currentCountry: {
			get() {
				return this.$store.getters['getCurrentCountry'];
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
