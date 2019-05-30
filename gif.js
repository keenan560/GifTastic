// Initial topics array

var topics = ["The Office", "Mad Men", "The Walking Dead", "Simpsons", "South Park", "Doug", "Fresh Prince", "Martin", "How to Get Away With Murder"];

function renderArray(topics) {
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button class='bg-dark gif btn btn-lg text-white mx-2 mb-3 mt-3'>").html(topics[i]);
        $(newBtn).attr("value", topics[i]);
        $("#array").append(newBtn);

    }
}

var btnVal;

function apiCall() {
    $("#results").empty();
    playAudio(channel);
    btnVal = $(this).val().trim();
    console.log(btnVal);
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=A5gG6PiSqmi9arWHKGFdGS2Vw9nJQkwa&q=" + btnVal + "&limit=10&rating=R&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {
            var gif = $("<img height='200' width='200' border='3px' class='gifs img-thumbnail' type='video/mp4'>");
            $(gif).attr("src", response.data[i].images.original.url);
            $("#results").append(gif);
            // $("#results").append("Rated: " + response.data[i].rating).attr("class", 'rating');
        }
    });
}
//Code to clear results 
function clear() {
    $("#results").empty();
    $("#array").empty();
    playAudio(shutter);
    renderArray();
}
//Code for TV Static MP3 used when you click on a TV Show button 
var channel = new Audio("tv-static-01.mp3");

var shutter = new Audio("Camera-shutter-sound.mp3");

let playAudio = function (sound) {
    sound.play();
}
// OnClick event for buttons 


$(document).ready(function () {

    renderArray(topics);

    $("#submit").on("click", function (event) {
        event.preventDefault();
        btnVal = $("#input-topic").val();
        console.log(btnVal);
        var newBtn = $("<button class='btn gif btn-lg bg-dark text-white mx-2 mb-3 mt-3'>").html(btnVal);
        $(newBtn).attr("value", btnVal);
        $("#array").append(newBtn);

    })

    $(document).on("click", "#clear", clear);

    $(document).on("click", ".gif", apiCall);

})

