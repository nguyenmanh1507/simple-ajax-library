(function() {
	'use strict';
	var body = document.getElementsByTagName('body')[0],
			link = document.getElementsByTagName('a')[0],
			heading = document.createElement('h1')
		;

	link.onclick = function() {

		// Create XHR Object
		var xhr = new XMLHttpRequest();

		// Handle 'onreadystatechange' event
		xhr.onreadystatechange = function() {
			if ( ( xhr.readyState === 4 ) && ( xhr.status === 200 || xhr.status === 304 ) ) {
				var response = xhr.responseText;
				var hText = document.createTextNode(response);

				heading.appendChild(hText);
				body.appendChild(heading);
				body.removeChild(link);
			}
		};

		// Open the request
		xhr.open( 'GET', 'files/ajax.txt', true );

		// Send the request
		xhr.send( null );

		return false;
	};

}());