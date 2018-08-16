$(document).ready(function(){
	
	var cars = ["Ferrari", "Lamborghini", "Porsche", "Aston Martin"];

// function to display gifs
function displayGifs(){
	$("#display-images").empty();
	var cars = $(this).attr("data-name");
	var limit = 10;
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cars + "&limit=10&api_key=dc6zaTOxFJmzC";

	// ajax call
	$.ajax({url: queryURL, method: "GET"})
		.done(function (response) {

			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
		
				var gifDiv = $('<div class=gifs>');
				var carsGif = $('<img>');
					carsGif.attr('src', results[i].images.fixed_height_still.url);
					carsGif.attr('data-still', results[i].images.fixed_height_still.url);
					carsGif.attr('data-state', 'still');
					carsGif.addClass('gif');
					carsGif.attr('data-animate', results[i].images.fixed_height.url);
				var rating = results[i].rating;
				var p = $('<p>').text('Rating: ' + rating);
				gifDiv.prepend(carsGif)
				gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
		});
	}

// creates buttons for each of these
function renderButtons(){ 

	$("#display-buttons").empty();

	// loops through the car array
	for (var i = 0; i < cars.length; i++){

		var a = $('<button>');
		a.addClass('cars');
		a.attr('data-name', cars[i]); 
		a.text(cars[i]);
		$('#buttonsView').append(a); 
	}
}

$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
	if (state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
	}
			
	else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

// button event
$("#addCar").on("click", function(event){

event.preventDefault();

	var newSearch = $("#cars-input").val().trim();
	// adds to array
	cars.push(newSearch);

	renderButtons();

});

renderButtons();

$(document).on("click", ".cars", displayGifs);
});