<template>
	<div>
		<div class="results">
			<b-button v-for="p in pickuble_tags" :key="p" 
				@click="pickup(p)"
				:variant="p == picked ? 'primary' : 'secondary'"
			>{{ p }}</b-button>
			<div class="clr"></div>
		</div>
		<b-input-group>
			<b-form-input @input="onInput" v-model="input_value"></b-form-input>
			<b-input-group-append>
				<b-button @click="clear">&times;</b-button>
			</b-input-group-append>
		</b-input-group>

	</div>
</template>

<script>
export default {
	props: {
		value: {type: String, default: ''},
		tags: { type: Array, default: () => [] },
		limit: { type: Number, default: 10 },
	},
	data() {
		return {
			input_value: this.value,
			picked: this.value
		}
	},
	computed: {
		pickuble_tags() {
			let papables;
			if( this.input_value == '' ) {
				let x = this.tags.indexOf( this.value );
				if( x >= this.limit ) 
					papables = [this.value].concat( this.tags );
				else
					papables = this.tags;
			}
			else {
				let v = this.input_value.toLowerCase();
				papables = this.tags.filter( x => x.toLowerCase().indexOf( v ) >=0 );
			}
			return papables.slice(0,this.limit);
		}
	},
	methods: {
		onInput() {
			if( this.pickuble_tags.indexOf(this.input_value) < 0 ) {
				this.$emit('input', this.input_value);
			}
		},
		pickup(val) {
			this.picked = val;
			this.input_value = val;
			this.$emit('input', val);
		},
		clear() {
			this.input_value = '';
		}
	}
}
</script>

<style scoped>
.results {
	float: left;
}
.results button {
	margin-left: 0.3rem;
	margin-bottom: 0.3rem;
}
.clr {
	clear: left;
}
</style>