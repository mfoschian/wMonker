<template>
	<div class="canv">
		<b-card :title="amount" v-tap:long="long_click" >
			<b-card-body >
				<p align="center">{{ format_dt(item.dt)}}</p>
				<p align="center">{{ tags(item.tag)}}</p>

			</b-card-body>
		</b-card>
		<transition name="fade">
			<div class="ovl" v-if="tapped" @click="fire_esc">
				<b-row align-v="center" align-h="around">
					<b-col >
						<b-button size="lg" variant="info" @click="fire_edit">Edit</b-button>	
					</b-col>
					<b-col >
						<b-button size="lg" variant="danger" @click="fire_delete">Delete</b-button>
					</b-col>
				</b-row>
			</div>
		</transition>
	</div>
</template>


<script>
import {format_dt, euro} from '@/utils/formatters'


export default {
	props: {
		item: { type: Object, default: ()=>{} },
	},
	data() {
		return {
			tapped: false
		}
	},
	methods: {
		format_dt, euro,
		tags(t) {
			if( Array.isArray(t) )
				return t.join(',');
			return t;
		},
		fire_edit() {
			this.tapped = false;
			this.$emit('edit', this.item.id );
		},
		fire_esc() {
			this.tapped = false;
		},
		fire_delete() {
			this.tapped = false;
			this.$emit('remove', this.item.id );
		},
		long_click() {
			this.tapped = true;
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
div.canv {
	position: relative;
}
div.ovl {
	position: absolute;
	top: 0;
	left: 0;
	background-color: #fa807277;
	width: 100%;
	height: 100%;
}

div.ovl .row {
	height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>