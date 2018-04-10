//SEARCH FUNCTION Starts
    function searchMovie() {

        $("#searchResult").html("");

        var searchInput = document.getElementById("searchInputField"); //$("#searchInputField");

        var searchUrl = "http://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=";

        var resultUrl = searchUrl + searchInput.value;

        //console.log(resultUrl);



        $.getJSON( resultUrl, function( data ) {
            //console.log(data);

            var items = [];

            $.each( data, function( index, val ) {
                items.push("<li>" 
                    + "<a href='productPage.html?movie=" + val.id + "'>" 
                    + "<img src= '" + val.imageUrl + "' >"
                    + "<span class='stext'>" + val.name + "</span>"
                    + "</a>"
                    + "</li>");
                    });

                    $( "<ul/>", { "class": "my-new-list", html: items.join( "" )})
                .appendTo($("#searchResult"));
            });
    }
    //SEARCH FUNCTION ends

$(document).ready(function () {

    var testCart = JSON.parse(localStorage.getItem("orders"));



    $("#saveAndSend").on("click", function () {

        localStorage.setItem("customerOrder", "")

        location.href = "paymentPage.html";
    });



    $(testCart).each(function (index, currentMovie) {
        getSummary(currentMovie);

        $.getJSON("http://medieinstitutet-wie-products.azurewebsites.net/api/products/" + currentMovie.ProductId, function (movies) {



            var chosenMovie = $("<div>")
                .addClass("col-md-12")
                .addClass("productRow")
                .attr("id", movies.id)
                .appendTo("#movieContainer");

            var moviePicture = $("<div>")
                .attr("id", "moviePicture")
                .addClass("col-md-2")
                .appendTo(chosenMovie);

            var img = $("<img>")
                .addClass("imgClass", "col-md-12")
                .attr("id", movies.id)
                .attr("src", movies.imageUrl)
                .appendTo(moviePicture);

            var movieInfo = $("<div>")
                .attr("id", "movieInfo")
                .addClass("col-md-8")
                .appendTo(chosenMovie);

            var movieInfoList = "<ul>" +
                "<li>" + movies.name + "</li>" +
                "<li>" + movies.year + "</li>" +
                "<li>" + movies.price + "</li>" +
                "</ul>";

            var chosenMovieInfo = $("<span>")
                .attr("id", "chosenMovieInfo")
                .addClass("col-md-12")
                .html(movieInfoList)
                .appendTo(movieInfo);

            var removeMovie = $("<div>")
                .attr("id", "wasteBasket")
                .addClass("col-md-2")
                .appendTo(chosenMovie);

            var removeButton = $("<button>")
                .addClass("glyphicon glyphicon-trash", "col-md-12")
                .attr("id", movies.id)
                .appendTo(removeMovie);

            $("button").click(function () {
                console.log("hej")
                for (var i = 0; i < testCart.length; i++) {

                    if (testCart[i].ProductId == $(this).attr("id")) {
                        testCart.splice([i], 1);
                        $("#wasteBasket").parent().remove();
                    }
                    console.log(testCart);
                }
            });

            //$("<span>")
            //    .addClass("glyphicon glyphicon-trash", "col-md-12")
            //    .attr("id", movies.id)
            //    .appendTo(removeMovie);
        });
    });
    


    function getSummary(currentMovie) {
        var sum = 0;

        $(testCart).each(function (index, eachMovie) {
            $.getJSON("http://medieinstitutet-wie-products.azurewebsites.net/api/products/" + currentMovie.ProductId, function (movies) {

                sum += (eachMovie.Amount + movies.price);

                $("#showSum").text(sum);
            });
            

        });

        
    };
    
});
