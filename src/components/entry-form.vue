<template>
	<div>
		<label for="example-datepicker">Choose a date</label>
		<b-form-datepicker
			id="example-datepicker"
			v-model="dt"
			class="mb-2"
		></b-form-datepicker>
		<b-form-input v-model="amount" type="number" min="0" step="0.01" />

		<label for="tags-basic">Type a new tag and press enter</label>
		<b-form-tags input-id="tags-basic" v-model="tag"></b-form-tags>

		<b-form-textarea
			id="textarea"
			v-model="note"
			placeholder="Nota:"
			rows="3"
			max-rows="6"
		></b-form-textarea>

		<hr>
		<b-button @click="save()" >Salva</b-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dt: new Date(),
			amount: 0,
			tag: [],
			note: "",
		}
	},
	methods: {
		save() {
			let dt = this.dt;
			if( typeof(this.dt) == 'string') {
				dt = new Date(dt);
			}
			this.$emit('save', {
				dt: dt,
				amount: this.amount,
				tag: this.tag,
				note: this.note
			});
		},
		cancel() {
			this.$emit('cancel');
		}
	}
}
</script>
