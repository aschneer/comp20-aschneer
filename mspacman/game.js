function init()
{
	// Get canvas DOM node from HTML.
	var canvas = document.getElementById('game_canvas');
	// Get the canvas context.
	var ctx = canvas.getContext('2d');

	// Create image objects for background
	// and Ms. Pacman.
	var spriteSheet = new Image();
	spriteSheet.src = "./pacman10-hp-sprite.png";

	// Determine relative destination x-y locations of
	// background image and mspacman image.
	// These will be the x-y coordinates RELATIVE to
	// an arbitrary top-left-corner point.
	// This will allow the group of images to be
	// placed anywhere in the canvas without having
	// to recalculate the absolute x-y locations of
	// all the constituent images.
	var topLeft_x_abs = 0;
	var topLeft_y_abs = 0;
	var back_x_rel = 0;
	var back_y_rel = 0;
	var mspac_x_rel = 37;
	var mspac_y_rel = 31;

	h = parseInt(canvas.getAttribute("height"));
	w = parseInt(canvas.getAttribute("width"));

	ctx.fillStyle = "gray";
	ctx.fillRect(0,0,w,h);

	// Function expression stored to a variable.
	// This function is invoked when the
	// "onload" field is called within
	// the spriteSheet image.
	spriteSheet.onload = function()
	{
		// Draw background.
		ctx.drawImage(spriteSheet,322,2,464,136,(topLeft_x_abs + back_x_rel),(topLeft_y_abs + back_y_rel),464,136);
		// Draw Ms. Pacman.
		ctx.drawImage(spriteSheet,83,23,13,14,(topLeft_x_abs + mspac_x_rel),(topLeft_y_abs + mspac_y_rel),13,14);
	};
}