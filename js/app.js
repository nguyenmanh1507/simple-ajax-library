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
			var listText = document.createTextNode(response.items[key]),
			    list = document.createElement('li')
			  ;
			list.appendChild(listText);
			lists.appendChild(list);
		}

		heading.appendChild(hText);
		body.appendChild(heading);
		body.appendChild(lists);
		body.removeChild(link);

	}

	// Submit form
	var form = document.getElementsByTagName('form')[0];

	form.onsubmit = function() {

		var emailVal = document.getElementById('email').value,
		    url = form.getAttribute('action'),
			  body = document.getElementsByTagName('body')[0],
				d = document.createElement('div')
			;

		body.appendChild(d);
		var div = document.getElementsByTagName('div')[0];

		var handleFormSubmit = function( response ) {
			div.innerHTML = response;
			Nm.flash(div);
		};

		var beforeEvent = function() {
			div.innerHTML = '<p>Loading...</p>';
		};

		Nm.ajax(url, {
			method: 'POST',
			data: {
				email: emailVal
			},
			before: beforeEvent,
			complete: handleFormSubmit
		});

		return false;

	};

}());