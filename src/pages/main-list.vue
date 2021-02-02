<template>
  <b-container fluid >
	<b-button
		variant="info"
		title="Aggiungi Spesa"
		class="add-button"
		to="/"
	>+</b-button>

	<b-modal ref="new_item" title="Modifica">
		<template #modal-footer><span></span></template>
		<entryForm :item="item" @save="update" :tags="tags_array"></entryForm>
	</b-modal>
	<hr>
	<entries
		:items="items" 
		:limit="visible_items_count"
		@remove="remove_edit"
		@edit="edit_item"
		:selected_id="item.id"
	/>

	<b-button v-if="visible_items_count < items.length"
		@click="visible_items_count+=2"
	>...</b-button>
  </b-container>
</template>

<script>

import DB from "@/storage/db";

import entryForm from "@/components/entry-form";
import entries from "@/components/entries";

export default {
	name: 'app',
	components: { entryForm, entries },
	data() {
		return {
			item: {
				id: null,
				dt: null,
				amount: 0,
				tag: [],
				note: "",
			},
			items: [],
			visible_items_count: 3,
			ordered_tags: [],
		}
	},
	computed: {
		tags_array() {
			return this.ordered_tags.map( x => x.name );
		}
	},
	methods: {
		show_form() {
			this.$refs['new_item'].show();
		},
		hide_form() {
			this.$refs['new_item'].hide();
		},
		async load_data() {
			try {
				let items = await DB.get_all();
				this.items = items;
				this.ordered_tags = await DB.tags_by_hits();
			}
			catch( ex ) {
				console.error( ex ); // eslint-disable-line
			}
		},
		async update(data) {
			console.log( data ); // eslint-disable-line
			try {
				// debugger; // eslint-disable-line
				await DB.update( data );

				for( let i=0; i<this.items.length; i++ ) {
					let it = this.items[i];
					if( it.id == data.id ) {
						this.items.splice(i,1,data);
						break;
					}
				}

				this.ordered_tags = await DB.tags_by_hits();
				this.hide_form();
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		async remove_edit(id) {
			let ok = confirm("Cancello la spesa ?");
			if( !ok )
				return;

			try {
				await DB.remove(id);
				this.items = this.items.filter( x => x.id != id );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		edit_item(id) {
			let item = this.items.filter( x=> x.id==id )[0] || {};
			if( item ) {
				this.item = item;
				this.show_form();
			}

			
		}
	},
	mounted() {
		// debugger; // eslint-disable-line
		this.load_data();
	}
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button.add-button {
	border-radius: 50%;
	font-weight: bold;
	font-size: 1.5em;
}
</style>
