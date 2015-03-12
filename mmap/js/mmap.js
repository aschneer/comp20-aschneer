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
// Object for user's position marker.
var myMarker;
// Object for user's info window.
var myInfoWindow;
// Object for user's click event listener.
var myMarkerClickListener;
// Array to store the markers
// for the class.
var classMarkers = [];
var classInfoWindows = [];
var classMarkerClickListeners = [];

// Function to generate click event
// listener for a classmate's marker.
function addClassClickListener(index)
{
	// Add click event listener for info window.
	classMarkerClickListeners[index] = google.maps.event.addListener(classMarkers[index],"click",function(){
			classInfoWindows[index].open(map,classMarkers[index]);
	});
}

// Function to execute when the
// XMLHttpRequest server (AJAX)
// changes its ready-state.
function ajaxCallback()
{
	// Check if data was received.
	if((ajaxObj.readyState == 4) && (ajaxObj.status == 200))
	{
		// Parse data from JSON file.
		var parsedData = JSON.parse(ajaxObj.responseText);
		// Call function to add markers for
		// the rest of the class.
		addClassMarkers(parsedData);
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
	// for user's marker and update
	// global "myInfoWindow" variable.
	myInfoWindow = new google.maps.InfoWindow({
		content: myMarker.getTitle()
	});
	// Open the user's info window
	// by default.
	myInfoWindow.open(map,myMarker);
	// Add a click event listener
	// for the user's marker.
	myMarkerClickListener = google.maps.event.addListener(myMarker,"click",function(){
		myInfoWindow.open(map,myMarker);		
	});
	// Center the map on the user's marker.
	map.setCenter(myMarker.getPosition());
}

// Function to add classmate's marker
// to the map at a particular
// lat/lng location.  The
// argument is an object with
// fields "lat" and "lng".
function addClassMarkers(classDataArray)
{
	for(var i = 0; i < classDataArray.length; i++)
	{
		// Create LatLng object for current
		// classmate's position.
		var currDataLoc = new google.maps.LatLng(classDataArray[i].lat,classDataArray[i].lng);
		// Generate marker options for
		// current classmate.
		var markerOptions = {
				map: map,
				title: classDataArray[i].login,
				position: currDataLoc,
				visible: true,
				icon: "../assets/rickles_noBack_small.png"
		};
		// Create a marker for the current classmate.
		classMarkers[i] = new google.maps.Marker(markerOptions);
		// Create a marker info bubble for the current classmate.
		classInfoWindows[i] = new google.maps.InfoWindow({
				content: classMarkers[i].getTitle()
				//--ADD DISTANCE FROM ME--
		});
		// Open the info window by default.
		classInfoWindows[i].open(map,classMarkers[i]);
		// Call function to add click event listener
		// for each classmate's marker.
		addClassClickListener(i);
	}
}

// Grab the user's current GPS location.
// Call a function to add a marker at
// the user's current location.
function addUserToMap()
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

// Grab the class' data.
// Call a function to add markers at
// the class' current locations.
function addClassToMap()
{
	// Load JSON data of the rest
	// of the class, send my location
	// and username.
	ajaxObj.open("POST","https://secret-about-box.herokuapp.com/sendLocation",true);
	ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajaxObj.onreadystatechange = ajaxCallback;
	ajaxObj.send("login="+myInfo.login+"&lat="+myInfo.lat+"&lng="+myInfo.lng);
}

// This function runs when HTML body loads.
function init()
{
	// Create the map object.  This is global.
	map = new google.maps.Map(document.getElementById('map-canvas'),
		  mapOptions);
	// Add user markers to
	// the map.
	addUserMarker();
	// Add class markers to
	// the map.
	addClassToMap();
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