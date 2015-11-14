(function() {
	'use strict';
	var link = document.getElementsByTagName('a')[0];

	link.onclick = function() {

		Nm.ajax('files/ajax.json', {
			method: 'GET',
			complete: handleJSONResponse
		});

		return false;
	};

	function handleJSONResponse( response ) {
		var body = document.getElementsByTagName('body')[0],	
			heading = document.createElement('h1'),
			lists = document.createElement('ul'),
			hText = document.createTextNode(response.heading),
			key
		;

		for ( key in response.items ) {
			var listText = document.createTextNode(response.items[key]);
			var list = document.createElement('li');
			list.appendChild(listText);
			lists.appendChild(list);
		}

		heading.appendChild(hText);
		body.appendChild(heading);
		body.appendChild(lists);
		body.removeChild(link);

	}

}());