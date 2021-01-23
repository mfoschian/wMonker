<template>
	<b-container fluid>
		<b-row class="header">
			<b-col>Data</b-col>
			<b-col>Importo</b-col>
			<b-col>Categoria</b-col>
			<b-col cols="1"></b-col>
		</b-row>
		<b-row v-for="item in items" :key="item.id"
			@click="$emit('selected', item.id)"
			class="item"
			:class="{selected: selected_id==item.id}">
			<b-col>{{ format_dt(item.dt) }}</b-col>
			<b-col>{{ euro(item.amount) }}</b-col>
			<b-col>{{ item.tag.join(',') }}</b-col>
			<b-col cols="1">
				<button size="sm" @click="$emit('remove', item.id)">X</button>
				<!-- <b-badge @click="$emit('remove', item.id)">X</b-badge> -->
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import {format_dt, euro} from '@/utils/formatters'

export default {
	props: {
		items: { type: Array, default: () => [] },
		selected_id: { type: String, default: null }
	},
	methods: {
		format_dt, euro
	}
}
</script>

<style scoped>
	.selected {
		background-color: salmon;
	}
	.header {
		font-weight: bold;
		border-bottom: 2px solid black;
	}
	.item {
		border-bottom: 1px solid black;
		padding: 0.2em;
	}
</style>