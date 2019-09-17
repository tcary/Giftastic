var topics = ["happy", "sad", "weak", "strong", "crazy", "kind", "smile", "crying"]

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
$("#add-topic").on("click", function () {
    event.preventDefault();
    var topic = $("#topic-input").val().toLowerCase().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=n56wWPiMHzIKD53d4OUnGWPjwrSaESfB&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
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

function display() {
    var topic = $(this).attr("data-name");
}