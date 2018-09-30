//array of gif/button cars
var cars=["Porsche", "Ferrari", "Aston Martin", "Lamborghini", "Bugatti", "Bentley"];

//function to render buttons
function renderButton(){
	$("#car-buttons").empty();

	//create buttons for each car in the array
for (var i=0; i < cars.length; i++){
		var buttons=$('<button>').text(cars[i]);
		buttons.addClass("test");
		buttons.attr("data-car", cars[i]);
		$('#car-buttons').append(buttons);
	};
};

renderButton();

	//grab the gifs and apply attributes when clicked
 $("#car-buttons").on("click", function(){

 	var car = ($(this).attr("data-car"));
 	var queryUrl='https://api.giphy.com/v1/gifs/search?q='+car+'&api_key=dc6zaTOxFJmzC&limit=10';
 	
	$.ajax({
		url: queryUrl,
		method: "GET"
	}).done(function(response){
			console.log(response);

		for (var i=0; i < response.data.length; i++){

			var rating=$("<p>").text("Rating: " + response.data[i].rating);
			var gif=$("<img>").attr("src", response.data[i].images.downsized_still.url);
			
			gif.attr("data-state", "still");
			gif.attr("data-still", response.data[i].images.downsized_still.url );
			gif.attr("data-animate", response.data[i].images.downsized.url );
			gif.addClass("gif");


			var giphy = $("<div class = 'giphy'>").append(gif, rating);
			$("#cars").prepend(giphy);
		}		
		});
 });




 //animate or pause the gifs
 $("#cars").on("click", ".gif", function(){
 	var state=$(this).attr("data-state");
	 	if(state==="still"){
	 		$(this).attr("src", $(this).attr("data-animate"));
		 	$(this).attr("data-state", "animate");
	 	} else {
	 		$(this).attr("src", $(this).attr("data-still"));
	 		$(this).attr("data-state", "still");

	 	} 	
 });



 //creates a new button with user's input
 $("#add-car").on("click", function(event){
 	event.preventDefault();
 	
 	var userInput=$("#car-input").val();
 	
 	cars.push(userInput); 	
 	renderButton();
 });

