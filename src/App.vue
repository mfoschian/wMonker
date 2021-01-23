<template>
  <b-container fluid id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
	<b-button @click="addItem"
		variant="info"
		title="Aggiungi Spesa"
		class="add-button"
	>+</b-button>
	<hr>
	<entryForm v-if="editor_visible" @save="save">
	</entryForm>
	<detail v-if="details_visible" :item="item" />
	<hr>
	<entries :items="items" @remove="remove" @selected="selected" :selected_id="item.id"/>
  </b-container>
</template>

<script>

import DB from "@/storage/db";

import entryForm from "@/components/entry-form";
import entries from "@/components/entries";
import detail from "@/components/entry-detail";

export default {
	name: 'app',
	components: { entryForm, entries, detail },
	data() {
		return {
			editor_visible: false,
			details_visible: false,
			item: {
				id: null,
				dt: null,
				amount: 0,
				tag: [],
				note: "",
			},
			items: []
		}
	},
	methods: {
		async load_data() {
			try {
				let items = await DB.get_all();
				this.items = items;
			}
			catch( ex ) {
				console.error( ex ); // eslint-disable-line
			}
		},
		async save(data) {
			console.log( data ); // eslint-disable-line
			try {
				// debugger; // eslint-disable-line
				await DB.add( data );
				this.items.push( data );
				this.editor_visible = false;
				this.item = data;
				this.details_visible = true;
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		async remove(id) {
			try {
				await DB.remove(id);
				this.items = this.items.filter( x => x.id != id );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		addItem() {
			this.editor_visible = true;
		},
		selected(id) {
			let item = this.items.filter( x=> x.id==id )[0] || {};
			if( item ) {
				this.item = item;
				this.details_visible = true;
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
