<template>
	<b-container fluid>
		<card v-for="item in visibile_items" :key="item.id" :item="item"
			@edit="$emit('edit', item.id)"
			@remove="$emit('remove', item.id)"
		>
			<!-- :class="{selected: selected_id==item.id}"> -->
		</card>
	</b-container>
</template>

<script>
import card from '@/components/entry-card'

export default {
	components: { card },
	props: {
		limit: { type: Number, default: 3 },
		items: { type: Array, default: () => [] },
		selected_id: { type: String, default: null }
	},
	computed: {
		visibile_items() {
			return this.items.slice(0, this.limit);
		}
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