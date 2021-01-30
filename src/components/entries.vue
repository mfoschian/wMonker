<template>
	<b-container fluid>
		<card v-for="item in items" :key="item.id" :item="item"
			@longtap="$emit('selected', item.id)"
			:class="{selected: selected_id==item.id}">
		</card>
	</b-container>
</template>

<script>
import card from '@/components/entry-card'

export default {
	components: { card },
	props: {
		items: { type: Array, default: () => [] },
		selected_id: { type: String, default: null }
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