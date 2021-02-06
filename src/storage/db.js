// import { get } from 'core-js/fn/dict';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';


let db = new Dexie("spese");
db.version(1).stores({
	expenses: 'id,dt,tag',
	tags: 'name,hits'
});
db.version(2).stores({
	expenses: 'id,dt,tag',
	tags: 'name,hits'
});

let DB = {
	async inc_tag_hits( tag_name ) {
		if( !tag_name ) return null;
		try {
			let t = await db.tags.get( tag_name );
			if( !t ) {
				t = {
					name: tag_name,
					hits: 1
				};
			}
			else
				t.hits += 1;

			await db.tags.put( t );
			return t.hits;
		}
		catch( err ) {
			console.error( 'Error looking for tag %s', tag_name ); // eslint-disable-line
			return 0;
		}
	},
	async dec_tag_hits( tag_name ) {
		if( !tag_name ) return null;
		try {
			let t = await db.tags.get( tag_name );
			if( !t )
				return 0;
				
			if( t.hits <= 0 )
				return 0;

			t.hits -= 1;

			await db.tags.put( t );
			return t.hits;
		}
		catch( err ) {
			console.error( 'Error looking for tag %s', tag_name ); // eslint-disable-line
			return 0;
		}
	},
	async add( item ) {
		let newid = uuidv4();
		let record = {
			id: newid,
			dt: item.dt || new Date(),
			amount: item.amount,
			note: item.note,
			tag: item.tag
		};
		try {
			await db.expenses.put( record );
			let r = await db.expenses.get(newid);

			if( r && r.tag) {
				await DB.inc_tag_hits(r.tag);
			}

			return r;
		}
		catch(err) {
			console.error( err ); // eslint-disable-line
			return null;
		}
	},
	async update( item ) {
		if( !item || !item.id ) {
			console.error( 'update: id is null'); // eslint-disable-line
			return null;
		}
		try {
			let record = await db.expenses.get( item.id );
			if( !record ) {
				console.warn( 'update: item not found. id = %s', item.id ); // eslint-disable-line
				return null;
			}

			record.dt = item.dt || new Date();
			record.amount = item.amount;
			record.note = item.note;
			let old_tag = record.tag;
			record.tag = item.tag;
			await db.expenses.put( record );
	
			if( old_tag != item.tag ) {
				await DB.inc_tag_hits( item.tag );
				await DB.dec_tag_hits( old_tag );
			}
			
			return record;
		}
		catch( err ) {
			console.error( err ); // eslint-disable-line
			return null;
		}
	},
	async remove( id ) {
		return db.expenses.delete( id )
		.catch(function(err) {
			console.error( err ); // eslint-disable-line
			return null;
		});
	},
	async get( id ) {
		return db.expenses.get( id )
		.catch(function(err) {
			console.error( err ); // eslint-disable-line
			return null;
		});
	},
	async get_all() {
		return db.expenses.toArray()
		.catch(function(err) {
			console.error( err ); // eslint-disable-line
			return null;
		});
	},
	async tags_by_hits() {
		// todo... order by hits
		return db.tags.orderBy('hits').reverse().toArray()
		.catch(function(err) {
			console.error( err ); // eslint-disable-line
			return [];
		});
	}
}

export default DB;
