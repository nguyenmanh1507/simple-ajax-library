var Nm = {};

Nm.createXHR = function( url, options ) {
	var xhr = false;

	if ( window.XMLHttpRequest ) {
		xhr = new XMLHttpRequest();
	}

	if ( xhr ) {
		options = options || {};
		options.method = options.method || 'GET';

		xhr.onreadystatechange = function() {
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
		xhr.send( null );
	}
};