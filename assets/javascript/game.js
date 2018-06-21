var topics = ["Tennis", "Basketball", "Golf"];

function displaySport() {

    var dataName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dataName + "&api_key=lJWCGsXAVjtpFvustefZF1o3PDmyjmzV&limit=10";
    console.log(dataName)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (i = 0; response.data.length > i; i++) {
            var rating = response.data[i].rating
            var gifDiv = $("<div class='item'>");
            console.log(response)
            var sportImage = $("<img>");
            sportImage.addClass("image");
        
            var p = $("<p>").text("Rating: " + rating);
            sportImage.attr('src', response.data[i].images.fixed_height_still.url);
            sportImage.attr('data-animate', response.data[i].images.fixed_height.url)
            sportImage.attr('data-still', response.data[i].images.fixed_height_still.url)

            .attr('data-state', 'still');
            sportImage.attr("alt", "sport image");
            gifDiv.append(p);
            gifDiv.append(sportImage);


            $("#images").prepend(gifDiv);


            renderButtons();
           
           
      
        };
        
        
    });
    
   
}

$(document).on("click", ".image", function (event) {
    var state = $(this).attr('data-state');
    console.log(this);
    console.log(state);

    if (state == 'still') {

        $(this).attr('src', $(this).data('animate'));

        $(this).attr('data-state', 'animate');

    } else {

        $(this).attr('src', $(this).data('still'));

        $(this).attr('data-state', 'still');

    }
});


function renderButtons() {


    $("#buttons-view").empty();


    for (var i = 0; i < topics.length; i++) {


        var a = $("<button>");

        a.addClass("sport");

        a.attr("data-name", topics[i]);

        a.text(topics[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-sportgif").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var sport = $("#sport-input").val().trim();

    // Adding the movie from the textbox to our array
    topics.push(sport);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

$(document).on("click", ".sport", displaySport);

renderButtons();
