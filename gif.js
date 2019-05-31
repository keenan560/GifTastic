// Initial topics array

var topics = ["Game of Thrones", "The Good Place", "The Handmaid's Tale", "Killing Eve", "The Americans", "Better Call Saul", "The Walking Dead"];

function renderArray(topics) {
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button class='bg-dark gif btn btn-lg text-white mx-3 mb-2 mt-2'>").html(topics[i]);
        $(newBtn).attr("value", topics[i]);
        $("#array").append(newBtn);

    }
}

var btnVal;
//Code to make request to API
function apiCall() {
    $(".jumbotron").hide();
    $("#results").empty();

    btnVal = $(this).val().trim();
    console.log(btnVal);
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=A5gG6PiSqmi9arWHKGFdGS2Vw9nJQkwa&q=" + btnVal + "&limit=10&rating=R&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var gif = $(`<figure><video src='${response.data[i].images.looping.mp4}' id='image0${i}' height='200' width='200' border='3px'class='gifs ml-4 img-thumbnail' type='video/mp4'></video><figcaption>Rated: ${response.data[i].rating} </figcaption></figure>`);

            $("#results").append(gif);
            $("#image0" + i).click(function () {
                console.log(this);
                if (this.paused === false) {
                    this.pause();
                } else {
                    this.play();
                }
            });
        }
    })
    playAudio(channel);
}
//Code to clear results 
function clear() {
    $(".jumbotron").show();
    $("#results").empty();
    $("#array").empty();
    renderArray();
    playAudio(shutter);
}
//Code for TV Static MP3 used when you click on a TV Show button 
var channel = new Audio("tv-static-01.mp3");

var shutter = new Audio("Jump-SoundBible.com-1007297584.mp3");

let playAudio = function (sound) {
    sound.play();
}

// OnClick event for buttons 


$(document).ready(function () {

    renderArray(topics);

    $("#submit").on("click", function (event) {
        $(".jumbotron").hide();
        event.preventDefault();
        btnVal = $("#input-topic").val();
        console.log(btnVal);
        var newBtn = $("<button class='btn gif btn-lg bg-dark text-white mx-2 mb-3 mt-3'>").html(btnVal);
        $(newBtn).attr("value", btnVal);
        playAudio(shutter);
        $("#array").append(newBtn);

    })

    $(document).on("click", "#clear", clear);

    $(document).on("click", ".gif", apiCall);


})

