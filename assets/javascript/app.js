// Create initial array of hip-hop artists 
var topics = ["kanye west", "lil pump", "jay-z", "nicki minaj", "snoop dogg", "drake", "eminem", "beyonce", "justin bieber", "rihanna"]

// Calling renderBtn to display initial topics array
renderBtn();

// Renders the HTML to display gifs
function displayGif() {

// Variable that is the data attribute of the button that was clicked
    var artist = $(this).attr("data-artist");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=BioH0AJgVkFUuUBnaLHHKjIh6LiXHDnz&limit=10";

    // Creating my AJAX call using the Gipgy API with artist and my API Key. Setting limit to 10 results. 
    $.ajax({
        url: queryURL,
        method: "GET",
        limit: 10,
    })
        .then(function (response) {

            // Variable for information in data key
            var results = response.data;
            $(".gif").on("click", function gif() {
                var state = $(this).attr("data-state");
                
                // If statement to see if data-state is equal to still
                if (state === "still") {

                    // Change image source to the value of data-animate
                    $(this).attr("src", $(this).attr("data-animate"));

                    // Change data-state attribute to animate
                    $(this).attr("data-state", "animate");


                  } else {

                    // Change image source to the value of data-still
                    $(this).attr("src", $(this).attr("data-still"));

                    // Change data-state attribute to still
                    $(this).attr("data-state", "still");
                  }
            });

            // Create loop to display each result
            for (var i = 0; i < results.length; i++) {


                // Create gifDiv to store gif & rating
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;

                // Create a paragraph to display the rating of the gif
                var p = $("<p>").text("Rating: " + rating)

                // Adding still and animate attributes to artistImage
                var artistImage = $("<img>").attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");
                artistImage.attr("src", results[i].images.fixed_height_still.url)

                // Prepend gifDiv so artist images appear
                gifDiv.prepend(p);
                gifDiv.prepend(artistImage);
                $("#images").prepend(gifDiv);
            }
            
            // Function that pauses and plays gifs
            $(".gif").on("click", function () {

                // Varisble to hold data-state
                var state = $(this).attr("data-state");
                
                // If statement to check if data-state is equal to still
                if (state === "still") {

                    // Change data-state attribute to animate
                    $(this).attr("data-state", "animate");

                    // Change image source value of data-animate
                    $(this).attr("src", $(this).attr("data-animate"));

                  } else {

                    // Change data-state attribute to still
                    $(this).attr("data-state", "still");

                    // Change image source to value of data-still
                    $(this).attr("src", $(this).attr("data-still"));
                  }
            });
           
           
        });
        
}

// Prevent repeat buttons, and adds new ones to div
function renderBtn() {
    $(".buttons").empty();

    // Loops through topics array
    for (var i = 0; i < topics.length; i++) {
        $(".buttons").append($("<button>").attr("value", topics[i]).attr("data-artist", topics[i]).addClass("button").text(topics[i]));
    }
}

// Creates new buttons  
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var inputArtist = $("#searchBar").val().trim().toLowerCase();

    topics.push(inputArtist);
    
    renderBtn();
    $("#searchBar").val("");
    console.log(topics);
});


// Click event listener to all elements with button class to displayGifs function
$(document).on("click", ".button", displayGif);