<template>
	<b-card title="Registra Spesa">
		<b-card-body>

			<entryForm @save="save" :tags="tags_array"></entryForm>

		</b-card-body>
		<!--
		<b-card-footer>
			<b-row>
				<b-col>
					<b-button @click="save()" >Salva</b-button>
				</b-col>
				<b-col>
					<b-button @click="cancel()" >Annulla</b-button>
				</b-col>
			</b-row>
		</b-card-footer>
		-->
		<b-card-footer>
			<b-button @click="gotoList()" >Vedi lista</b-button>
		</b-card-footer>
	</b-card>

</template>

<script>

import DB from "@/storage/db";

import entryForm from "@/components/entry-form";

export default {
	name: 'new-item',
	components: { entryForm },
	data() {
		return {
			ordered_tags: [],
		}
	},
	computed: {
		tags_array() {
			return this.ordered_tags.map( x => x.name );
		}
	},
	methods: {
		gotoList() {
			this.$router.push({ path: '/list' })
		},
		async save(data) {
			console.log( data ); // eslint-disable-line
			try {
				// debugger; // eslint-disable-line
				await DB.add( data );
				this.gotoList();
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		async load_tags() {
			try {
				this.ordered_tags = await DB.tags_by_hits();
			}
			catch( ex ) {
				console.error( ex ); // eslint-disable-line
			}
		},
	},
	mounted() {
		this.load_tags();
	}
}
</script>
