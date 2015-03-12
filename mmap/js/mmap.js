// Global Variables:
var myInfo = {
	login: "KelleyAmmerman",
	lat: 0,
	lng: 0,
};
var ajaxObj = new XMLHttpRequest();
// Array containing initial options for the map.
var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(myInfo.lat,myInfo.lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
// Object for my position marker.
var myMarker;
// Array to store the data for the class.
// This will be an array of objects
// containing lat/lng position and
// login name.
var classData = [];
// Array to contain objects with
// markers and information for the
// positions of the rest of the class.
var classMarkers = [];
/*
var classMarkerOptions = [];
var classMarkers = [];
var classMarkerClickListeners = [];
var classInfoWindows = [];
*/
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
		console.log("Got Data:");
		// Parse data from JSON file.
		parsedData = JSON.parse(ajaxObj.responseText);
		console.log(parsedData);
		for(var i = 0; i < parsedData.length; i++)
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
			// Create callback function for the current classmate.
			/*classCallbacks[i] = function(){

			};*/

			console.log(parsedData.length);

			// Open the info window.
			classInfoWindows[i].open(map,classMarkers[i]);
			// Add click event listener for info window.
			classMarkerClickListeners[i] = google.maps.event.addListener(classMarkers[i],"click",function(){
					console.log(i);
					classInfoWindows[i].open(map,classMarkers[i]);
			});
		}
	}
}

// Function to add marker
// to the map at a particular
// lat/lng location.  The
// argument is an object with
// fields "lat" and "lng".
function addUserMarker(LatLngObj)
{
	// Define options for my marker.
	var markerOptions = {
		map: map,
		title: myInfo.login,
		position: new google.maps.LatLng(LatLngObj.lat,LatLngObj.lng),
		visible: true,
		icon: "../assets/rickles_noBack_small.png"
	};
	// Create user's marker object and
	// update global "myMarker"
	// with the marker object.
	myMarker = new google.maps.Marker(markerOptions);
	// Create an info window
	// for my marker.
	myInfoWindow = new google.maps.InfoWindow({
		content: myMarker.getTitle()
	});
	// Add a click event listener
	// for the user's marker.
	ADDEVENTLISTENER


			myInfoWindow = new google.maps.InfoWindow({
					content: myMarker.getTitle()
			});
			// Open the info window.
			myInfoWindow.open(map,myMarker);
			// Add click event listener for info window.
			myMarkerClickListener = google.maps.event.addListener(myMarker,"click",function(){
					infoWindow.open(map,myMarker);


}

// Function to add classmate's marker
// to the map at a particular
// lat/lng location.  The
// argument is an object with
// fields "lat" and "lng".
function addClassMarker(LatLngObj)
{

}

// Grab the user's current GPS location
// and return it as an object containing
// two fields: "lat", and "lng".
function getMyLocation()
{
	var currentLatLng;
	// Get user's location.
	if(navigator.geolocation)
	{
		// Geolocation available.
		// Get current position.
		navigator.geolocation.getCurrentPosition(function(posObj){
			var currentLat = posObj.coords.latitude;
			var currentLng = posObj.coords.longitude;
			currentLatLng = {lat:currentLat,lng:currentLng};
			// Update "myInfo" object.
			myInfo.lat = currentLat;
			myInfo.lng = currentLng;
			// Call function to place a marker
			// at the user's current position.
			addUserMarker(currentLatLng);
		});
	}
	else
	{
		// Geolocation not available.
	}
}

// This function runs when HTML body loads.
function init()
{
	// Create the map object.  This is global.
	map = new google.maps.Map(document.getElementById('map-canvas'),
		  mapOptions);
	// These will not necessarily
	// execute in order or finish
	// at the same time.
	getMyLocation();
	getClassLocations();
}



/*
			var lat = posObj.coords.latitude;
			var lng = posObj.coords.longitude;
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

*/