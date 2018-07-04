// create an array of movies
var movie = ["Dumb and Dumber", "Wedding Crashers", "Fletch", "Goodwill Hunting"];

// creates buttons for each of these
function makeButtons(){ 
	// deletes the movies prior to adding new movies so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the movie array
	for (var i = 0; i < movie.length; i++){
		// dynamically makes buttons for every movie in the array
		var a = $('<button>') 
		a.addClass('movie'); // add a class
		a.attr('data-name', movie[i]); // add a data-attribute
		a.text(movie[i]); // make button text
		$('#buttonsView').append(a); // append the button to buttonsView div
	}
}

// handles addMovie button event
$("#addMovie").on("click", function(){

	// grabs the user movie input
	var movie = $("#movie-input").val().trim();
	// that input is now added to the array
	movie.push(movie);
	// the makeButtons function is called, which makes buttons for all my movies plus the user show
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})

// function to display gifs
function displayGifs(){
	var movie = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&limit=9&api_key=dc6zaTOxFJmzC";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var movieGif = $('<img>');
					movieGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the rating on hover
					movieGif.attr('title', "Rating: " + results[i].rating);
					movieGif.attr('data-still', results[i].images.fixed_height_still.url);
					movieGif.attr('data-state', 'still');
					movieGif.addClass('gif');
					movieGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(movieGif)
				// gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying movie gifs
$(document).on("click", ".movie", displayGifs);

// initially calls the makeButtons function
makeButtons();