// Global Variables:
var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var myLatLng = new google.maps.LatLng(myLat, myLng);
// Array containing initial options for the map.
var mapOptions = {
		zoom: 8,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
var map;
var myMarker;

// This function runs when HTML body loads.
function init()
{
	// Create the map object.  This is global.
	map = new google.maps.Map(document.getElementById('map-canvas'),
		  mapOptions);

	// Get user's location.
	if(navigator.geolocation)
	{
		// Geolocation available.
		// Get current position.
		navigator.geolocation.getCurrentPosition(function(posObj){
			myLat = posObj.coords.latitude;
			myLng = posObj.coords.longitude;
			// Center the map on my current location.
			var currLoc = new google.maps.LatLng(myLat,myLng);
			map.setCenter(currLoc);
			// Create a marker at my current location.
			// Add an info window to display my imaginary
			// username.
			var markerOptions = {
					map: map,
					// My imaginary username.
					title: "KelleyAmmerman",
					position: currLoc,
					visible: true,
					icon: "../assets/rickles_noBack_small.png"
				};
			myMarker = new google.maps.Marker(markerOptions);
			var infoWindow = new google.maps.InfoWindow({
					content: myMarker.getTitle()
				});
			// Open the info window.
			infoWindow.open(map,myMarker);
			// Add click event listener for info window.
			google.maps.event.addListener(myMarker,"click",function(){
					infoWindow.open(map,myMarker);
				});
		});
	}
	else
	{
		// Geolocation not available.
	}	
}