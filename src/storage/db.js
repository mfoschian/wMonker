// import { get } from 'core-js/fn/dict';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';


let db = new Dexie("spese");
db.version(1).stores({
	expenses: 'id,dt,tag',
	tags: 'name'
});


let DB = {
	async add( item ) {
		let newid = uuidv4();
		let record = {
			id: newid,
			dt: item.dt || new Date(),
			amount: item.amount,
			note: item.note,
			tag: item.tag
		};
		db.expenses.put( record ).then( function() {
			return db.expenses.get(newid)
		})
		.catch(function(err) {
			console.error( err ); // eslint-disable-line
			return null;
		});
	},
	async remove( id ) {
		// debugger; // eslint-disable-line
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
	}
}

export default DB;