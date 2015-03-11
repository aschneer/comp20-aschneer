function init()
{
	// Array containing initial options for the map.
	var mapOptions = 
	{
		center: {lat:42.407541, lng:-71.119012},
		zoom: 8
	};
	// Create the map object.
	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
}