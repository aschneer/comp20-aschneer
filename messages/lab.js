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
		// Receive the response data from
		// the XMLHttpRequest object and
		// update the page with it.
		receiveData = JSON
	}
}

// Parse JSON data and display in content
// section of HTML document:
function parse()
{
	// Create XMLHttpRequest object.
	xmlhttp = new XMLHttpRequest();
	// Define the type of request to
	// send to the "server".
	xmlhttp.open("GET","./data.json",true);
	// Define function to run when the
	// ready-state of the XMLHttpRequest
	// object changes value.
	xmlhttp.onreadystatechange = callback;
	// Send the request defined in "open()"
	// to the XMLHttpRequest object server.
	xmlhttp.send();

	try
	{
		// Run some code here, which may or may
		// not work.

		// This statement will "throw" the error
		// to be caught in the error handler.
		// Catch only runs if an exception
		// is thrown.
		if(ERRORCONDITION)
		{
			throw ERRORVALUE
		}
	}
	// Use "error" here; it's a keyword.
	catch(error)
	{
		// Handle errors here.
		// Catch and suppress errors.

		// The value of the "throw"
		// is "caught" here and stored
		// in the "error" argument.

		// "error" can also be an object
		// of which the member "message"
		// contains the error message.
	}
	finally
	{
		// Code here will ALWAYS be executed
		// regardless of whether or not an error
		// occurred.
	}
	contentDiv = document.getElementById("messages");

}