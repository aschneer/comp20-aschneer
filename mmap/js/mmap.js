// Global Variables:
var myLogin = "KelleyAmmerman";
var myLat = 0;
var myLng = 0;
var ajaxObj = new XMLHttpRequest();
var myLatLng = new google.maps.LatLng(myLat,myLng);
// Array containing initial options for the map.
var mapOptions = {
		zoom: 8,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
var map;
// Variables for my position marker.
var myMarkerOptions;
var myMarker;
var myMarkerClickListener;
var myInfoWindow;
// Arrays to hold position marker
// information for the rest of
// the class.
var classMarkerOptions;
var classMarkers;
var classMarkerClickListeners;
var classInfoWindows;
// Class position data.
var parsedData;



// Function to execute when the
// XMLHttpRequest server (AJAX)
// changes its ready-state.
function ajaxCallback()
{
	// Check if data was received.
	if((ajaxObj.readyState == 4) && (ajaxObj.status == 200))
	{
		// Parse data from JSON file.
		parsedData = JSON.parse(ajaxObj.responseText);
		for(i = 0; i < parsedData.length; i++)
		{
			// Create LatLng object for current
			// classmate's position.
			var currDataLoc = new google.maps.LatLng(parsedData[i].lat,parsedData[i].lng);
			// Generate marker options for
			// current classmate.
			classMarkerOptions[i] = {
					map: map,
					title: parsedData[i].login,
					position: currDataLoc,
					visible: true,
					icon: "../assets/rickles_noBack_small.png"
				};
			// Create a marker for the current classmate.
			classMarkers[i] = new google.maps.Marker(classMarkerOptions[i]);
			// Create a marker info bubble for the current classmate.
			classInfoWindows[i] = new google.maps.InfoWindow({
					content: classMarkers[i].getTitle()
				});
			// Open the info window.
			classInfoWindows[i].open(map,classMarkers[i]);
			// Add click event listener for info window.
			classMarkerClickListeners = google.maps.event.addListener(classMarkers[i],"click",function(){
					classInfoWindows[i].open(map,classMarkers[i]);
				});
		}
	}
}



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
			myMarkerOptions = {
					map: map,
					// My imaginary username.
					title: myLogin,
					position: currLoc,
					visible: true,
					icon: "../assets/rickles_noBack_small.png"
				};
			myMarker = new google.maps.Marker(myMarkerOptions);
			myInfoWindow = new google.maps.InfoWindow({
					content: myMarker.getTitle()
				});
			// Open the info window.
			myInfoWindow.open(map,myMarker);
			// Add click event listener for info window.
			myMarkerClickListener = google.maps.event.addListener(myMarker,"click",function(){
					infoWindow.open(map,myMarker);
				});
			// Load JSON data of the rest
			// of the class, send my location
			// and username.
			ajaxObj.open("POST","https://secret-about-box.herokuapp.com/sendLocation",true);
			ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajaxObj.onreadystatechange = ajaxCallback;
			ajaxObj.send("login="+myLogin+"&lat="+myLat+"&lng="+myLng);
		});
	}
	else
	{
		// Geolocation not available.
	}	
}