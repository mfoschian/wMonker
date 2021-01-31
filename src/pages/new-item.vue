<template>
	<b-container fluid>

		<entryForm @save="save" @cancel="cancel"></entryForm>

	</b-container>
</template>

<script>

import DB from "@/storage/db";

import entryForm from "@/components/entry-form";

export default {
	name: 'new-item',
	components: { entryForm },
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
		cancel() {
			this.gotoList();
		}
	},
}
</script>
