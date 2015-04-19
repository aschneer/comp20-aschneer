// Global Variables:
var myInfo = {
	login: "RobertDeNiro",
	lat: 0,
	lng: 0,
};
var ajaxObj = new XMLHttpRequest();
var map;
// Arrays to store user's information.
var myMarker;
var myInfoWindow;
var myMarkerClickListener;
// Arrays to store class's information.
var classMarkers = [];
var classInfoWindows = [];
var classMarkerClickListeners = [];



// Update class's marker info-windows
// with calculated Haversine distances.
function classInfoWindowAddContent(index,dist)
{
	classInfoWindows[index].setContent(
		"<h3>"+classMarkers[index].getTitle()
		+"</h3>"+"<p>"+dist
		+" miles away</p>"
	);
}

// Calculate distance between two lat/lng
// points using Haversine formula.
function calcHaversineDist(index)
{
	// Save coordinates in radians.
	var myLat = myInfo.lat*(Math.PI/180);
	var myLng = myInfo.lng*(Math.PI/180);
	var theirLat = (classMarkers[index].getPosition().lat())*(Math.PI/180);
	var theirLng = (classMarkers[index].getPosition().lng())*(Math.PI/180);
	// Haversine calculation parameters.
	var R = 6371000;	//meters.
	var phi1 = myLat;
	var phi2 = theirLat;
	var deltaPhi = (phi2 - phi1);
	var deltaLambda = (theirLng - myLng);
	var a = (Math.pow((Math.sin(deltaPhi/2)),2)
			+ (Math.cos(phi1)*Math.cos(phi2)
			*Math.pow((Math.sin(deltaLambda/2)),2)));
	var c = (2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)));
	var d = ((0.621371/1000) * (R * c));	//Convert meters to miles.
	// Round "d" to 5 decimal places.
	d = (Math.round(d * 100000) / 100000);
	// Update classmate info window with
	// appropriate content.
	classInfoWindowAddContent(index,d);
}

// Function to generate click event
// listener for a classmate's marker.
function addClassClickListener(index,end)
{
	// Add click event listener for info window.
	classMarkerClickListeners[index] = google.maps.event.addListener(classMarkers[index],"click",function(){
			classInfoWindows[index].open(map,classMarkers[index]);
	});
	// Calculate the distance of the current classmate from
	// the user using the Haversine formula.
	calcHaversineDist(index);
}

// Function to add classmate's marker
// to the map at a particular
// lat/lng location.  The
// argument is an object with
// fields "lat" and "lng".
function addClassMarkers(classDataArray)
{
	// Loop through class data and create
	// markers and info windows.
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
				icon: "./assets/rickles_noBack_small.png"
		};
		// Create a marker for the current classmate.
		classMarkers[i] = new google.maps.Marker(markerOptions);
		// Create a marker info bubble for the current classmate.
		classInfoWindows[i] = new google.maps.InfoWindow({
				content: ""
		});
		// Open the info window by default.
//		classInfoWindows[i].open(map,classMarkers[i]);
		// Call function to add click event listener
		// for each classmate's marker.
		addClassClickListener(i,(classDataArray.length-1));
	}
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
// argument is a Google Maps
// LatLng object.
function addUserMarker(LatLngObj)
{
	// Define options for my marker.
	var markerOptions = {
		map: map,
		title: myInfo.login,
		position: LatLngObj,
		visible: true,
		icon: "./assets/rickles_noBack_small.png"
	};
	// Create user's marker object and
	// update global "myMarker"
	// with the marker object.
	myMarker = new google.maps.Marker(markerOptions);
	// Create an info window
	// for user's marker and update
	// global "myInfoWindow" variable.
	myInfoWindow = new google.maps.InfoWindow({
		content: ("<h3>"+myMarker.getTitle()
				+"</h3>")
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
	// NOTE: This won't work if the info
	// windows for all the markers are opened
	// by default, as they are here.  Comment
	// that line out in order for this to work.
	map.setCenter(myMarker.getPosition());
}

// Grab the class' data.
// Call a function to add markers at
// the class' current locations.
function addClassToMap()
{
	// Load JSON data of the rest
	// of the class, send my location
	// and username.
//	ajaxObj.open("POST","https://secret-about-box.herokuapp.com/sendLocation",true);
	ajaxObj.open("POST","https://comp20ass03mapserver.herokuapp.com/sendLocation",true);
	ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajaxObj.onreadystatechange = ajaxCallback;
	ajaxObj.send("login="+myInfo.login+"&lat="+myInfo.lat+"&lng="+myInfo.lng);
}

// Grab the user's current GPS location.
// Call a function to add a marker at
// the user's current location.
function getUserLocation()
{
	// Get user's location.
	if(navigator.geolocation)
	{
		// Geolocation available.
		// Get current position.
		navigator.geolocation.getCurrentPosition(function(posObj){
			// Update "myInfo" object.
			myInfo.lat = posObj.coords.latitude;
			myInfo.lng = posObj.coords.longitude;
			// Add class markers to
			// the map.
			addClassToMap();
			// Create Google Maps LatLng object for
			// user's current position.
			var currentLatLng = new google.maps.LatLng(myInfo.lat,myInfo.lng);
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
	// Object containing initial options for the map.
	var mapOptions = {
			zoom: 8,
			center: new google.maps.LatLng(myInfo.lat,myInfo.lng),
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	// Create the map object.  This is global.
	map = new google.maps.Map(document.getElementById('map-canvas'),
		  mapOptions);
	// Get location of user
	// first.
	getUserLocation();
}
