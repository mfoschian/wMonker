<template>
		<div>
			<b-form-group
				label-cols-sm="2"
				label-cols-lg="2"
				label="Quanto"
				label-for="input-amount"
			>
				<b-input-group
					append="€"
					size="md"
				>
					<b-form-input id="input-amount"
						v-model="amount"
						type="number" min="0" step="0.01" 
						autofocus
					/>
				</b-input-group>
			</b-form-group>

			<b-form-group
				label-cols-sm="2"
				label-cols-lg="2"
				label="Cosa"
				label-for="input-what"
			>
				<b-form-tags input-id="tags-basic" v-model="tag"></b-form-tags>
			</b-form-group>


			<b-form-group
				label-cols-sm="2"
				label-cols-lg="2"
				label="Note"
				label-for="textarea"
			>
				<b-form-textarea
					id="textarea"
					v-model="note"
					placeholder="se serve annotare qualcosa"
					rows="3"
					max-rows="6"
				></b-form-textarea>
			</b-form-group>

			<b-form-group
				label-cols-sm="2"
				label-cols-lg="2"
				label="Quando"
				label-for="input-dt"
			>
				<b-form-datepicker
					id="input-dt"
					v-model="dt"
					class="mb-2"
				></b-form-datepicker>
			</b-form-group>
			
			<slot name="footer">
				<hr>
				<div align="center">
					<b-button @click="save()">Salva</b-button>
				</div>
			</slot>
		</div>
</template>

<script>
export default {
	props: {
		item: { type: Object, default: () => ({
			id: null,
			dt: new Date(),
			amount: 0,
			tag: [],
			note: "",
		})}
	},
	data() {
		return {
			id: this.item.id || null,
			dt: this.item.dt || new Date(),
			amount: this.item.amount || 0,
			tag: this.item.tag || [],
			note: this.item.note || "",
		}
	},
	methods: {
		save() {
			let dt = this.dt;
			if( typeof(this.dt) == 'string') {
				dt = new Date(dt);
			}
			this.$emit('save', {
				id: this.id,
				dt: dt,
				amount: this.amount,
				tag: this.tag,
				note: this.note
			});
		},
		cancel() {
			this.$emit('cancel');
		}
	},
}
</script>
