var Nm = {};

Nm.createXHR = function( url, options ) {
	var xhr = false;

	if ( window.XMLHttpRequest ) {
		xhr = new XMLHttpRequest();
	}

	if ( xhr ) {
		options = options || {};
		options.method = options.method || 'GET';
		options.data = options.data || null;

		if ( options.data ) {
			var qstring = [],
					key
				;

			for ( key in options.data ) {
				qstring.push( encodeURIComponent( key ) + '=' + encodeURIComponent( options.data[key] ) );
			}

			options.data = qstring.join('&');
		}

		xhr.onreadystatechange = function() {

			if ( xhr.readyState === 1 ) {
				if ( options.before ) {
					options.before.call(xhr);
				}
			}

			if ( options.cache === false && options.method.toUpperCase() === 'GET' ) {
				url = url + '?_=' + new Date().getTime();
			}

			if ( ( xhr.readyState === 4 ) && ( xhr.status === 200 || xhr.status === 304 ) ) {
				var contentType = xhr.getResponseHeader( 'Content-Type' );
				if ( options.complete ) {
					if ( contentType.search( /json/ ) > 1 ) {
						options.complete.call( xhr, JSON.parse( xhr.responseText ) );
					} else if ( contentType.search( /xml/ ) > 1 ) {
						options.complete.call( xhr, xhr.responseXML );
					} else {
						options.complete.call( xhr, xhr.responseText );
					}
				}
			}
		};

		xhr.open( options.method, url, true );
		return xhr;
	} else {
		return false;
	}
};

Nm.ajax = function( url, options ) {
	var xhr = Nm.createXHR( url, options );

	if ( xhr ) {
		xhr.setRequestHeader('X-Requested-Width', 'XMLHttpRequest');

		if ( options.method.toUpperCase() === 'POST' ) {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		xhr.send( options.data );
	}
};

Nm.flash = function( el ) {
	el.style.backgroundColor = 'gold';

	window.setTimeout( function() {
		el.style.backgroundColor = 'white';
	} , 300 );
};