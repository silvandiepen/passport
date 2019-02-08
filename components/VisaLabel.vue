<template>
	<span class="visa-label" :class="['visa-' + visaType]" :style="elementWidth">
		<span v-if="(visaType == 3 || visaType == 'free') && showText == true" class="visa-label__text">
			Free
		</span>
		<span v-if="(visaType == 2 || visaType == 'eta') && showText == true" class="visa-label__text">
			ETA
		</span>
		<span v-if="(visaType == 1 || visaType == 'arrival') && showText == true" class="visa-label__text">
			on Arrival
		</span>
		<span v-if="(visaType == 0 || visaType == 'required') && showText == true" class="visa-label__text">
			Required
		</span>
		{{ count }}
	</span>
</template>

<script>
export default {
	props: {
		count: {
			type: Number,
			default: null
		},
		showText: {
			type: Boolean,
			default: true
		},
		type: {
			type: String,
			default: null
		},
		typeNumber: {
			type: Number,
			default: null
		},
		width: {
			type: Array,
			default: null
		}
	},
	data() {
		return {
			elementWidth: null,
			visaType: null
		};
	},
	created() {
		if (this.$props.width) {
			this.elementWidth = {
				width: Math.round((this.$props.width[0] / this.$props.width[1]) * 100) + '%'
			};
		}
		if (this.$props.type) {
			this.visaType = this.$props.type;
		} else {
			this.visaType = this.$props.typeNumber;
		}
	}
};
</script>

<style lang="scss">
@import '~henris';
.visa-label {
	display: inline-block;
	border-width: 1px;
	border-style: solid;
	border-radius: 3px;
	color: color(White);
	font-weight: bold;
	font-size: 12px;
	line-height: 1;
	padding: 0.25rem 0.5rem;
	@media #{$small-only} {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		.labels & {
			height: auto;
			width: auto;
			padding: 0.1rem;
			font-size: 10px;
		}
	}
	&__text {
		line-height: 1;
		&::before {
			content: 'Visa ';
			@media #{$medium-only} {
				content: none;
			}
		}
		@media #{$small-only} {
			display: none;
		}
	}
	&.visa-3,
	&.visa-free {
		border-color: color(Green, 1);
		background-color: color(Green, 0.75);
	}
	&.visa-2,
	&.visa-eta {
		border-color: mix(color(Green), color(Yellow), 50%);
		background-color: mix(color(Green, 0.75), color(Yellow, 0.75), 50%);
	}
	&.visa-1,
	&.visa-arrival,
	&.visa-on-arrival {
		border-color: color(Yellow, 1);
		background-color: color(Yellow, 0.75);
	}
	&.visa-0,
	&.visa-required {
		border-color: color(Orange, 1);
		background-color: color(Orange, 0.75);
	}
	&.visa-total {
		border-color: color(Black, 1);
		background-color: color(Black, 0.75);
		color: color(White);
	}
	&.visa--1 {
		border-color: color(White, .25);
		background-color: color(White, 0.1);
		color: color(White);
	}
}
</style>
