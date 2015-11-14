(function() {
	'use strict';

	// Create XHR Object
	var xhr = new XMLHttpRequest();

	// Handle 'onreadystatechange' event
	xhr.onreadystatechange = function() {
		if ( ( xhr.readyState === 4 ) && ( xhr.status === 200 || xhr.status === 304 ) ) {
			var response = xhr.responseText;
			console.log(response);
		}
	};

	// Open the request
	xhr.open( 'GET', 'files/ajax.txt', true );

	// Send the request
	xhr.send( null );

}());