// Initial topics array

var topics = "red blue green yellow white purple brown black indigo gray pink orange dog cat bird owl monkey moon sun fish sea ocean".split(" ");

function renderArray(topics) {
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button class='bg-secondary gif btn btn-lg text-white mx-2 mb-3 mt-3'>").html(topics[i]);
        $(newBtn).attr("value", topics[i]);
        $("#array").append(newBtn);

    }
}

var btnVal;

function apiCall() {
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
            var gif = $("<img height='200' width='200' border='3px' class='gifs .img-thumbnail' type='video/mp4'>response.data[i].rating");
            $(gif).attr("src", response.data[i].images.original.url);
            $("#results").append(gif);
        }
    });
}


// OnClick event for buttons 



$(document).ready(function () {

    renderArray(topics);

    $("#submit").on("click", function (event) {
        $("#results").empty();
        event.preventDefault();
        btnVal = $("#input-topic").val();
        console.log(btnVal);
        var newBtn = $("<button class='gif btn btn-lg bg-secondary text-white mx-2 mb-3 mt-3'onclick='apiCall()'>").html(btnVal);
        $(newBtn).attr("value", btnVal);
        $("#array").append(newBtn);

    })

    $(".gif").on("click", apiCall);

})

