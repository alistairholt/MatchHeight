let initialized = false;
let elements;
let remains;

const MatchHeight = {

	init() {

		initialized = true;
		elements = document.querySelectorAll( '[data-mh]' );
		this.update();

	},

	update() {

		if ( ! initialized ) {

			this.init();
			return;

		}

		if ( elements.length === 0 ) return;

		remains = Array.prototype.map.call( elements, ( el ) => {

			return { el: el };

		} );
		// remove all height before
		remains.forEach( ( item ) => {

			item.el.style.minHeight = '';

		} );
		process();

	}

};

function process() {

	remains.forEach( ( item ) => {

		const bb = item.el.getBoundingClientRect();

		item.top    = bb.top;
		item.height = bb.height;

	} );

	remains.sort( ( a, b ) => a.top - b.top );

	const processingTop = remains[ 0 ].top;
	const processingTargets = remains.filter( item => item.top === processingTop );
	const maxHeightInRow = Math.max( ...processingTargets.map( ( item ) => item.height ) );

	processingTargets.forEach( ( item ) => {
		item.el.style.minHeight = `${ maxHeightInRow }px`;
	} );

	remains.splice( 0, processingTargets.length );

	if ( 0 < remains.length ) process();

}

export default MatchHeight;
