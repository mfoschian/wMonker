<template>
	<b-container>
		<b-row>
			<b-col class="label-col">Data:</b-col>
			<b-col class="value-col">{{ format_dt(item.dt) }}</b-col>
		</b-row>
		<b-row>
			<b-col class="label-col">Importo:</b-col>
			<b-col class="value-col">{{ euro(item.amount) }}</b-col>
		</b-row>
		<b-row>
			<b-col class="label-col">Categoria:</b-col>
			<b-col class="value-col">{{ tags(item.tag) }}</b-col>
		</b-row>
	</b-container>
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