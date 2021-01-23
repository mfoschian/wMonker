/*
function pad2(n) {
	if( n<10 ) return n;
	return '0' + n;
}
*/

export function format_dt(dt) {

	if(!dt) return '';
	if(typeof(dt) == 'string') return dt;
	if(!dt.getFullYear) return dt;

	let now = new Date();

	let this_year = now.getFullYear();
	let dt_year = dt.getFullYear();

	let this_month = now.getMonth();
	let dt_month = dt.getMonth();

	let this_date = now.getDate();
	let dt_date = dt.getDate();

	if( this_year != dt_year ) {
		return dt_date + '/' + (dt_month + 1) + '/' + dt_year;
	}

	if( this_month != dt_month )
		return dt_date + '/' + (dt_month + 1);

	if( this_date != dt_date )
		return dt_date + '';

	return 'oggi';
}

export function euro( n ) {
	return n + ' €';
}