var topics = ["happy", "sad", "weak", "strong", "crazy", "kind", "smile", "crying"]
// function to make new buttons for every added item
function renderButtons() {
    $(".buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("topic btn btn-default");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $(".buttons-view").append(newButton);
    }
};

// on click function to get the value
$("#add-topic").on("click", function () {
    event.preventDefault();
    var topic = $("#topic-input").val().toLowerCase().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=n56wWPiMHzIKD53d4OUnGWPjwrSaESfB&limit=10";
    // creating an ajax callback function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.data.length == 0) {
            alert("Sorry, no GIF's found, try a different topic");
        } else if (topics.indexOf(topic) != -1) {
            alert("Topic already exists!");
        } else {
            topics.push(topic);
            renderButtons();
        }
    })
})

// function that will display GIF's
function display() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=n56wWPiMHzIKD53d4OUnGWPjwrSaESfB&limit=10";
    // ajax callback
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".gifs-view").empty();
        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv"); // adding a class
            gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>"); // creating a paragraph to insert a rating
            // adding image html
            var gifImage = $("<img src= '" + response.data[i].images.fixed_height_still.url + "'>");
            gifImage.addClass("gif");

            var imageDiv = $("<div>");
            imageDiv.addClass("play");
            imageDiv.attr("data-state", "still");
            imageDiv.attr("data-name", topic);
            imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
            imageDiv.attr("data-animate", response.data[i].images.fixed_height.url)

            $(imageDiv).append(gifImage);
            $(gifDiv).append(imageDiv);
            $(".gifs-view").append(gifDiv);
        }
    })
}
function playGif() {

    if ($(this).attr("data-state") == "still") {
        $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).html("<img src='" + $(this).attr("data-still") + "'>");
        $(this).attr("data-state", "still");
    }

};


$(document).on("click", ".topic", display);
$(document).on("click", ".play", playGif);

//Running Code
renderButtons();