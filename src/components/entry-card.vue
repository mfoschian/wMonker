<template>
	<b-card :title="amount" v-longtappable>
		<b-card-body >
			<p align="center">{{ format_dt(item.dt)}}</p>
			<p align="center">{{ tags(item.tag)}}</p>

		</b-card-body>
	</b-card>
</template>


<script>
import {format_dt, euro} from '@/utils/formatters'


export default {
	props: {
		item: { type: Object, default: ()=>{} },
	},
	methods: {
		format_dt, euro,
		tags(t) {
			if( Array.isArray(t) )
				return t.join(',');
			return t;
		},
		long_click() {
			this.$emit('click');
		}
	},
	computed: {
		amount() {
			return euro(this.item.amount);
		}
	}
}
</script>

<style scoped>
	.label-col{
		text-align: right;
	}
	.value-col{
		text-align: left;
	}
</style>