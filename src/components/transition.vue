<template>
	<!-- <div v-longtappable @longtap="edited=!edited"> -->
	<div >
		<transition name="flip" mode="out-in">
		
	<b-card v-if="!edited" @click="edited=!edited"  style="background-color: red"
		:title="amount" >
		<b-card-body >
			<p align="center">{{ format_dt(item.dt)}}</p>
			<p align="center">{{ tags(item.tag)}}</p>

		</b-card-body>
	</b-card>
	<b-card v-else @click="edited=!edited"
		:title="amount" >
		<b-card-body >
			Qualcosa
		</b-card-body>
	</b-card>
		</transition>
	</div>
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
	},
	data() {
		return { edited: false }
	}
}
</script>

<style scoped>
	.flip-enter-active, .flip-leave-active {
		transition: 0.3s cubic-bezier(.39,.45,.22,.92);
	}


	.flip-leave, .flip-enter-to {
		/* transform: translateX(0) scaleY(1); */
		transform: rotateY(0);
	}

	.flip-leave-to {
		/* transform: translateX(100%)  scale(0); */
		transform: rotateY(90deg);
	}

	.flip-enter {
		/* transform: translateX(100%)  scale(0); */
		transform: rotateY(-90deg);
	}

</style>