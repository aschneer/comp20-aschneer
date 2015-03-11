// This function runs when the
// XMLHttpRequest object changes
// its ready-state.
function callback()
{
	console.log("In my calback function " + xmlhttp.readystate);
	// If request finished and response ready,
	// and HTML status code is "OKAY"...
	if((xmlhttp.readyState == 4) && (xmlhttp.status == 200))
	{
		// Receive the JSON "string"
		// (data object) from
		// the XMLHttpRequest object.
		var receiveData = JSON.parse(xmlhttp.responseText);
		// Get div element where data should go.
		var contentDiv = document.getElementById("messages");
		// Parse data into components and display.
		var displayData = "";
		for (i = 0; i < receiveData.length; i++)
		{
			displayData += "<p>" + receiveData[i]['username'] + " - " + receiveData[i]["content"] + "</p>";
		}
		contentDiv.innerHTML = displayData;
	}
}

// Parse JSON data and display in content
// section of HTML document:
function parse()
{
	// Create XMLHttpRequest object.
	// Exclude "var" so the object is global.
	xmlhttp = new XMLHttpRequest();
	// Define the type of request to
	// send to the "server"; use
	// asynchronous request.
	xmlhttp.open("GET","./data.json",true);
	// Define function to run when the
	// ready-state of the XMLHttpRequest
	// object changes value.
	xmlhttp.onreadystatechange = callback;
	// Send the request defined in "open()"
	// to the XMLHttpRequest object server.
	xmlhttp.send();
}